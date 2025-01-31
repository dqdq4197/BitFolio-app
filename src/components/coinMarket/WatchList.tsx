import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LayoutAnimation, Platform, UIManager } from 'react-native'
import styled from 'styled-components/native'

import useGlobalTheme from '/hooks/useGlobalTheme'
import useLocales from '/hooks/useLocales'
import { useAppSelector } from '/hooks/useRedux'
import useRequest from '/hooks/useRequest'
import { CoinGecko, http } from '/lib/api/CoinGeckoClient'
import type { CoinMarketReturn } from '/types/coinGeckoReturnType'
import type { HomeScreenProps } from '/types/navigation'

import Item from './popularList/Item'
import SurfaceWrap from '/components/common/SurfaceWrap'
import Text from '/components/common/Text'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

type ListProps = {
  onPressItem: (id: string, symbol: string) => void
}

const EmptyWatchListView = () => {
  const { theme } = useGlobalTheme()
  const navigation =
    useNavigation<HomeScreenProps<'CoinMarketHome'>['navigation']>()
  const { t } = useTranslation()

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
          {t('coinMarketHome.add coins')}
        </Text>
      </>
    </AddItemContainer>
  )
}

const WatchList = ({ onPressItem }: ListProps) => {
  const { t } = useTranslation()
  const { theme } = useGlobalTheme()
  const { currency } = useLocales()
  const { watchList } = useAppSelector(state => state.baseSettingReducer)
  const [newData, setNewData] = useState<CoinMarketReturn[]>([])
  const { data, isValidating } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: currency,
      ids: watchList,
    }),
    http,
    { refreshInterval: 1000 * 60 * 3 }
  )

  useEffect(() => {
    if (data) {
      const temp = data.slice()
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
      )
      temp.sort((a, b) => watchList.indexOf(a.id) - watchList.indexOf(b.id))
      setNewData(temp)
    } else {
      setNewData(prevState =>
        prevState.filter(coinId => watchList.includes(coinId.id))
      )
    }
  }, [watchList, isValidating, data])

  return (
    <SurfaceWrap
      title={t('coinMarketHome.watch list')}
      marginBottomZero
      parentPaddingZero
    >
      <Text margin={`5px 0 10px ${theme.content.spacing}`}>
        {t('coinMarketHome.n.minute auto update', { n: 3 })}
      </Text>
      {newData.length ? (
        newData?.map((coin, index) => {
          return (
            <Item
              key={coin.id}
              item={coin}
              index={index}
              valueKey="current_price"
              percentageKey="price_change_percentage_24h"
              onPressItem={onPressItem}
              NoneUnderLine
            />
          )
        })
      ) : (
        <EmptyWatchListView />
      )}
    </SurfaceWrap>
  )
}

export default WatchList

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
