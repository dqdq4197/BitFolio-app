import React from 'react';
import Svg, { Path } from 'react-native-svg';
import useSparkLineModel from '/hooks/useSparkLineModel';
import styled from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';

type SparkLineProps = {
  prices: number[],
  isRising: boolean | null,
}

const XSIZE = 80;
const YSIZE = 40;

const SparkLine = ({ prices, isRising }:SparkLineProps) => {
  const { path } = useSparkLineModel({
    prices,
    xSize: XSIZE,
    ySize: YSIZE
  });
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