import React from 'react';
import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';
import { baseTypes } from 'base-types';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import Text from '/components/common/Text';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { CURRENCIES } from '/lib/constant';

type MainSettingProps = {
}

const MainSetting = ({ }: MainSettingProps) => {
  const { dismiss } = useBottomSheetModal();
  const { currency: currentCurrency , onCurrencyChange } = useLocales();
  const { theme } = useGlobalTheme();

  const renderCurrencies = () => {
    const rows = [];
    for(const currency in CURRENCIES) {
      const { name, iso, unicode } = CURRENCIES[currency as baseTypes.Currency];
      rows.push(
        <Row 
          key={name}
          onPress={() => {
            onCurrencyChange(currency.toLocaleLowerCase() as baseTypes.Currency);
            dismiss("currency");
          }}
        >
          <ColView>
            <Text fontML bold>
              { name }
            </Text>
            <Text color300>
              { iso } - { unicode } 
            </Text>
          </ColView>
          <Octicons 
            name="check" 
            size={28} 
            color={
              currentCurrency === iso.toLowerCase()
              ? theme.base.primaryColor
              : theme.base.background['surface']
            }
          />
        </Row>
      )
    }

    return rows;
  }

  return (
    <Container>
      { renderCurrencies() }
    </Container>
  )
}

export default MainSetting;


const Container = styled.View`
  width: 100%;
`

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  margin-top: 30px;
`

const ColView = styled.View`

`