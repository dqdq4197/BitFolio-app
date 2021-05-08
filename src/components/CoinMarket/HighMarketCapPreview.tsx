import React from 'react';
import SurfaceWrap from '/components/common/SurfaceWrap';
import useCoinMarketData from '/hooks/useCoinMarketData';
import { ORDER } from '/lib/constant';
import Item from './Item';
import ShowAllButton from './ShowAllButton';


type ListProps = {
  onPressItem: (id: string) => void;
}

const HighMarketCapPreview = ({ onPressItem }: ListProps) => {
  const { data } = useCoinMarketData({ order: ORDER.MARKET_CAP_DESC, per_page: 5 });
  
  return (
    <SurfaceWrap title='시가 총액이 가장 높은' paddingBottomZero>
      {data?.flat().map(res => {
        return (
          <Item 
            key={ res.id }
            item={ res }  
            onPressItem={onPressItem}
          />
        )
      })}
      <ShowAllButton route={'CoinHighMarketCap'}/>
    </SurfaceWrap>
  )
}

export default HighMarketCapPreview;

