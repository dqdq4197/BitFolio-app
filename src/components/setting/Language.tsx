import React from 'react';
import { useTranslation } from 'react-i18next';

import useLocales from '/hooks/useLocales';

import SurfaceWrap from '/components/common/SurfaceWrap';
import Select from '/components/common/Select';
import Blank from './Blank';

const Language = () => {
  const { language, onLanguageChange } = useLocales();
  const { t } = useTranslation();

  console.log(language);
  return (
    <SurfaceWrap
      title={t(`setting.language settings`)}
      flex={1}
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
      <Blank />
    </SurfaceWrap>
  );
};

export default Language;
