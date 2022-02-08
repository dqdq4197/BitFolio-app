import React, { useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components/native';

import useSparkLineModel from '/hooks/useSparkLineModel';
import useGlobalTheme from '/hooks/useGlobalTheme';

type SparkLineProps = {
  prices: number[];
  isRising: boolean | null;
};

const XSIZE = 80;
const YSIZE = 40;

const SparkLine = ({ prices, isRising }: SparkLineProps) => {
  const { path } = useSparkLineModel({
    prices,
    xSize: XSIZE,
    ySize: YSIZE,
  });
  const { theme } = useGlobalTheme();

  const strokeColor = useMemo(() => {
    if (isRising === null) {
      return theme.base.text[200];
    }

    if (isRising) {
      return theme.base.upColor;
    }

    return theme.base.downColor;
  }, [isRising, theme]);

  return (
    <SparkLineWrap width={XSIZE}>
      <Svg height={YSIZE} width={XSIZE}>
        <Path d={path} stroke={strokeColor} fill="transparent" />
      </Svg>
    </SparkLineWrap>
  );
};

export default SparkLine;

type WrapProps = {
  width: number;
};

const SparkLineWrap = styled.View<WrapProps>`
  width: ${props => props.width}px;
`;
