import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import SurfaceWrap from '/components/common/SurfaceWrap';


const SPACER_SIZE = 1000;
const isIos = Platform.OS === 'ios'


const Header = () => {

  const { t } = useTranslation();

  return (
    <SurfaceWrap isMain title={t('coinDetail.latest news')} paddingBottomZero>
      { isIos && <View /> }
    </SurfaceWrap>
  )
}

export default Header;

const View = styled.View`
  position: absolute;
  z-index: -1;
  height: ${ SPACER_SIZE }px;
  background-color: ${({ theme }) => theme.base.background.surface};
  top: -${ SPACER_SIZE }px;
  left: 0;
  right: 0;
`