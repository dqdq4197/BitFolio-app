import React from 'react';
import styled, { css } from 'styled-components/native';
import { baseTypes } from 'base-types';
import { APP_VERSION } from '@env';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import { CURRENCIES } from '/lib/constant';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import Blank from './Blank';

type RowProps = {
  onPress: () => void
  title: string
  currentSettingTitle: string
}

type SettingRootProps = {
  onLanguagePress: () => void
  onCurrencyPress: () => void
  onScreenThemePress: () => void
  onLounchScreenPress: () => void
}


const Row = ({ onPress, title, currentSettingTitle }: RowProps) => {

  const { theme } = useGlobalTheme();
  
  return (
    <RowContainer
      onPress={onPress}
      underlayColor={ theme.base.underlayColor[100] }
    >
      <>
        <Text fontML bold>
          { title }
        </Text>
        <ColRight>
          <Text bold color300>
            { currentSettingTitle }
          </Text>
          <MaterialIcons 
            name="keyboard-arrow-right" 
            size={ 20 } 
            color={ theme.base.text[200] }
          />
        </ColRight>
      </>
    </RowContainer>
  )
}

const SettingRoot = ({ 
  onScreenThemePress,
  onLanguagePress, 
  onCurrencyPress,
  onLounchScreenPress
}: SettingRootProps) => {

  const { t } = useTranslation();
  const { scheme } = useGlobalTheme();
  const { theme } = useGlobalTheme();
  const { currency, language } = useLocales();
  const { launchScreen } = useAppSelector(state => ({
    launchScreen: state.baseSettingReducer.launchScreen,
  }), shallowEqual);

  return (
    <>
    <SurfaceWrap
      title={ t(`setting.app settings`) }
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Row
        onPress={onScreenThemePress}
        title={ t('setting.screen theme') }
        currentSettingTitle={ t(`setting.${ scheme }`) }
      />
      <Row
        onPress={onLanguagePress}
        title={ t('setting.language') }
        currentSettingTitle={ 
          language === 'en' ? t(`setting.english`) : t(`setting.korean`) 
        }
      />
      <Row
        onPress={onCurrencyPress}
        title={ t('setting.default currencies') }
        currentSettingTitle={ 
          CURRENCIES[currency as Exclude<baseTypes.Currency, 'default'>].iso
          + ' - ' +
          CURRENCIES[currency as Exclude<baseTypes.Currency, 'default'>].symbol
        }
      />
      <Row
        onPress={onLounchScreenPress}
        title={ t('setting.launch screen') }
        currentSettingTitle={ t(`common.${ launchScreen }`) }
      />
      
    </SurfaceWrap>
    <SurfaceWrap
      title={ t(`setting.support`) }
      parentPaddingZero
      fontML
    >
      <BasicRow
        onPress={() => {}}
        underlayColor={ theme.base.underlayColor[100] }
      >
        <>
          <Text fontML bold>
            { t('setting.app version') }
          </Text>
          <Text bold color300>
            { APP_VERSION }
          </Text>
        </>
      </BasicRow>
      <Blank />
    </SurfaceWrap>
    </>
  )
}

export default SettingRoot;

const RowStyled = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: 48px;
`
const RowContainer = styled.TouchableHighlight`
  ${ RowStyled }
`

const BasicRow = styled.TouchableHighlight`
  ${ RowStyled };
`

const ColRight = styled.View`
  flex-direction: row;
  align-items: center;
`