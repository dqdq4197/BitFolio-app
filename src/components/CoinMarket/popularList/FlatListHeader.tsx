import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';

const SPACER_SIZE = 1000;
const isIos = Platform.OS === 'ios'

type HeaderProps = {
  title: string,
  description: string
}


const FlatListHeader = ({ title, description }: HeaderProps) => {
  return (
    <SurfaceWrap title={title} isMain >
      { isIos && <View /> }
      <Text fontML margin="10px 0 0 0" lineHeight={20}>
        { description }
      </Text>
    </SurfaceWrap>
  )
}

export default FlatListHeader;


const View = styled.View`
  position: absolute;
  z-index: -1;
  height: ${ SPACER_SIZE }px;
  background-color: ${({ theme }) => theme.base.background.surface};
  top: -${ SPACER_SIZE }px;
  left: 0;
  right: 0;
`
