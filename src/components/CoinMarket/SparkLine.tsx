import React from 'react';
import Svg, { Path } from 'react-native-svg';
import useSparkLineModel from '/hooks/useSparkLineModel';
import styled from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';

type SparkLineProps = {
  prices: number[],
  isRising: boolean | null,
}
const SparkLine = ({ prices, isRising }:SparkLineProps) => {
  const { path, XSIZE, YSIZE } = useSparkLineModel({prices});
  const { theme } = useGlobalTheme();

  return (
    <SparkLineWrap width={XSIZE}> 
      <Svg height={YSIZE} width={XSIZE}>
        <Path 
          d={path}
          stroke={
            isRising === null 
              ? theme.base.text[200]
              : isRising 
                ? theme.base.upColor
                : theme.base.downColor

          }
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