import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Octicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import Blank from './Blank';

type LanguageProps = {}

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
      underlayColor={theme.base.underlayColor[100]}
    >
      <>
        <ColLeft>
          <Text fontML bold>
            {title}
          </Text>
          <Text bold color300 margin="5px 0 0 0">
            {subTitle}
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

const Language = ({ }: LanguageProps) => {
  const { language, onLanguageChange } = useLocales();
  const { t } = useTranslation();

  return (
    <SurfaceWrap
      title={t(`setting.language settings`)}
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Row
        onPress={() => onLanguageChange('en')}
        title={'English'}
        subTitle={t(`setting.english`)}
        enabled={language === 'en'}
      />
      <Row
        onPress={() => onLanguageChange('ko')}
        title={'한국어'}
        subTitle={t(`setting.korean`)}
        enabled={language === 'ko'}
      />
      <Blank />
    </SurfaceWrap>
  )
}

export default Language;

const ColLeft = styled.View``

const RowContainer = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: 58px;
`