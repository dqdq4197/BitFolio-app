import React from 'react';
import { CoinType } from '/store/portfolio';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';

type ItemProps = {
  transaction: CoinType;
  officialData?: CoinMarketReturn;
}

const CoinItem = ({ transaction, officialData }: ItemProps) => {

  if(!officialData) return <></>
  return (
    <>
    </>
  )
}

export default CoinItem;