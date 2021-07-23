import React, { useEffect, useState } from 'react';
import { useAppSelector } from '/hooks/useRedux';
import transaction, { TransactionType } from '/store/transaction';


type CoinStatsProps = {
  id: string
}

type StatsType = { [key : string ]: coinType}

type coinType = {
  id: string
  fee: { [key: string]: number}
  avgPrice: { [key: string]: number}
  quantity: number
}

const usePortfolioCoinStats = ({ id }: CoinStatsProps) => {
  
  const { transactions } = useAppSelector(state => state.transactionReducer);
  const [coinStats, setCoinStats] = useState<StatsType | null>(null);

  const sumFees = (
    fees: { [key: string]: number },
    transaction: TransactionType
  ) => {

    let temp = {};
    for(let currency in transaction.fee) {
      temp = { 
        ...temp,
        [currency]: fees[currency] + transaction.fee[currency] 
      };
    }

    return temp;
  }


  const mergePricePerCoin = (
    type: 'subtraction' | 'addition',
    pricePerCoin: { [key: string]: number } | null,
    transaction: TransactionType
  ) => {
    let temp = {};
    for(let currency in transaction.pricePerCoin) {
      temp = {
        ...temp,
        [currency]: type === 'subtraction' 
          ? (pricePerCoin ? pricePerCoin[currency] : 0) - transaction.quantity * transaction.pricePerCoin[currency] 
          : (pricePerCoin ? pricePerCoin[currency] : 0) + transaction.quantity * transaction.pricePerCoin[currency]  
      }
    }

    return temp;
  }

  const avgPricePerCoin = (
    transactionStats: StatsType
  ) => {
    let statsTemp: StatsType = {};

    for(let coin in transactionStats) {
      let pricePerCoinTemp = {};
      for(let currency in transactionStats[coin].avgPrice) {
        const { avgPrice, quantity } = transactionStats[coin];
        pricePerCoinTemp = {
          ...pricePerCoinTemp,
          [currency]: avgPrice[currency] / quantity
        }
      }
      statsTemp = {
        ...statsTemp,
        [coin]: {
          ...transactionStats[coin],
          avgPrice: pricePerCoinTemp
        }
      }
    }

    return statsTemp;
  }

  useEffect(() => {
    const filteredTransactions = transactions.filter(transaction => transaction.portfolioId === id);
    let transactionStats: StatsType = {};

    filteredTransactions.forEach(
      transaction => {
        const { coinId, fee, quantity, type, transferType } = transaction;

        if(transactionStats.hasOwnProperty(coinId)) {
          let targetTransaction = transactionStats[coinId];

          if(type === 'buy' || transferType === 'transfer in') {
            targetTransaction.quantity += quantity;
            targetTransaction.fee = sumFees(targetTransaction.fee, transaction)
            targetTransaction.avgPrice = mergePricePerCoin(
              'addition',
              targetTransaction.avgPrice, 
              transaction
            );
          }

          if(type === 'sell' || transferType === 'transfer out') {
            targetTransaction.quantity -= quantity;
            targetTransaction.fee = sumFees(targetTransaction.fee, transaction)
            targetTransaction.avgPrice = mergePricePerCoin(
              'subtraction',
              targetTransaction.avgPrice, 
              transaction
            );
          }
        } else {
          transactionStats = { 
            ...transactionStats,
            [coinId]: { 
              id: coinId, 
              fee,
              avgPrice: type === 'buy' || transferType === 'transfer in' 
                ? mergePricePerCoin('addition', null, transaction)
                : mergePricePerCoin('subtraction', null, transaction),
              quantity: type === 'buy' || transferType === 'transfer in' 
                ? quantity
                : -quantity
            } 
          };
        }
      }
    )
    
    setCoinStats(avgPricePerCoin(transactionStats));
  }, [id, transactions])


  return { coinStats }
}

export default usePortfolioCoinStats;