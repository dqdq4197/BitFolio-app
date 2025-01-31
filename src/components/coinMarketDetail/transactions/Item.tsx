import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { enUS, ko } from 'date-fns/locale'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import useGlobalTheme from '/hooks/useGlobalTheme'
import useLocales from '/hooks/useLocales'
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat'
import { TransactionType } from '/store/slices/transaction'

import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue'
import Text from '/components/common/Text'

type ItemProps = {
  data: TransactionType
  symbol: string
  onItemPress: (id: string) => void
}

type TypesType = {
  [key: string]: {
    name: string
    icon: (color: string) => JSX.Element
    symbol: 'positive' | 'negative'
  }
}

const TYPES: TypesType = {
  buy: {
    name: 'buy',
    icon: (color: string) => (
      <Ionicons name="arrow-down-circle-sharp" size={24} color={color} />
    ),
    symbol: 'positive',
  },
  sell: {
    name: 'sell',
    icon: (color: string) => (
      <Ionicons name="arrow-up-circle-sharp" size={24} color={color} />
    ),
    symbol: 'negative',
  },
  'transfer in': {
    name: 'transfer in',
    icon: (color: string) => (
      <MaterialCommunityIcons name="transfer" size={24} color={color} />
    ),
    symbol: 'positive',
  },
  'transfer out': {
    name: 'transfer out',
    icon: (color: string) => (
      <MaterialCommunityIcons name="transfer" size={24} color={color} />
    ),
    symbol: 'negative',
  },
}

const Item = ({ data, symbol, onItemPress }: ItemProps) => {
  const { t } = useTranslation()
  const type = data.type === 'transfer' ? data.transferType! : data.type
  const { theme } = useGlobalTheme()
  const { language, currency } = useLocales()

  return (
    <Container
      activeOpacity={0.6}
      onPress={() => onItemPress(data.id)}
      underlayColor={theme.base.background[300]}
    >
      <>
        <TypeWrap>
          {TYPES[type].icon(theme.base.text[200])}
          <TypeValue>
            <Text color100 bold fontML>
              {t(
                `common.${
                  data.type === 'transfer' ? data.transferType : data.type
                }`
              )}
            </Text>
            <Text>
              {format(new Date(data.date), 'Pp', {
                locale: language === 'en' ? enUS : ko,
              })}
            </Text>
          </TypeValue>
        </TypeWrap>
        <QuantityWrap>
          <Text color100 bold>
            {TYPES[type].symbol === 'negative'
              ? `-${currencyFormat({
                  value: data.pricePerCoin[currency] * data.quantity,
                  prefix: getCurrencySymbol(currency),
                })}`
              : `+${currencyFormat({
                  value: data.pricePerCoin[currency] * data.quantity,
                  prefix: getCurrencySymbol(currency),
                })}`}
          </Text>
          <IncreaseDecreaseValue
            value={
              TYPES[type].symbol === 'negative'
                ? -1 * data.quantity
                : data.quantity
            }
            afterPrefix={` ${symbol.toUpperCase()}`}
            bold
          />
        </QuantityWrap>
      </>
    </Container>
  )
}

export default Item

const Container = styled.TouchableHighlight`
  flex: 1;
  flex-direction: row;
  height: 60px;
  padding: ${({ theme }) => theme.content.spacing};
`

const TypeWrap = styled.View`
  flex: 1.4;
  flex-direction: row;
  align-items: center;
`

const TypeValue = styled.View`
  margin-left: 10px;
`

const QuantityWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`
