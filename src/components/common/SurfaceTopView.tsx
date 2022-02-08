import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const isIos = Platform.OS === 'ios';
const SPACER_SIZE = 1000;

const SurfaceTopView = () => {
  return <>{isIos && <View />}</>;
};

export default SurfaceTopView;

const View = styled.View`
  position: absolute;
  z-index: -1;
  height: ${SPACER_SIZE}px;
  background-color: ${({ theme }) => theme.base.background.surface};
  top: -${SPACER_SIZE}px;
  left: 0;
  right: 0;
`;
