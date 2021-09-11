import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import SurfaceTopView from '/components/common/SurfaceTopView';
import Text from '/components/common/Text';

const Header = () => {

  const { t } = useTranslation();

  return (
    <Container>
      <SurfaceTopView />
      <Text 
        color100 
        bold 
        fontX
      >
        { t('coinDetail.latest news') }
      </Text>
    </Container>
  )
}

export default Header;

const Container = styled.View`
  padding: ${({ theme }) => `${ theme.content.surfacePadding } ${ theme.content.spacing }`};
`