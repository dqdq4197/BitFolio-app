import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import useGlobalTheme from '/hooks/useGlobalTheme'
import useLocales from '/hooks/useLocales'
import { useAppSelector } from '/hooks/useRedux'
import useRequest from '/hooks/useRequest'
import { CoinGecko, http } from '/lib/api/CoinGeckoClient'
import { digitToFixed } from '/lib/utils'
import type { CoinMarketReturn } from '/types/coinGeckoReturnType'
import type { HomeScreenProps } from '/types/navigation'

import Image from '/components/common/Image'
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue'
import SurfaceWrap from '/components/common/SurfaceWrap'
import Text from '/components/common/Text'
import WatchListIcon from '/components/common/WatchListIcon'

type ListProps = {
  onPressItem: (id: string, symbol: string) => void
}

const RecentlyViewedList = ({ onPressItem }: ListProps) => {
  const { t } = useTranslation()
  const { theme } = useGlobalTheme()
  const navigation =
    useNavigation<HomeScreenProps<'CoinMarketHome'>['navigation']>()
  const { currency } = useLocales()
  const { recentlyViewed } = useAppSelector(state => state.baseSettingReducer)
  const [newData, setNewData] = useState<CoinMarketReturn[]>([])
  const { data, isValidating } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency: currency,
      ids: recentlyViewed,
    }),
    http,
    { refreshInterval: 1000 * 60 * 5 }
  )

  useEffect(() => {
    if (data) {
      const temp = data.slice()
      temp.sort(
        (a, b) => recentlyViewed.indexOf(b.id) - recentlyViewed.indexOf(a.id)
      )
      setNewData(temp)
    } else {
      setNewData(prevState =>
        prevState.filter(coinId => recentlyViewed.includes(coinId.id))
      )
    }
  }, [recentlyViewed, isValidating, data])

  const handleSearchCardPress = () => {
    navigation.navigate('CoinSearch')
  }

  return (
    <SurfaceWrap title={t('coinMarketHome.recently viewed')} parentPaddingZero>
      <CardWrap
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: parseInt(theme.content.spacing, 10),
        }}
      >
        {newData?.map(coin => {
          return (
            <Card
              key={coin.id}
              activeOpacity={0.8}
              onPress={() => onPressItem(coin.id, coin.symbol)}
            >
              <IconWrap>
                <Image uri={coin.image} width={35} height={35} />
                <WatchListIcon id={coin.id} />
              </IconWrap>
              <TitleAndPercentage>
                <Text fontML bold numberOfLines={1}>
                  {coin.name}
                </Text>
                <IncreaseDecreaseValue
                  value={digitToFixed(coin.price_change_percentage_24h ?? 0, 2)}
                  afterPrefix="%"
                  fontML
                  bold
                  margin="5px 0 0 0"
                />
              </TitleAndPercentage>
            </Card>
          )
        })}
        <SearchCard onPress={handleSearchCardPress}>
          <Ionicons
            name="search-sharp"
            size={24}
            color={theme.base.text[200]}
          />
          <Text fontML bold margin="10px 0 0 0">
            {t('coinMarketHome.search')}
          </Text>
        </SearchCard>
      </CardWrap>
    </SurfaceWrap>
  )
}

export default RecentlyViewedList

const CardWrap = styled.ScrollView``

const IconWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`

const TitleAndPercentage = styled.View``

const Card = styled.TouchableOpacity`
  width: 135px;
  height: 135px;
  border-radius: ${({ theme }) => theme.border.xl};
  background-color: ${({ theme }) => theme.base.background[300]};
  margin-right: 10px;
  padding: 16px;
  justify-content: space-between;
`

const SearchCard = styled(Card)`
  align-items: center;
  justify-content: center;
`
