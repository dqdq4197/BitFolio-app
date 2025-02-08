import React from 'react'
import { useTranslation } from 'react-i18next'

import useLocales from '/hooks/useLocales'

import Select from '/components/common/Select'
import SurfaceWrap from '/components/common/SurfaceWrap'

const Language = () => {
  const { language, onLanguageChange } = useLocales()
  const { t } = useTranslation()

  return (
    <SurfaceWrap
      title={t(`setting.language settings`)}
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Select>
        <Select.Option
          onPress={() => onLanguageChange('en')}
          title="English"
          subTitle={t(`setting.english`)}
          enabled={language === 'en'}
        />
        <Select.Option
          onPress={() => onLanguageChange('ko')}
          title="한국어"
          subTitle={t(`setting.korean`)}
          enabled={language === 'ko'}
        />
      </Select>
    </SurfaceWrap>
  )
}

export default Language
