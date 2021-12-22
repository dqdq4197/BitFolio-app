import React from 'react';
import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';
import { baseTypes } from 'base-types';
import { useTranslation } from 'react-i18next';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import { CURRENCIES } from '/lib/constant';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import Blank from './Blank';

type CurrencyProps = {}

type RowProps = {
  onPress: () => void
  title: string
  subTitle: string
  enabled: boolean
}

const Row = ({ onPress, title, subTitle, enabled }: RowProps) => {

  const { theme } = useGlobalTheme();
  
  return (
    <RowContainer
      onPress={onPress}
      underlayColor={ theme.base.underlayColor[100] }
    >
      <>
        <ColLeft>
          <Text fontML bold>
            { title }
          </Text>
          <Text bold color300 margin="5px 0 0 0">
            { subTitle }
          </Text>
        </ColLeft>
        <Octicons 
          name="check" 
          size={28} 
          color={
            enabled 
            ? theme.base.primaryColor
            : 'transparent'
          }
        />
      </>
    </RowContainer>
  )
}

const Currency = ({ }: CurrencyProps) => {
  const { t } = useTranslation();
  const { currency: currentCurrency , onCurrencyChange } = useLocales();

  const renderCurrencies = () => {
    const rows = [];
    for(const currency in CURRENCIES) {
      const { name, iso, unicode } = CURRENCIES[currency as baseTypes.Currency];
      rows.push(
        <Row
          key={ unicode }
          title={ name }
          subTitle={ `${iso} - ${unicode}` }
          onPress={() => onCurrencyChange(currency.toLowerCase() as baseTypes.Currency)}
          enabled={ currentCurrency === iso.toLowerCase() }
        />
      )
    }

    return rows;
  }

  return (
    <SurfaceWrap
      title={ t(`setting.default currency settings`) }
      parentPaddingZero
      marginTopZero
      fontML
    >
      { renderCurrencies() }
      <Blank/>
    </SurfaceWrap>
  )
}

export default Currency;

const ColLeft = styled.View``

const RowContainer = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: 58px;
`