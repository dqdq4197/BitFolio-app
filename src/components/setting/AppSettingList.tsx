import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '/hooks/useRedux'
import useGlobalTheme from '/hooks/useGlobalTheme'
import useLocales from '/hooks/useLocales'
import { CURRENCIES } from '/lib/constant'

import List from '/components/common/List'

interface SettingListProps {
  onScreenThemePress: () => void
  onLanguagePress: () => void
  onCurrencyPress: () => void
  onLounchScreenPress: () => void
}

const AppSettingList = ({
  onCurrencyPress,
  onLanguagePress,
  onLounchScreenPress,
  onScreenThemePress,
}: SettingListProps) => {
  const { t } = useTranslation()
  const { scheme } = useGlobalTheme()
  const { language, currency } = useLocales()
  const { launchScreen } = useAppSelector(state => ({
    launchScreen: state.baseSettingReducer.launchScreen,
  }))

  return (
    <List>
      <List.Row
        isLinked
        onPress={onScreenThemePress}
        left={t('setting.screen theme')}
        right={scheme === 'dark' ? t(`setting.dark`) : t(`setting.light`)}
      />
      <List.Row
        isLinked
        onPress={onLanguagePress}
        left={t('setting.language')}
        right={language === 'en' ? t(`setting.english`) : t(`setting.korean`)}
      />
      <List.Row
        isLinked
        onPress={onCurrencyPress}
        left={t('setting.default currencies')}
        right={`${CURRENCIES[currency].iso} - ${CURRENCIES[currency].symbol}`}
      />
      <List.Row
        isLinked
        onPress={onLounchScreenPress}
        left={t('setting.launch screen')}
        right={t(
          `common.${
            launchScreen.toLowerCase() as 'home' | 'news' | 'portfolio'
          }`
        )}
      />
    </List>
  )
}

export default AppSettingList
