import { APP_VERSION } from '@env'
import React from 'react'
import { useTranslation } from 'react-i18next'

import AppSettingList from './AppSettingList'
import Blank from './Blank'
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
          <List.Row left={t('setting.app version')} right={APP_VERSION} />
        </List>
        <Blank />
      </SurfaceWrap>
    </>
  )
}

export default SettingRoot
