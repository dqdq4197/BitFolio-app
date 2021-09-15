import React from 'react';
import styled from 'styled-components/native';
import SurfaceWrap from '/components/common/SurfaceWrap';
import useCoinMarketData from '/hooks/useCoinMarketData';
import { ORDER } from '/lib/constant';
import Item from './Item';
import ShowAllButton from './ShowAllButton';
import { useTranslation } from 'react-i18next';

type ListProps = {
  onPressItem: (id: string, symbol: string) => void
}

const HighVolumePreview = ({ onPressItem }: ListProps) => {
  const { t } = useTranslation();
  const { data } = useCoinMarketData({ 
    order: ORDER.VOLUME_DESC, 
    per_page: 5,
    refreshInterval: 5 * 60 * 1000  
  });

  return (
    <SurfaceWrap 
      title={t('coinMarketHome.top volume')} 
      paddingBottomZero
      parentPaddingZero
    >
      <ListWrap>
        { data?.map(res => {
          return (
            <Item 
              key={ res.id }
              item={ res }  
              onPressItem={onPressItem}
            />
          )
        }) }
        <ShowAllButton route='CoinHighVolume'/>
      </ListWrap>
    </SurfaceWrap>
  )
}

export default HighVolumePreview;

const ListWrap = styled.View`
  flex: 1;
`