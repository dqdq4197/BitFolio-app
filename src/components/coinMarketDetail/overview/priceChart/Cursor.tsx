import React, { useState, useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import styled from 'styled-components/native';
import { 
  LongPressGestureHandler, 
  LongPressGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import * as d3 from 'd3';
import * as shape from "d3-shape";
import { scaleTime, scaleLinear } from "d3-scale";
import { getYForX, parse } from "react-native-redash";
import * as Haptics from 'expo-haptics';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import { chartType } from 'base-types';

import useLocales from '/hooks/useLocales';
import { AddSeparator, exponentToNumber, getOnlyDecimal } from '/lib/utils/currencyFormat';
import { digitToFixed } from '/lib/utils';

const { height } = Dimensions.get('window');

interface CursorProps {
  data: number[][]
  width: number
  height: number
  CURSOR_SIZE: number
  PADDING: number
  highestPrice: number[]
  lowestPrice: number[]
  datumX: Animated.SharedValue<string>
  datumY: Animated.SharedValue<string[]> 
  datumYChangePercentage: Animated.SharedValue<string>
  onCursorActiveChange: (state: boolean) => void
  onPercentageStatusChange: (status: chartType.percentageStatus) => void
}

const Cursor = ({ 
  data, 
  width, 
  height, 
  CURSOR_SIZE, 
  PADDING,
  highestPrice,
  lowestPrice,
  datumX,
  datumY,
  datumYChangePercentage,
  onCursorActiveChange,
  onPercentageStatusChange
}: CursorProps) => {
  const [translateX, setTranslateX] = useState(-100);
  const [translateY, setTranslateY] = useState(0);
  const [prevPoint, setPrevPoint] = useState(0);
  const { language } = useLocales();
  
  const getSvg = useMemo(() => {
    const xDomain = [...data.map(d => d[0]), highestPrice[0], lowestPrice[0]];
    const yDomain = [...data.map(d => d[1]), highestPrice[1], lowestPrice[1]];
    
    const scaleX = scaleTime()
      .domain([Math.min(...xDomain), Math.max(...xDomain)])
      .range([0, width]);
    const scaleY = scaleLinear()
      .domain([Math.min(...yDomain), Math.max(...yDomain)])
      .range([height - PADDING * 2 , 0]);
    const d = 
      shape
      .line<number[]>()
      .x(p => scaleX(p[0]))
      .y(p => scaleY(p[1]))
      .curve(shape.curveCatmullRom)(data) as string
    
      return {
        scaleX,
        scaleY,
        svgPath: parse(d),
    }
  }, [data, width, height, highestPrice, lowestPrice])

  const bisect = d3.bisector((d: number[]) => {
    return d[0]
  }).left;

  const getFormatedDate = (date: number) => {
    const newDate = new Date(date);
    const currentLocale = language === 'en' ? enUS : ko;
    const cFormat = (type: string, locale = currentLocale) => format(newDate, type, { locale });

    return language === 'en' 
      ? cFormat('PP') + ' ' + cFormat('p')
      : cFormat('PPP') + ' ' + cFormat('a') + ' ' + cFormat('p', enUS).slice(0, -2);
  }

  const onChangeCoordinate = (x:number) => {
    if(x < 0 || x >= width) return;
    const { svgPath, scaleX } = getSvg;
    onCursorActiveChange(true);
    const y = getYForX(svgPath, x) || 0;
    const x0 = scaleX.invert(x);
    const i = bisect(data, x0, 1);
    const currentPoint = data[i];
    setTranslateX(x);
    setTranslateY(y as number);
    setPrevPoint(i);

    if(prevPoint !== i) {
      Haptics.selectionAsync();
      const changePercentage = digitToFixed(100 * (currentPoint[1] - data[0][1]) / data[0][1], 2);

      datumX.value = `${ getFormatedDate(currentPoint[0]) }`
      datumY.value = [
        `${ AddSeparator(Math.floor(currentPoint[1])) }`,
        `${ getOnlyDecimal({ 
            value: exponentToNumber(currentPoint[1]), 
            minLength: 2, 
            noneZeroCnt: exponentToNumber(currentPoint[1]) < 1 ? 3 : 2 
          }) }`
      ]
      datumYChangePercentage.value = `${ changePercentage }`
      onPercentageStatusChange(
        changePercentage > 0 
        ? 'positive' 
        : changePercentage === 0 
          ? 'unchanged' 
          : 'negative'
      )
    }
  }

  const onChangeActive = (state:boolean) => {
    if(!state) {
      onCursorActiveChange(false);
      setTranslateX(-100);
      setTranslateY(0);
    } 
  }
  
  const onGestureEvent = useAnimatedGestureHandler<LongPressGestureHandlerGestureEvent>({
    onStart: () => {
      runOnJS(onChangeActive)(true)
    },
    onActive: (event) => {
      runOnJS(onChangeCoordinate)(event.x)
    },
    onEnd: () => {
      runOnJS(onChangeActive)(false)
    },
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
          { paddingTop: PADDING, paddingBottom: PADDING }
        ]}
      >
        <CursorWrap 
          CURSOR_SIZE={ CURSOR_SIZE }
          style={{ 
            transform: [
              { translateX: translateX - CURSOR_SIZE / 2 },
              { translateY: translateY - CURSOR_SIZE / 2 },
            ]
          }}
        >
          <CursorLine />
          <CursorBody />
        </CursorWrap>
      </Animated.View>
    </LongPressGestureHandler>
  );
};

export default Cursor;

type WrapProps = Pick<CursorProps, 'CURSOR_SIZE'>

const CursorWrap = styled.View<WrapProps>`
  width: ${({ CURSOR_SIZE }) => CURSOR_SIZE }px;
  height: ${({ CURSOR_SIZE }) => CURSOR_SIZE }px;
  border-radius: ${({ CURSOR_SIZE }) => CURSOR_SIZE  / 2}px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.base.text[200]};
  justify-content: center;
  align-items: center;
`

const CursorLine = styled.View`
  position: absolute;
  height: ${height}px;
  width: 1px;
  background-color: ${({ theme }) => theme.base.text[200]};
`

const CursorBody = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.base.text[100]};;
`