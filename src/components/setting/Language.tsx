import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Octicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import Text from '/components/common/Text';

type MainSettingProps = {}

const MainSetting = ({}: MainSettingProps) => {
  const { language, onLanguageChange } = useLocales();
  const { theme } = useGlobalTheme();
  const { t } = useTranslation();

  return (
    <Container>
      <Row onPress={() => onLanguageChange('en')}>
        <ColView>
          <Text fontX bold>
            English
          </Text>
          <Text color300>
            { t('setting.english') }
          </Text>
        </ColView>
        <Octicons 
          name="check" 
          size={28} 
          color={
            language === 'en' 
            ? theme.base.primaryColor
            : theme.base.background['surface']
          }
        />
      </Row>
      <Row onPress={() => onLanguageChange('ko')}>
        <ColView>
          <Text fontX bold>
            한국어
          </Text>
          <Text color300>
            { t('setting.korean') }
          </Text>
        </ColView>
        <Octicons 
          name="check" 
          size={28} 
          color={
            language === 'ko' 
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