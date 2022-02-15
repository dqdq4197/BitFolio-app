import React, { useMemo } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import * as d3 from 'd3';
import * as shape from 'd3-shape';
import { scaleTime, scaleLinear } from 'd3-scale';
import { getYForX, parse } from 'react-native-redash';
import * as Haptics from 'expo-haptics';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';

import { useChartState } from '/hooks/context/useChartContext';
import useLocales from '/hooks/useLocales';
import {
  AddSeparator,
  exponentToNumber,
  getOnlyDecimal,
} from '/lib/utils/currencyFormat';
import { digitToFixed } from '/lib/utils';

const { height: DHeight } = Dimensions.get('window');

interface CursorProps {
  width: number;
  height: number;
  CURSOR_SIZE: number;
  PADDING: number;
}

const Cursor = ({ width, height, CURSOR_SIZE, PADDING }: CursorProps) => {
  const translateX = useSharedValue(-100);
  const translateY = useSharedValue(0);
  const prevPoint = useSharedValue(-1);
  const { language } = useLocales();
  const {
    points,
    prevClosingPrice,
    datumX,
    datumY,
    datumYChangePercentage,
    setters: { setIsCursorActive, setChangeStatus },
  } = useChartState();

  const getSvg = useMemo(() => {
    const xDomain = [...points.map(d => d[0])];
    // , highestPrice[0], lowestPrice[0]
    const yDomain = [...points.map(d => d[1])];
    // , highestPrice[1], lowestPrice[1]

    const scaleX = scaleTime()
      .domain([Math.min(...xDomain), Math.max(...xDomain)])
      .range([0, width]);
    const scaleY = scaleLinear()
      .domain([Math.min(...yDomain), Math.max(...yDomain)])
      .range([height - PADDING * 2, 0]);
    const d = shape
      .line<number[]>()
      .x(p => scaleX(p[0]))
      .y(p => scaleY(p[1]))
      .curve(shape.curveBasis)(points) as string;

    return {
      scaleX,
      scaleY,
      svgPath: parse(d),
    };
  }, [points, width, height, PADDING]);

  const bisect = d3.bisector((d: number[]) => {
    return d[0];
  }).left;

  const getFormatedDate = (date: number) => {
    const newDate = new Date(date);
    const currentLocale = language === 'en' ? enUS : ko;
    const cFormat = (type: string, locale = currentLocale) =>
      format(newDate, type, { locale });

    return language === 'en'
      ? `${cFormat('PP')} ${cFormat('p')}`
      : `${cFormat('PPP')} ${cFormat('a')} ${cFormat('p', enUS).slice(0, -2)}`;
  };

  const onChangeCoordinate = (x: number) => {
    if (x < 0 || x >= width) return;
    setIsCursorActive(true);
    const { svgPath, scaleX } = getSvg;

    const x0 = scaleX.invert(x);
    const i = bisect(points, x0, 1);
    prevPoint.value = i;

    if (prevPoint.value !== i) {
      const y = getYForX(svgPath, x) || 0;
      const currentPoint = points[i];
      translateX.value = x - CURSOR_SIZE / 2;
      translateY.value = y - CURSOR_SIZE / 2;
      datumX.value = `${getFormatedDate(currentPoint[0])}`;
      datumY.value = [
        `${AddSeparator(Math.floor(currentPoint[1]))}`,
        `${getOnlyDecimal({
          value: exponentToNumber(currentPoint[1]),
          minLength: 2,
          noneZeroCnt: exponentToNumber(currentPoint[1]) < 1 ? 3 : 2,
        })}`,
      ];
      const changePercentage = digitToFixed(
        (100 * (currentPoint[1] - prevClosingPrice!)) / prevClosingPrice!,
        2
      );
      datumYChangePercentage.value = `${changePercentage}`;
      setChangeStatus(
        changePercentage > 0 ? 'RISE' : changePercentage === 0 ? 'EVEN' : 'FALL'
      );
      Haptics.selectionAsync();
    }
  };

  const onChangeActive = (state: boolean) => {
    if (!state) {
      setIsCursorActive(false);
      translateX.value = -100;
      translateY.value = 0;
    }
  };

  const onGestureEvent =
    useAnimatedGestureHandler<LongPressGestureHandlerGestureEvent>({
      onStart: () => {
        'worklet';

        runOnJS(onChangeActive)(true);
      },
      onActive: event => {
        'worklet';

        runOnJS(onChangeCoordinate)(event.x);
      },
      onEnd: () => {
        'worklet';

        runOnJS(onChangeActive)(false);
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <LongPressGestureHandler
      {...{ onGestureEvent }}
      onBegan={() => onChangeActive(true)}
      minDurationMs={100}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { paddingTop: PADDING, paddingBottom: PADDING },
        ]}
      >
        <CursorWrap
          as={Animated.View}
          CURSOR_SIZE={CURSOR_SIZE}
          style={animatedStyle}
        >
          <CursorLine />
          <CursorBody />
        </CursorWrap>
      </Animated.View>
    </LongPressGestureHandler>
  );
};

export default Cursor;

type WrapProps = Pick<CursorProps, 'CURSOR_SIZE'>;

const CursorWrap = styled.View<WrapProps>`
  width: ${({ CURSOR_SIZE }) => CURSOR_SIZE}px;
  height: ${({ CURSOR_SIZE }) => CURSOR_SIZE}px;
  border-radius: ${({ CURSOR_SIZE }) => CURSOR_SIZE / 2}px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.base.text[200]};
  justify-content: center;
  align-items: center;
`;

const CursorLine = styled.View`
  position: absolute;
  height: ${DHeight}px;
  width: 1px;
  background-color: ${({ theme }) => theme.base.text[200]};
`;

const CursorBody = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.base.text[100]};
`;
