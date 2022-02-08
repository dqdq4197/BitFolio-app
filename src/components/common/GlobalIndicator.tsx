import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import useGlobalTheme from '/hooks/useGlobalTheme';

const { width } = Dimensions.get('window');

interface IndicatorType {
  size?: 'large' | 'small';
  isLoaded: boolean;
  transparent?: boolean;
}

const GlobalIndicator = ({
  size = 'large',
  isLoaded,
  transparent = false,
}: IndicatorType) => {
  const { theme } = useGlobalTheme();

  if (isLoaded) return <></>;
  return (
    <IndicatorWrap transparent={transparent}>
      <ActivityIndicator size={size} color={theme.base.text[100]} />
    </IndicatorWrap>
  );
};

export default GlobalIndicator;

type WrapProps = {
  transparent: boolean;
};

const IndicatorWrap = styled.View<WrapProps>`
  position: absolute;
  flex: 1;
  width: ${width}px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.base.background[200]};
  left: 0;
  z-index: 111;
`;
