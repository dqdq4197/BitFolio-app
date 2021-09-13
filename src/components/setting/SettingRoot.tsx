import React from 'react';
import { Switch, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';


const ICON_SIZE = 20;

type ToggleProps = {
  isEnabled: boolean;
}

type MainSettingProps = {
  onLanguagePress: () => void;
  onCurrencyPress: () => void;
}
const Toggle = ({ isEnabled }: ToggleProps) => {

  const { theme, onSchemeChange } = useGlobalTheme();
  return (
    <Switch
      trackColor={{ false: "#767577", true: theme.base.primaryColor }}
      thumbColor={isEnabled ? "white" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={(value) => onSchemeChange(value ? 'dark' : 'light')}
      value={isEnabled}
      style={{
        transform: [{ scale: 0.8 }]
      }}
    />
  )
}

const SettingModal = ({ onLanguagePress, onCurrencyPress }: MainSettingProps) => {
  const { theme, scheme } = useGlobalTheme();
  const { t } = useTranslation();

  return (
    <SurfaceWrap
      title={ t(`setting.app settings`) }
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Row>
        <Text fontML bold >
          { t('setting.dark mode') }
        </Text>
        <Toggle 
          isEnabled={scheme === 'dark'}
        />
      </Row>
      <Row
        onPress={onLanguagePress}
        as={TouchableOpacity}
      >
        <Text fontML bold >
          { t('setting.language') }
        </Text>
        <MaterialIcons 
          name="keyboard-arrow-right" 
          size={20} 
          color={theme.base.text[200]}
        />
      </Row>
      <Row
        onPress={onCurrencyPress}
        as={TouchableOpacity}
      >
        <Text fontML bold >
          { t('setting.default currencies') }
        </Text>
        <MaterialIcons 
          name="keyboard-arrow-right" 
          size={20} 
          color={theme.base.text[200]}
        />
      </Row>
    </SurfaceWrap>
  )
}

export default SettingModal;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  margin-bottom: 8px;
  height: 40px;
`