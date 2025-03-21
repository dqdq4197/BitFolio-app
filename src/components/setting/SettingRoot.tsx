import React from 'react'
import { useTranslation } from 'react-i18next'

import AppSettingList from './AppSettingList'
import List from '/components/common/List'
import SurfaceWrap from '/components/common/SurfaceWrap'

interface SettingRootProps {
  onLanguagePress: () => void
  onCurrencyPress: () => void
  onScreenThemePress: () => void
  onLounchScreenPress: () => void
}

const SettingRoot = ({
  onScreenThemePress,
  onLanguagePress,
  onCurrencyPress,
  onLounchScreenPress,
}: SettingRootProps) => {
  const { t } = useTranslation()

  return (
    <>
      <SurfaceWrap
        title={t(`setting.app settings`)}
        parentPaddingZero
        marginTopZero
        fontML
      >
        <AppSettingList
          onCurrencyPress={onCurrencyPress}
          onLanguagePress={onLanguagePress}
          onLounchScreenPress={onLounchScreenPress}
          onScreenThemePress={onScreenThemePress}
        />
      </SurfaceWrap>
      <SurfaceWrap title={t(`setting.support`)} parentPaddingZero fontML>
        <List>
          <List.Row
            left={t('setting.app version')}
            right={process.env.EXPO_PUBLIC_APP_VERSION ?? ''}
          />
        </List>
      </SurfaceWrap>
    </>
  )
}

export default SettingRoot
