import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import SurfaceWrap from '/components/common/SurfaceWrap';
import useCoinMarketData from '/hooks/useCoinMarketData';
import { ORDER } from '/lib/constant';
import Item from './Item';
import ShowAllButton from './ShowAllButton';


type ListProps = {
  onPressItem: (id: string, symbol: string) => void
}

const HighPricePreview = ({ onPressItem }: ListProps) => {
  const { t } = useTranslation();
  const { data } = useCoinMarketData({ 
    order: ORDER.MARKET_CAP_DESC, 
    per_page: 5,
    refreshInterval: 5 * 60 * 1000 
  });

  return (
    <SurfaceWrap 
      title={t('coinMarketHome.top market cap')} 
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
        <ShowAllButton route={'CoinHighMarketCap'}/>
      </ListWrap>
    </SurfaceWrap>
  )
}

export default HighPricePreview;

const ListWrap = styled.View`
  flex: 1;
`