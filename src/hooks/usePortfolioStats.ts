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
  fee: number
  /*
    price: market price per coin (from api data)
  */
  price: number
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
  pl_cost: number
  pl_percentage: number
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
  coins: { [key: string ]: CoinStatType }
}


const usePortfolioStats = ({ id, coinsData }: StatsProps) => {
  
  const { transactions } = useAppSelector(state => state.transactionReducer);
  const { currency } = useLocales();
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStatsType | null>(null);

  useEffect(() => {
    if(coinsData) {
      console.log('render', coinsData)
      const filteredTransactions = transactions.filter(transaction => transaction.portfolioId === id);
      let coinStats: { [key : string ]: CoinStatType } = {};
  
      filteredTransactions.forEach(
        transaction => {
          const { coinId, fee, quantity, type, pricePerCoin, transferType } = transaction;
          const coinData = coinsData.find(coin => coin.id === coinId);
          if(coinStats.hasOwnProperty(coinId)) {
            let targetCoinStats = coinStats[coinId];
  
            if(type === 'buy') {
              targetCoinStats.order_quantity += quantity;
              targetCoinStats.fee += fee[currency];
              targetCoinStats.order_income_costs += quantity * pricePerCoin[currency]; 
              targetCoinStats.total_purchase_cost += quantity * pricePerCoin[currency];
              targetCoinStats.total_purchase_quantity += quantity
            }
  
            if(type === 'sell') {
              targetCoinStats.order_quantity -= quantity;
              targetCoinStats.fee += fee[currency];
              targetCoinStats.order_income_costs -= quantity * pricePerCoin[currency];
            }
  
            if(type === 'transfer') {
              if(transferType === 'transfer in') {
                targetCoinStats.transfer_quantity += quantity;
              } else {
                targetCoinStats.transfer_quantity -= quantity;
              }
            }
          } else {
            // create initial transactionStats
            coinStats = { 
              ...coinStats,
              [coinId]: { 
                id: coinId, 
                price: coinData!.current_price,
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
                pl_cost: 0,
                pl_percentage: 0
              } 
            };
          }
        }
      )

      let total_balance = 0;
      let total_costs = 0;

      Object.keys(coinStats).map(key => {
        coinStats[key].holding_quantity = coinStats[key].order_quantity + coinStats[key].transfer_quantity;
        coinStats[key].holding_costs = coinStats[key].holding_quantity * coinStats[key].price;

        const orderPL = coinStats[key].order_quantity * coinStats[key].price - coinStats[key].order_income_costs
        const trasferPL = coinStats[key].price * coinStats[key].transfer_quantity;

        coinStats[key].pl_cost = orderPL + trasferPL;
        coinStats[key].pl_percentage = coinStats[key].pl_cost / coinStats[key].total_purchase_cost * 100;

        total_balance += coinStats[key].holding_costs;
        if(coinStats[key].holding_costs >= 0)
          total_costs += coinStats[key].holding_costs;
      })


      setPortfolioStats({
        total_balance,
        total_costs,
        coins: coinStats
      })
    }
  }, [id, transactions, currency, coinsData])

  return { portfolioStats }
}

export default usePortfolioStats;