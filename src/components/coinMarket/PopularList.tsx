import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import useGlobalTheme from '/hooks/useGlobalTheme'
import { CoinSvg } from '/lib/svg'
import type { HomeParamList, HomeScreenProps } from '/types/navigation'

import SurfaceWrap from '/components/common/SurfaceWrap'
import Text from '/components/common/Text'

const ICON_SIZE = 50

const PopularList = () => {
  const { t } = useTranslation()
  const navigation =
    useNavigation<HomeScreenProps<'CoinMarketHome'>['navigation']>()
  const { theme } = useGlobalTheme()

  const data = useMemo(
    () => [
      {
        title: `Top \n${t('coinMarketHome.gainers')}`,
        route: 'Gainers' as const,
        start: '#d9a4fc',
        end: '#be63f9',
        icon: <CoinSvg name="rise" width={ICON_SIZE} height={ICON_SIZE} />,
      },
      {
        title: `Top \n${t('coinMarketHome.losers')}`,
        route: 'Losers' as const,
        start: '#fd907e',
        end: '#fc573b',
        icon: <CoinSvg name="decrease" width={ICON_SIZE} height={ICON_SIZE} />,
      },
      {
        title: `${t('coinMarketHome.volume')}\nTOP100`,
        route: 'CoinHighVolume' as const,
        start: '#8ce1eb',
        end: '#26c6da',
        icon: <CoinSvg name="coins" width={ICON_SIZE} height={ICON_SIZE} />,
      },
      {
        title: `${t('coinMarketHome.market cap')}\nTOP100`,
        route: 'CoinHighMarketCap' as const,
        start: '#ffe777',
        end: '#ffd200',
        icon: <CoinSvg name="coinstack" width={ICON_SIZE} height={ICON_SIZE} />,
      },
    ],
    [t]
  )

  const handleCardPress = (
    route: Extract<keyof HomeParamList, (typeof data)[number]['route']>
  ) => {
    navigation.navigate(route)
  }

  return (
    <SurfaceWrap title={t('coinMarketHome.popular list')} parentPaddingZero>
      <Container
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={135}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: parseInt(theme.content.spacing, 10),
        }}
      >
        {data.map(res => {
          return (
            <LinearGradient
              key={res.route}
              colors={[res.start, res.end]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: 135,
                height: 135,
                // TODO. borderRadius 상수화
                borderRadius: 20,
                marginRight: 10,
              }}
            >
              <Card
                onPress={() => handleCardPress(res.route)}
                activeOpacity={0.8}
              >
                <IconWrap>{res.icon}</IconWrap>
                <Text fontL heavy lineHeight={23} color="rgba(0,0,0,0.8)">
                  {res.title}
                </Text>
              </Card>
            </LinearGradient>
          )
        })}
      </Container>
    </SurfaceWrap>
  )
}

export default PopularList

const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.base.background.surface};
`

const Card = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  padding: 10px;
  justify-content: space-between;
`

const IconWrap = styled.View`
  width: 100%;
  align-items: flex-end;
`
