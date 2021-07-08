import React from 'react';
import styled from 'styled-components/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TransactionType } from '/store/transaction';
import Text from '/components/common/Text';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';


type ItemProps = {
  data: TransactionType
  symbol: string
}

type TypesType = {
  [key: string] : {
    name: string
    icon: (color: string) => JSX.Element
  }
}
const TYPES: TypesType = {
  'buy': {
    name: 'Buy',
    icon: (color: string) =>  <MaterialCommunityIcons name="transfer" size={24} color={color} />
  },
  'sell': {
    name: 'Sell',
    icon: (color: string) =>  <MaterialCommunityIcons name="transfer" size={24} color={color} />

  },
  'transfer in': {
    name: 'Transfer In',
    icon: (color: string) =>  <MaterialCommunityIcons name="transfer" size={24} color={color} />

  },
  'transfer out': {
    name: 'Transfer Out',
    icon: (color: string) =>  <MaterialCommunityIcons name="transfer" size={24} color={color} />

  }
}

const Item = ({ data, symbol }: ItemProps) => {
  const type = data.type === 'transfer' ? data.transferType! : data.type;
  const { theme } = useGlobalTheme();
  const { language, currency } = useLocales();
  
  return (
    <Container>
      <TypeWrap>
        { TYPES[type].icon(theme.base.text[200]) }
        <TypeValue>
          <Text color100 bold fontML>
            { data.type === 'transfer' ? data.transferType : data.type }
          </Text>
          <Text color100 bold>
            { format(new Date(data.date), 'Pp', {
              locale: language === 'en' ? enUS : ko
            }) }
          </Text>
        </TypeValue>
      </TypeWrap>
      <QuantityWrap>
        <Text fontML>
          { currencyFormat({
            value: data.pricePerCoin[currency] * data.quantity,
            prefix: getCurrencySymbol(currency),
          }) }
        </Text>
        <Text fontML>
          { data.quantity } { symbol.toUpperCase() }
        </Text>
      </QuantityWrap>
    </Container>
  )
}

export default Item;

const Container = styled.View`
  flex: 1; 
  flex-direction: row;
  height: 60px;
`

const TypeWrap = styled.View`
  flex: 2;
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