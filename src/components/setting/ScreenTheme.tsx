import React from 'react'
import { useTranslation } from 'react-i18next'

import useGlobalTheme from '/hooks/useGlobalTheme'

import SurfaceWrap from '/components/common/SurfaceWrap'
import Select from '/components/common/Select'
import Blank from './Blank'

const ScreenTheme = () => {
  const { localScheme, onSchemeChange } = useGlobalTheme()
  const { t } = useTranslation()

  return (
    <SurfaceWrap
      title={t(`setting.screen theme settings`)}
      flex={1}
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Select>
        <Select.Option
          onPress={() => onSchemeChange('dark')}
          title={t(`setting.dark mode`)}
          enabled={localScheme === 'dark'}
        />
        <Select.Option
          onPress={() => onSchemeChange('light')}
          title={t(`setting.light mode`)}
          enabled={localScheme === 'light'}
        />
        <Select.Option
          onPress={() => onSchemeChange('default')}
          title={t(`setting.system theme`)}
          enabled={localScheme === 'default'}
        />
      </Select>
      <Blank />
    </SurfaceWrap>
  )
}

export default ScreenTheme
