import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Image from '/components/common/Image';
import { useAppSelector } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/useCoinMarketData';
import Item from './popularList/Item';

type ListProps = {
  onPressItem: (id: string) => void;
}

const WatchList = ({ onPressItem }: ListProps) => {
  const { watchList } = useAppSelector(state => state.baseSettingReducer);
  const { t } = useTranslation();
  const { data } = useCoinMarketData({ 
    ids: watchList, 
    suspense: false,
    refreshInterval: 180000 
  });

  return (
    <SurfaceWrap title='관심 목록' >
      <Text margin="-15px 0 10px 0"> 
        3분 자동 업데이트
      </Text>
      { data?.map((coin, index) => {
        return (
          <Item 
            key={coin.id}
            item={coin}
            index={index}
            valueKey="current_price"
            percentageKey="price_change_percentage_24h"
            onPressItem={onPressItem}
            NoneUnderLine={true}
          />
        )
      }) }
    </SurfaceWrap>
  )
}

export default WatchList;

const Card = styled.TouchableOpacity`
  width: 135px;
  height: 135px;
  border-radius: ${({ theme }) => theme.border.xl};
  background-color: ${({ theme }) => theme.base.background[300]};
  margin-right: 10px;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
`

const SearchCard = styled(Card)`
  align-items: center;
  justify-content: center;
`