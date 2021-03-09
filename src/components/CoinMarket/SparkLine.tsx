import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Model from './Model';
import styled from 'styled-components/native';

type SparkLineProps = {
  prices: number[],
  isRising: boolean,
}
const SparkLine = ({prices, isRising}:SparkLineProps) => {
  const { path, XSIZE, YSIEZE } = Model({prices});

  return (
    <SparkLineWrap width={XSIZE}> 
      <Svg height={YSIEZE} width={XSIZE}>
        <Path 
          d={path}
          stroke={isRising ? '#00e676' : '#f44336'}
          fill='transparent'
        />
      </Svg>
    </SparkLineWrap>
  )
}

export default SparkLine;


type WrapProps = {
  width: number,
}
const SparkLineWrap = styled.View<WrapProps>`
  width: ${props => props.width}px;
`