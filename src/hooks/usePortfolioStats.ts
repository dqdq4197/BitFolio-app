import React, { useEffect, useState } from 'react';
import { useAppSelector } from '/hooks/useRedux';
import useLocales from '/hooks/useLocales';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';

type StatsProps = {
  id: string
  coinsData?: CoinMarketReturn[]
}

export type CoinStatType = {
  id: string
  symbol: string
  fee: number
  /*
    price: market price per coin (from api data)
  */
  price: number
  price_change_24h: number | null
  price_change_percentage_24h: number | null
  /*
    order_quantity: total purchase quantity - total selling quantity
  */
  order_quantity: number
  /*
    transferQuantity: total transfer in quantity - total transfer out quantity
  */
  transfer_quantity: number
  /*
    holding_quantity: order_quantity + transfer_quantity
  */
  holding_quantity: number
  /*
    holding_costs: price * priceholding_quantity
  */
  holding_costs: number
  /* 
    order_income_costs: total purchase price - total selling price
  */
  order_income_costs: number
  /*
    total_purchase_cost: total purchase price
    total_purchase_quantity: total purchase quantity
  */
  total_purchase_cost: number
  total_purchase_quantity: number
  /* 
    income_quantity_within_24h: Quantity obtained in 24 hours (*include transfer)
  */
  income_quantity_within_24h: number
  all_time_pl: number
  all_time_pl_percentage: number
  pl_24h: number
  pl_percentage_24h: number
  /* 
    price_per_usd: price per usd
  */
  price_per_usd: number
}

/*
  key => coinId (btc, eth, usdt, etc...)
*/
export type PortfolioStatsType = {
  /*
    total_balance: total holding_costs
  */
  total_balance: number
  /*
    total_costs: total of non-negative holding costs
  */
  total_costs: number 
  /*
    portfolio_all_time_pl: total all_time_pl 
  */
  portfolio_all_time_pl: number
  /*
    portfolio_all_time_pl_percentage: portfolio_all_time_pl / (total_balance - portfolio_all_time_pl) * 100
  */
  portfolio_all_time_pl_percentage: number
  /*
    portfolio_change_24h: total pl_24h 
  */
  portfolio_change_24h: number
  /*
    portfolio_change_percentage_24h: portfolio_change_24h / (total_balance - portfolio_change_24h) * 100
  */
  portfolio_change_percentage_24h: number
  coins: { [key: string ]: CoinStatType } | {}
}


const usePortfolioStats = ({ id, coinsData }: StatsProps) => {
  
  const { transactions } = useAppSelector(state => state.transactionReducer);
  const { currency } = useLocales();
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStatsType | null>(null);


  useEffect(() => {
    if(coinsData) {
      const filteredTransactions = transactions.filter(transaction => transaction.portfolioId === id);
      let coinStats: { [key : string ]: CoinStatType } = {};
      const now = +new Date();
      const oneDay =  24 * 60 * 60 * 1000;
      
      filteredTransactions.forEach(
        transaction => {
          const { coinId, fee, quantity, type, pricePerCoin, transferType, date, symbol } = transaction;
          const coinData = coinsData.find(coin => coin.id === coinId);
          const pricePerUsd = pricePerCoin[currency] / pricePerCoin['usd'];

          if(coinStats.hasOwnProperty(coinId)) {
            let targetCoinStats = coinStats[coinId];
            if(type === 'buy') {
              targetCoinStats.order_quantity += quantity;
              targetCoinStats.fee += fee[currency];
              targetCoinStats.order_income_costs += quantity * pricePerCoin[currency]; 
              targetCoinStats.total_purchase_cost += quantity * pricePerCoin[currency];
              targetCoinStats.total_purchase_quantity += quantity;
              targetCoinStats.income_quantity_within_24h += now - date < oneDay ? quantity : 0
            }
  
            if(type === 'sell') {
              targetCoinStats.order_quantity -= quantity;
              targetCoinStats.fee += fee[currency];
              targetCoinStats.order_income_costs -= quantity * pricePerCoin[currency];
              targetCoinStats.income_quantity_within_24h += now - date < oneDay ? -quantity : 0
            }
  
            if(type === 'transfer') {
              if(transferType === 'transfer in') {
                targetCoinStats.transfer_quantity += quantity;
                targetCoinStats.income_quantity_within_24h += now - date < oneDay ? quantity : 0
              } else {
                targetCoinStats.transfer_quantity -= quantity;
                targetCoinStats.income_quantity_within_24h += now - date < oneDay ? -quantity : 0
              }
            }
          } else {
            // create initial transactionStats
            coinStats = { 
              ...coinStats,
              [coinId]: { 
                id: coinId, 
                symbol,
                price: coinData!.current_price,
                price_change_24h: coinData!.price_change_24h,
                price_change_percentage_24h: coinData!.price_change_percentage_24h,
                fee: fee[currency],
                order_income_costs:
                 type === 'buy'
                  ? quantity * pricePerCoin[currency]
                  : type === 'sell'
                    ? -quantity * pricePerCoin[currency]
                    : 0,
                order_quantity: type === 'buy'
                  ? quantity
                  : type === 'sell'
                    ? -quantity
                    : 0,
                transfer_quantity: type === 'transfer' 
                  ? transferType === 'transfer in' 
                    ? quantity
                    : -quantity
                  : 0,
                total_purchase_cost: type === 'buy'
                  ? pricePerCoin[currency] * quantity
                  : 0,
                total_purchase_quantity: type === 'buy'
                  ? quantity
                  : 0,
                holding_costs: 0,
                holding_quantity: 0,
                income_quantity_within_24h: now - date < oneDay 
                  ? type === 'buy' || transferType === 'transfer in'
                      ? quantity
                      : type === 'sell' || transferType === 'transfer out'
                        ? -quantity
                        : 0
                  : 0,
                all_time_pl: 0,
                all_time_pl_percentage: 0,
                pl_24h: 0,
                pl_percentage_24h: 0,
                price_per_usd: pricePerUsd
              } 
            };
          }
        }
      )

      let total_balance = 0;
      let total_costs = 0;
      let portfolio_change_24h = 0;
      let portfolio_all_time_pl = 0;

      Object.keys(coinStats).map(key => {
        coinStats[key].holding_quantity = coinStats[key].order_quantity + coinStats[key].transfer_quantity;
        coinStats[key].holding_costs = coinStats[key].holding_quantity * coinStats[key].price;

        const orderPL = coinStats[key].order_quantity * coinStats[key].price - coinStats[key].order_income_costs
        const transferPL = coinStats[key].price * coinStats[key].transfer_quantity;

        coinStats[key].all_time_pl = orderPL + transferPL;
        coinStats[key].all_time_pl_percentage = coinStats[key].all_time_pl / coinStats[key].total_purchase_cost * 100;
        
        const income_quantity_after_24h = coinStats[key].holding_quantity - coinStats[key].income_quantity_within_24h;
        const pl_after_24h = coinStats[key].price_change_24h ? coinStats[key].price_change_24h! * income_quantity_after_24h : 0;

        portfolio_all_time_pl += coinStats[key].all_time_pl;
        coinStats[key].pl_24h = pl_after_24h + coinStats[key].income_quantity_within_24h * coinStats[key].price;
        coinStats[key].pl_percentage_24h = coinStats[key].pl_24h / coinStats[key].total_purchase_cost * 100;

        total_balance += coinStats[key].holding_costs;
        portfolio_change_24h += coinStats[key].pl_24h;

        if(coinStats[key].holding_costs >= 0)
          total_costs += coinStats[key].holding_costs;
      })

      const portfolio_all_time_pl_percentage = portfolio_all_time_pl / (total_balance - portfolio_all_time_pl) * 100;
      const portfolio_change_percentage_24h = portfolio_change_24h / (total_balance - portfolio_change_24h) * 100;
      
      setPortfolioStats({
        total_balance,
        total_costs,
        portfolio_all_time_pl,
        portfolio_all_time_pl_percentage,
        portfolio_change_24h,
        portfolio_change_percentage_24h,
        coins: coinStats
      })
    }
  }, [id, transactions, currency, coinsData])

  return { portfolioStats }
}

export default usePortfolioStats;