import { Octicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions } from 'react-native'
import styled, { css } from 'styled-components/native'

import { useChartState } from '/hooks/context/useChartContext'
import useGlobalTheme from '/hooks/useGlobalTheme'
import { useAppDispatch } from '/hooks/useRedux'
import { EXCHANGES } from '/lib/constant'
import { changeChartExchange } from '/store/slices/baseSetting'
import type { ExchangeType } from '/types/common'

import Modal from '/components/common/BottomSheetModal'
import Text from '/components/common/Text'

const { width: DWidth } = Dimensions.get('window')

const exchanges = Object.entries(EXCHANGES)
  .slice(0, 2)
  .map(exchange => ({
    label: exchange[1].label,
    value: exchange[0] as ExchangeType,
  }))

type RowProps = {
  onPress: () => void
  title: string
  enabled: boolean
}

const Row = ({ onPress, title, enabled }: RowProps) => {
  const { theme } = useGlobalTheme()

  return (
    <RowContainer
      onPress={onPress}
      underlayColor={theme.base.underlayColor[100]}
    >
      <>
        <Text bold>{title}</Text>
        <Octicons
          name="check"
          size={24}
          color={enabled ? theme.base.primaryColor : 'transparent'}
        />
      </>
    </RowContainer>
  )
}

const ExchangeAndPairSelector = () => {
  const { t } = useTranslation()
  const modalRef = useRef<BottomSheetModal>(null)
  const { theme } = useGlobalTheme()
  const dispatch = useAppDispatch()
  const {
    activeTradingPair,
    setActiveTradingPair,
    tradingPairs,
    exchange,
    symbol,
  } = useChartState()

  const onExchangeChange = useCallback(
    (value: ExchangeType) => {
      if (exchange === value) return
      dispatch(changeChartExchange(value))
      modalRef.current?.close()
    },
    [dispatch, exchange]
  )

  const onTradingPairChange = useCallback(
    (value: string) => {
      if (activeTradingPair === value) return
      setActiveTradingPair(value)
      modalRef.current?.close()
    },
    [activeTradingPair, setActiveTradingPair]
  )

  const handleSelectorPress = () => {
    modalRef.current?.present()
  }

  const translatedExchange = useCallback(
    (exchange: string) => {
      if (exchange === EXCHANGES.globalAverage.label) {
        return t(`common.global average`)
      }
      return exchange
    },
    [t]
  )

  return (
    <>
      <Container onPress={handleSelectorPress} activeOpacity={0.8}>
        <Selector borderPosition="left">
          <Text bold color={theme.base.dark100}>
            {translatedExchange(EXCHANGES[exchange].label)}
          </Text>
        </Selector>
        <Selector borderPosition="right">
          <Text bold color={theme.base.dark100}>
            {`${activeTradingPair.toUpperCase()} / ${symbol.toUpperCase()}`}
          </Text>
        </Selector>
      </Container>
      <Modal
        name="chart_exchage_pair"
        ref={modalRef}
        snapPoints={['40%']}
        bgColor={theme.base.background.surface}
        handleColor={theme.base.background.surface}
      >
        <ModalContainer>
          <Title>
            <Col>
              <Text color100 fontML bold>
                {t(`common.exchanges`)}
              </Text>
            </Col>
            <Col>
              <Text color100 fontML bold>
                {t(`common.trading pairs`)}
              </Text>
            </Col>
          </Title>
          <ListView>
            <ExchagesView>
              {exchanges.map(({ label, value }) => (
                <Row
                  key={value}
                  title={translatedExchange(label)}
                  enabled={value === exchange}
                  onPress={() => onExchangeChange(value)}
                />
              ))}
            </ExchagesView>
            <PairsView>
              {tradingPairs.map(({ label, value }) => (
                <Row
                  key={value}
                  title={label}
                  enabled={value === activeTradingPair}
                  onPress={() => onTradingPairChange(value)}
                />
              ))}
            </PairsView>
          </ListView>
        </ModalContainer>
      </Modal>
    </>
  )
}

export default ExchangeAndPairSelector

type SelectorType = {
  borderPosition: 'left' | 'right'
}

const Container = styled.TouchableOpacity`
  padding: ${({ theme }) => `0 ${theme.content.spacing}`};
  flex-direction: row;
  height: 35px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Selector = styled.View<SelectorType>`
  width: ${({ theme }) =>
    DWidth / 2 - parseInt(theme.content.spacing, 10) - 5}px;
  height: 100%;
  flex-direction: row;
  background-color: #252933;
  align-items: center;
  justify-content: center;
  ${({ borderPosition }) =>
    borderPosition === 'left' &&
    css`
      border-top-left-radius: ${({ theme }) => theme.border.l};
      border-bottom-left-radius: ${({ theme }) => theme.border.l};
    `}
  ${({ borderPosition }) =>
    borderPosition === 'right' &&
    css`
      border-top-right-radius: ${({ theme }) => theme.border.l};
      border-bottom-right-radius: ${({ theme }) => theme.border.l};
    `}
`

const ModalContainer = styled.View``

const Title = styled.View`
  background-color: ${({ theme }) => theme.base.background.surface};
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 8px;
`

const ListView = styled.View`
  flex-direction: row;
`

const Col = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const ExchagesView = styled.View`
  flex: 1;
  border-right-color: ${({ theme }) => theme.base.background[200]};
  border-right-width: 1px;
`

const PairsView = styled.ScrollView`
  flex: 1;
`

const RowContainer = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: 48px;
`
