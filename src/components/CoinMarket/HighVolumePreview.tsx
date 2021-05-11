import React from 'react';
import SurfaceWrap from '/components/common/SurfaceWrap';
import useCoinMarketData from '/hooks/useCoinMarketData';
import { ORDER } from '/lib/constant';
import Item from './Item';
import ShowAllButton from './ShowAllButton';
import Text from '/components/common/Text';

type ListProps = {
  onPressItem: (id: string) => void;
}

const HighVolumePreview = ({ onPressItem }: ListProps) => {

  const { data } = useCoinMarketData({ order: ORDER.VOLUME_DESC, per_page: 5 });

  return (
    <SurfaceWrap title='거래량이 가장 많은' paddingBottomZero>
      {data?.flat().map(res => {
        return (
          <Item 
            key={ res.name }
            item={ res }  
            onPressItem={onPressItem}
          />
        )
      })}
      <ShowAllButton route='CoinHighVolume'/>
    </SurfaceWrap>
  )
}

export default HighVolumePreview