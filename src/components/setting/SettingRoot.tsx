import React from 'react';
import { Switch, TouchableOpacity } from 'react-native';
import { baseTypes } from 'base-types';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';


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
    />
  )
}

const SettingModal = ({ onLanguagePress, onCurrencyPress }: MainSettingProps) => {
  const { theme, scheme } = useGlobalTheme();
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <View>
          <View style={{
            transform: [{
              rotate: '240deg'
            }]
          }}>
            <Ionicons 
              name="moon-sharp" 
              size={24} 
              color={theme.base.text[200]}
            />
          </View>
          <Text fontX bold margin="0 0 0 15px">
            { t('setting.dark mode') }
          </Text>
        </View>
        <Toggle 
          isEnabled={scheme === 'dark'}
        />
      </Row>
      <Row
        onPress={onLanguagePress}
        as={TouchableOpacity}
      >
        <View>
          <MaterialIcons 
            name="language" 
            size={24} 
            color={theme.base.text[200]}
          />
          <Text fontX bold margin="0 0 0 15px">
            { t('setting.language') }
          </Text>
        </View>
        <MaterialIcons 
          name="keyboard-arrow-right" 
          size={28} 
          color={theme.base.text[200]}
        />
      </Row>
      <Row
        onPress={onCurrencyPress}
        as={TouchableOpacity}
      >
        <View>
          <MaterialCommunityIcons 
            name="currency-sign" 
            size={24} 
            color={theme.base.text[200]}
          />
          <Text fontX bold margin="0 0 0 15px">
            { t('setting.currency') }
          </Text>
        </View>
        <MaterialIcons 
          name="keyboard-arrow-right" 
          size={28} 
          color={theme.base.text[200]}
        />
      </Row>
    </Container>
  )
}

export default SettingModal;


const Container = styled.View`
  width: 100%;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  margin-top: 30px;
`

const View = styled.View`
  flex-direction: row;
`