import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import { useAppSelector } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/useCoinMarketData';
import Item from './popularList/Item';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';

type ListProps = {
  onPressItem: (id: string, symbol: string) => void;
}

const WatchList = ({ onPressItem }: ListProps) => {
  const { watchList } = useAppSelector(state => state.baseSettingReducer);
  const [newData, setNewData] = useState<CoinMarketReturn[]>([])
  const { t } = useTranslation();
  const { data, isValidating } = useCoinMarketData({ 
    ids: watchList, 
    suspense: false,
    refreshInterval: 1000 * 60 * 3,
  });

  useEffect(() => {
    if(data){
      setNewData(data);
    } else {
      setNewData(prevState => prevState.filter(coinId => watchList.includes(coinId.id)))
    }
  }, [watchList, isValidating])

  return (
    <SurfaceWrap 
      title={t('coinMarketHome.watch list')} 
      marginBottomZero
    >
      <Text margin="5px 0 10px 0" > 
        { t('coinMarketHome.n.minute auto update', { n: 3 }) }
      </Text>
      { newData?.map((coin, index) => {
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