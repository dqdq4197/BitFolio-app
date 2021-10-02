import React, { useState, useEffect } from 'react';
import { LayoutAnimation, UIManager, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useAppSelector } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/useCoinMarketData';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import Item from './popularList/Item';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ListProps = {
  onPressItem: (id: string, symbol: string) => void;
}

const EmptyWatchListView = () => {
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const handleItemPress = () => {
    navigation.navigate('CoinSearch')
  }

  return (
    <AddItemContainer 
      onPress={handleItemPress}
      underlayColor={theme.base.underlayColor[100]}
    >
      <>
        <AddItemIcon>
          <AntDesign name="plus" size={24} color={theme.base.primaryColor} />
        </AddItemIcon>
        <Text fontML bold margin="0 0 0 15px">
          { t('coinMarketHome.add coins') }
        </Text>
      </>
    </AddItemContainer>
  )
}

const WatchList = ({ onPressItem }: ListProps) => {
  const { theme } = useGlobalTheme();
  const { watchList } = useAppSelector(state => state.baseSettingReducer);
  const [newData, setNewData] = useState<CoinMarketReturn[]>([])
  const { t } = useTranslation();
  const { data, isValidating } = useCoinMarketData({ 
    ids: watchList, 
    suspense: false,
    refreshInterval: 1000 * 60 * 3,
  });

  useEffect(() => {
    if(data) {
      let temp = data.slice();
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
      );
      temp.sort((a, b) => watchList.indexOf(a.id) - watchList.indexOf(b.id));
      setNewData(temp);
    } else {
      setNewData(prevState => prevState.filter(coinId => watchList.includes(coinId.id)))
    }
  }, [watchList, isValidating])

  return (
    <SurfaceWrap 
      title={t('coinMarketHome.watch list')} 
      marginBottomZero
      parentPaddingZero
    >
      <Text margin={`5px 0 10px ${theme.content.spacing}`}> 
        { t('coinMarketHome.n.minute auto update', { n: 3 }) }
      </Text>
      { newData.length 
        ? newData?.map((coin, index) => {
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
          }) 
        : <EmptyWatchListView />
      }
    </SurfaceWrap>
  )
}

export default WatchList;

const AddItemContainer = styled.TouchableHighlight`
  height: 60px;
  flex-direction: row;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const AddItemIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.base.background[300]};
`