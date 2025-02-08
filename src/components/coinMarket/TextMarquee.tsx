import { Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { baseTypes } from 'base-types'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import TextTicker from 'react-native-text-ticker'
import styled, { css } from 'styled-components/native'

import useMarkgetglobar from '/hooks/data/useMarkgetGlobal'
import useGlobalTheme from '/hooks/useGlobalTheme'
import useLocales from '/hooks/useLocales'
import { convertUnits } from '/lib/utils'
import { AddSeparator, currencyFormat } from '/lib/utils/currencyFormat'

import Modal from '/components/common/BottomSheetModal'
import DateFormatText from '/components/common/DateFormatText'
import SurfaceWrap from '/components/common/SurfaceWrap'
import Text from '/components/common/Text'
import { MarqueeTextSkeleton } from '/components/skeletonPlaceholder/coinMarketHome'

type ModalProps = {
  cryptos: number
  exchanges: number
  marketcap: number
  volume: number
  currency: baseTypes.Currency
  updatedAt: number
  btcDominance: number
  ethDominance: number
}

const ModalContents = ({
  cryptos,
  exchanges,
  marketcap,
  volume,
  currency,
  updatedAt,
  btcDominance,
  ethDominance,
}: ModalProps) => {
  const { t } = useTranslation()
  const { language } = useLocales()

  return (
    <SurfaceWrap
      title={t(`coinMarketHome.global metrics`)}
      fontL
      parentPaddingZero
      marginBottomZero
      marginTopZero
      transparent
    >
      <DateFormatText
        date={updatedAt * 1000}
        formatType="Pp"
        afterPrefix={language === 'en' ? t(`common.as of`) : undefined}
        beforePrefix={language === 'ko' ? t(`common.as of`) : undefined}
        margin="5px 0 15px 16px"
        fontS
      />
      <Table>
        <Row top>
          <Col>
            <Title>
              <Text fontM bold>
                {`${t(
                  'coinMarketHome.market cap'
                )} (${currency.toUpperCase()})`}
              </Text>
            </Title>
            <Text fontM bold color100>
              {AddSeparator(marketcap)}
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text fontM bold>
                {`${t('common.n.hour', { n: 24 })} ${t(
                  'coinMarketHome.volume'
                )} (${currency.toUpperCase()})`}
              </Text>
            </Title>
            <Text fontM bold color100>
              {AddSeparator(volume)}
            </Text>
          </Col>
        </Row>
        <Row top bottom>
          <Col>
            <Title>
              <Text fontM bold>
                {t('common.cryptocurrencies')}
              </Text>
            </Title>
            <Text fontM bold color100>
              {AddSeparator(cryptos)}
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text fontM bold>
                {t('common.exchanges')}
              </Text>
            </Title>
            <Text fontM bold color100>
              {AddSeparator(exchanges)}
            </Text>
          </Col>
        </Row>
        <Row top bottom>
          <Col>
            <Title>
              <Text fontM bold>
                {`BTC ${t('common.dominance')}`}
              </Text>
            </Title>
            <Text fontM bold color100>
              {currencyFormat({
                value: btcDominance,
              })}
              %
            </Text>
          </Col>
          <Col left>
            <Title>
              <Text fontM bold>
                {`ETH ${t('common.dominance')}`}
              </Text>
            </Title>
            <Text fontM bold color100>
              {currencyFormat({
                value: ethDominance,
              })}
              %
            </Text>
          </Col>
        </Row>
      </Table>
    </SurfaceWrap>
  )
}

const TextMarquee = () => {
  const { t } = useTranslation()
  const { data: marketGlobalData } = useMarkgetglobar({ suspense: false })
  const { currency } = useLocales()
  const { theme } = useGlobalTheme()
  const ModalRef = useRef<BottomSheetModal>(null)

  const handleMarqueePress = () => {
    ModalRef.current?.present()
  }

  if (!marketGlobalData) return <MarqueeTextSkeleton />
  const { data } = marketGlobalData

  return (
    <Container activeOpacity={0.8} onPress={handleMarqueePress}>
      <TextTicker loop duration={40000} repeatSpacer={30}>
        <Text fontM dark100 bold>
          {`${t(`common.cryptocurrencies`)}: ${
            data.active_cryptocurrencies
          } • ${t('common.exchanges')}: ${data.markets} • ${t(
            'coinMarketHome.market cap'
          )}: ${convertUnits(data.total_market_cap[currency], currency)} • ${t(
            'common.n.hour',
            { n: 24 }
          )} ${t('coinMarketHome.volume')}: ${convertUnits(
            data.total_volume[currency],
            currency
          )}`}
        </Text>
      </TextTicker>
      <LinearGradient
        colors={[
          'rgba(56, 97, 251,0)',
          theme.base.primaryColor,
          theme.base.primaryColor,
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        // TODO. LinearGradient 적용하기 or borderRadius 상수화
        style={{
          position: 'absolute',
          right: 0,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 10,
          borderRadius: 6,
        }}
      >
        <Ionicons name="chevron-down" size={20} color="white" />
      </LinearGradient>
      <Modal key="market-global" ref={ModalRef}>
        <ModalContents
          cryptos={data.active_cryptocurrencies}
          exchanges={data.markets}
          marketcap={data.total_market_cap[currency]}
          volume={data.total_volume[currency]}
          currency={currency}
          updatedAt={data.updated_at}
          btcDominance={data.market_cap_percentage.btc}
          ethDominance={data.market_cap_percentage.eth}
        />
      </Modal>
    </Container>
  )
}

export default TextMarquee

type RowProps = {
  top?: boolean
  bottom?: boolean
}

type ColProps = {
  left?: boolean
}

const Container = styled.TouchableOpacity`
  height: 40px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.border.m};
  justify-content: center;
  margin-top: 10px;
`

const Table = styled.View`
  margin-bottom: 20px;
`

const Row = styled.View<RowProps>`
  flex-direction: row;
  ${props =>
    props.top &&
    css`
      border-top-width: 1px;
      border-top-color: ${props.theme.base.background[300]};
    `}
  ${props =>
    props.bottom &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${props.theme.base.background[300]};
    `}
`

const Col = styled.View<ColProps>`
  width: 50%;
  padding: 10px ${({ theme }) => theme.content.spacing};
  ${props =>
    props.left &&
    css`
      border-left-width: 1px;
      border-left-color: ${props.theme.base.background[300]};
    `}
`

const Title = styled.View`
  padding-bottom: 10px;
`
