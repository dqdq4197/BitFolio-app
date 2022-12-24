import * as d3 from 'd3';
import { scaleLinear, scaleTime } from 'd3-scale';
import * as shape from 'd3-shape';
import { format } from 'date-fns';
import { enUS, ko } from 'date-fns/locale';
import * as Haptics from 'expo-haptics';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { getYForX, parse } from 'react-native-redash';
import styled from 'styled-components/native';

import { useChartState } from '/hooks/context/useChartContext';
import useLocales from '/hooks/useLocales';
import { CHANGE_STATE } from '/lib/constant';
import { digitToFixed } from '/lib/utils';
import {
  AddSeparator,
  exponentToNumber,
  getOnlyDecimal,
} from '/lib/utils/currencyFormat';

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
    highestPoint,
    lowestPoint,
    prevClosingPrice = 0,
    datumX,
    datumY,
    datumYChangePercentage,
    setters: { setIsCursorActive, setChangeStatus },
  } = useChartState();

  const getSvg = useMemo(() => {
    const xDomain = [...points.map(d => d[0]), highestPoint[0], lowestPoint[0]];
    const yDomain = [
      ...points.map(d => d[1]),
      highestPoint[1],
      lowestPoint[1],
      prevClosingPrice as number,
    ];

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
  }, [
    points,
    width,
    height,
    PADDING,
    highestPoint,
    lowestPoint,
    prevClosingPrice,
  ]);

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
    if (x < 0 || x >= width) {
      return;
    }

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
        (100 * (currentPoint[1] - prevClosingPrice)) / prevClosingPrice,
        2
      );
      datumYChangePercentage.value = `${changePercentage}`;
      setChangeStatus(
        changePercentage > 0
          ? CHANGE_STATE.RISE
          : changePercentage === 0
          ? CHANGE_STATE.EVEN
          : CHANGE_STATE.FALL
      );
      Haptics.selectionAsync();
    }
  };

  const onChangeActive = (isActive: boolean) => {
    setIsCursorActive(isActive);
    if (!isActive) {
      translateX.value = -100;
      translateY.value = 0;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector
      gesture={Gesture.LongPress()
        .minDuration(100)
        .maxDistance(500)
        .onStart(() => onChangeActive(true))
        .onEnd(() => onChangeActive(false))
        .runOnJS(true)
        .onTouchesMove(
          ({ changedTouches, state }) =>
            state === 4 && onChangeCoordinate(changedTouches[0].x)
        )}
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
    </GestureDetector>
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
