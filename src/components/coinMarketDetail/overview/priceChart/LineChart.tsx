import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import {
  VictoryChart,
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
} from 'victory-native';
import { VictoryScatterProps } from 'victory';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
  useAnimatedProps,
} from 'react-native-reanimated';

import useGlobalTheme from '/hooks/useGlobalTheme';
import { useChartState } from '/hooks/context/useChartContext';
import useLocales from '/hooks/useLocales';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import { CONTENT_SPACING } from '/lib/constant';

import GlobalIndicator from '/components/common/GlobalIndicator';
import Cursor from './Cursor';

const CURSOR_SIZE = 16;

interface ChartProps {
  WIDTH: number;
  HEIGHT: number;
  PADDING: number;
  VOLUME_HEIGHT: number;
}

type AnimatedScatterProps = VictoryScatterProps & {
  fill: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedScatter = ({ x, y, size, fill }: AnimatedScatterProps) => {
  const animate = useSharedValue(0);

  useEffect(() => {
    animate.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, [animate]);

  const pongpong = useAnimatedProps(() => {
    return {
      r: animate.value * 12,
      opacity: 1 - animate.value,
    };
  });

  return (
    <>
      <AnimatedCircle
        fill={fill}
        r={size as number}
        cx={x as number}
        cy={y as number}
      />
      <AnimatedCircle
        fill={fill}
        cx={x as number}
        cy={y as number}
        animatedProps={pongpong}
      />
    </>
  );
};

const BaseLineLabel = React.memo((props: any) => {
  const { theme } = useGlobalTheme();
  const x = 0;
  const y = props.scale.y(props.y);
  const { isCursorActive } = props;

  return (
    <VictoryLabel
      {...props}
      x={x}
      y={y}
      style={{
        fill: isCursorActive ? theme.base.text[200] : 'transparent',
        fontSize: parseInt(theme.size.font_s, 10),
      }}
      backgroundStyle={{
        fill: isCursorActive ? theme.base.background.surface : 'transparent',
        borderRadius: 100,
      }}
      textAnchor="start"
      backgroundPadding={{
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      }}
    />
  );
});

const CustomLabel = (props: any) => {
  const { isCursorActive, color, text, x, y, dy, width } = props;
  const { theme } = useGlobalTheme();

  return (
    <VictoryLabel
      x={x}
      y={y}
      dy={dy}
      style={{
        fill: isCursorActive ? 'transparent' : color,
        fontSize: parseInt(theme.size.font_s, 10),
      }}
      textAnchor={x < 45 ? 'start' : width - x < 45 ? 'end' : 'middle'}
      text={text}
    />
  );
};

const LineChart = ({ WIDTH, HEIGHT, PADDING, VOLUME_HEIGHT }: ChartProps) => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();
  const { currency } = useLocales();
  const {
    points,
    isCursorActive,
    volumes,
    isLoading,
    changeRate,
    lowestPoint,
    highestPoint,
    prevClosingPrice,
    streamType,
  } = useChartState();

  const strokeColor = useMemo(() => {
    if (!changeRate) return theme.base.text[200];
    if (changeRate > 0) return theme.base.upColor;
    return theme.base.downColor;
  }, [changeRate, theme]);

  const lastPoint = useMemo(() => {
    if (!points) return [0, 0];
    return points.slice(-1)[0];
  }, [points]);

  return (
    <ChartContainer
      WIDTH={WIDTH}
      HEIGHT={HEIGHT}
      PADDING={PADDING}
      VOLUME_HEIGHT={VOLUME_HEIGHT}
    >
      <GlobalIndicator isLoaded={!isLoading} />
      {!isLoading && points.length && (
        <>
          <VictoryChart
            width={WIDTH + PADDING - CONTENT_SPACING * 2}
            height={HEIGHT}
            padding={{
              right: PADDING,
              top: PADDING,
              bottom: PADDING,
            }}
            scale={{ x: 'time', y: 'linear' }}
          >
            <VictoryAxis
              // grid만 사용 (x축 axis는 volume bar차트에서 출력)
              dependentAxis
              style={{
                tickLabels: {
                  fill: 'transparent',
                },
                axis: {
                  stroke: 'transparent',
                },
                grid: {
                  stroke: theme.base.background[300],
                  strokeDasharray: 8,
                },
              }}
            />
            <VictoryLine
              style={{
                data: {
                  stroke: theme.base.text[300],
                  strokeWidth: 1,
                  strokeDasharray: 3,
                },
              }}
              data={points.map(v => [v[0], prevClosingPrice])}
              x={0}
              y={1}
              interpolation="linear"
            />
            <VictoryLine
              style={{
                data: {
                  stroke: strokeColor,
                  strokeWidth: 1.5,
                },
              }}
              animate={{
                duration: 200,
                onEnter: {
                  duration: 0,
                },
                onLoad: {
                  duration: 0,
                },
              }}
              data={points}
              x={0}
              y={1}
              interpolation="basis"
            />
            <VictoryAxis
              dependentAxis
              orientation="right"
              tickLabelComponent={
                <VictoryLabel verticalAnchor="middle" textAnchor="end" />
              }
              style={{
                tickLabels: {
                  fill: isCursorActive ? theme.base.text[200] : 'transparent',
                  fontSize: parseInt(theme.size.font_xs, 10),
                },
                axis: {
                  stroke: 'transparent',
                },
                grid: {
                  stroke: 'transparent',
                  strokeDasharray: 8,
                },
              }}
            />
            <BaseLineLabel
              y={prevClosingPrice}
              dy={-5}
              text={currencyFormat({
                value: prevClosingPrice as number,
                prefix: getCurrencySymbol(currency),
              })}
              isCursorActive={isCursorActive}
            />
            <VictoryScatter
              data={[{ x: highestPoint[0], y: highestPoint[1] }]}
              size={2}
              style={{
                data: {
                  fill: isCursorActive ? 'transparent' : strokeColor,
                  opacity: 0.5,
                },
              }}
              labels={[
                `${t('coinDetail.highest')} ${currencyFormat({
                  value: highestPoint[1],
                  prefix: getCurrencySymbol(currency),
                })}`,
              ]}
              labelComponent={
                <CustomLabel
                  isCursorActive={isCursorActive}
                  color={strokeColor}
                />
              }
            />
            <VictoryScatter
              data={[{ x: lowestPoint[0], y: lowestPoint[1] }]}
              size={2}
              style={{
                data: {
                  fill: isCursorActive ? 'transparent' : strokeColor,
                  opacity: 0.5,
                },
              }}
              labels={[
                `${t('coinDetail.lowest')} ${currencyFormat({
                  value: lowestPoint[1],
                  prefix: getCurrencySymbol(currency),
                })}`,
              ]}
              labelComponent={
                <CustomLabel
                  isCursorActive={isCursorActive}
                  color={strokeColor}
                  dy={10}
                />
              }
            />
            {streamType === 'REALTIME' && (
              <VictoryScatter
                data={[
                  {
                    x: lastPoint[0],
                    y: lastPoint[1],
                  },
                ]}
                dataComponent={<AnimatedScatter fill={strokeColor} />}
                size={3}
                animate={{
                  duration: 200,
                  onLoad: {
                    duration: 0,
                  },
                }}
                style={{
                  data: {
                    fill: strokeColor,
                  },
                }}
              />
            )}
          </VictoryChart>
          <CursorContainer
            WIDTH={WIDTH}
            HEIGHT={HEIGHT}
            PADDING={PADDING}
            VOLUME_HEIGHT={VOLUME_HEIGHT}
          >
            <Cursor
              width={WIDTH - CONTENT_SPACING * 2}
              height={HEIGHT}
              CURSOR_SIZE={CURSOR_SIZE}
              PADDING={PADDING}
            />
          </CursorContainer>
          <VictoryChart
            width={WIDTH + PADDING - CONTENT_SPACING * 2}
            height={VOLUME_HEIGHT}
            padding={{
              right: PADDING,
              bottom: PADDING,
            }}
            scale={{ x: 'time', y: 'linear' }}
          >
            <VictoryBar
              data={volumes}
              x={0}
              y={1}
              // domain={{
              //   y: [
              //     Math.min(...volumes.map(v => v[1])),
              //     Math.max(...volumes.map(v => v[1])),
              //   ],
              // }}
              range={{
                y: [VOLUME_HEIGHT, 0],
              }}
              style={{
                data: {
                  fill: theme.base.text[300],
                },
              }}
            />
            <VictoryAxis
              fixLabelOverlap
              style={{
                axis: {
                  stroke: 'transparent',
                  fill: theme.base.text[200],
                },
                ticks: {
                  stroke: 'transparent',
                  fill: theme.base.text[200],
                },
                tickLabels: {
                  fill: theme.base.text[200],
                  fontSize: parseInt(theme.size.font_s, 10),
                },
              }}
            />
          </VictoryChart>
        </>
      )}
    </ChartContainer>
  );
};

export default LineChart;

const ChartContainer = styled.View<ChartProps>`
  overflow: hidden;
  margin-top: 30px;
  width: ${({ WIDTH, PADDING }) => WIDTH + PADDING}px;
  height: ${({ HEIGHT, PADDING, VOLUME_HEIGHT }) =>
    HEIGHT + PADDING + VOLUME_HEIGHT}px;
  align-items: center;
`;

const CursorContainer = styled.View<ChartProps>`
  position: absolute;
  overflow: hidden;
  width: ${({ WIDTH, PADDING }) => WIDTH + PADDING - CONTENT_SPACING * 2}px;
  height: ${({ HEIGHT, VOLUME_HEIGHT, PADDING }) =>
    HEIGHT + VOLUME_HEIGHT - PADDING}px;
  z-index: 2;
  align-items: center;
`;

const StyledCircle = styled(Circle)``;
