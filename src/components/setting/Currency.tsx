import React from 'react';
import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import Text from '/components/common/Text';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

type MainSettingProps = {
}

const MainSetting = ({ }: MainSettingProps) => {
  const { dismiss } = useBottomSheetModal();
  const { currency, onCurrencyChange } = useLocales();
  const { theme } = useGlobalTheme();

  return (
    <Container>
      <Row onPress={() => {
        onCurrencyChange('usd');
        dismiss("currency");
      }}>
        <ColView>
          <Text fontML bold>
            United States Dollar
          </Text>
          <Text color300>
            USD - $
          </Text>
        </ColView>
        <Octicons 
          name="check" 
          size={28} 
          color={
            currency === 'usd' 
            ? theme.base.primaryColor
            : theme.base.background['surface']
          }
        />
      </Row>
      <Row onPress={() => {
        onCurrencyChange('krw');
      }}>
        <ColView>
          <Text fontML bold>
            South Korean Won
          </Text>
          <Text color300>
            KRW - ₩
          </Text>
        </ColView>
        <Octicons 
          name="check" 
          size={28} 
          color={
            currency === 'krw' 
            ? theme.base.primaryColor
            : theme.base.background['surface']
          }
        />
      </Row>
      <Row onPress={() => {
        onCurrencyChange('eur');
      }}>
        <ColView>
          <Text fontML bold>
            Euro
          </Text>
          <Text color300>
            EUR - €
          </Text>
        </ColView>
        <Octicons 
          name="check" 
          size={28} 
          color={
            currency === 'eur' 
            ? theme.base.primaryColor
            : theme.base.background['surface']
          }
        />
      </Row>
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
const RowView = styled.View`
  flex-direction: row;
`
const ColView = styled.View`

`