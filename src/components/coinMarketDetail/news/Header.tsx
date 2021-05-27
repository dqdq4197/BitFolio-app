import React from 'react';
import { useTranslation } from 'react-i18next';
import SurfaceWrap from '/components/common/SurfaceWrap';
import SurfaceTopView from '/components/common/SurfaceTopView';


const Header = () => {

  const { t } = useTranslation();

  return (
    <SurfaceWrap 
      title={t('coinDetail.latest news')} 
      paddingBottomZero
      marginTopZero
    >
      <SurfaceTopView />
    </SurfaceWrap>
  )
}

export default Header;