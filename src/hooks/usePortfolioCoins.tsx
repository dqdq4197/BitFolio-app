import React, { useState, useEffect } from 'react';
import useCoinMarketData from './useCoinMarketData';
import { PortfolioType } from '/store/portfolio'


type PortfolioCoinsProps = {
  portfolios: PortfolioType[];
}
const usePortfolioCoins = ({ portfolios }: PortfolioCoinsProps) => {
  const [coins, setCoins] = useState<string[]>([]);

  useEffect(() => {
    let temp:string[] = [];
  
    portfolios.forEach(
      portfolio => {
        portfolio.coins.map(coin => {
          if(!temp.includes(coin.id)) {
            temp.push(coin.id);
          }
        })
      }
    )

    setCoins(temp);
  }, [portfolios])

  const { data, mutate } = useCoinMarketData({ 
    suspense: false, 
    sparkline: false,
    ids: coins,
    willNotRequest: coins.length <= 0
  });
  
  return { data, mutate }
}

export default usePortfolioCoins;