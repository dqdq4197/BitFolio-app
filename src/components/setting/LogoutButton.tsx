import React from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'

import useGlobalTheme from '/hooks/useGlobalTheme'
import type { SettingScreenProps } from '/types/navigation'

const LogoutButton = () => {
  const { t } = useTranslation()
  const { theme } = useGlobalTheme()
  const navigation =
    useNavigation<SettingScreenProps<'Overview'>['navigation']>()

  const handleIconPress = () => {
    Alert.alert(
      t(`auth.logout notice`),
      '',
      [
        {
          text: t(`common.cancel`),
          onPress: () => console.log('cancel log out behavior'),
          style: 'cancel',
        },
        {
          text: t(`auth.log out`),
          onPress: async () => {
            await auth().signOut()
            navigation.navigate('Main', {
              screen: 'Home',
              params: { screen: 'CoinMarketHome' },
            })
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <TouchableOpacity onPress={handleIconPress}>
      <MaterialIcons name="logout" size={24} color={theme.base.text[200]} />
    </TouchableOpacity>
  )
}

export default LogoutButton
