import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
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
import { getYForX, parse } from "react-native-redash";
import * as Haptics from 'expo-haptics';
import { setDatum } from '/store/coinMarketDetail';
import { useAppDispatch } from '/hooks/useRedux';
import useLineChartModel from '/hooks/useLineChartModel';

const { height } = Dimensions.get('window');
const CURSOR_SIZE = 16;


interface CursorProps {
  data: [number[]],
  width: number,
  height: number,
  cursorR: number,
}

const Cursor = ({ data, width, height, cursorR }: CursorProps) => {
  const [translateX, setTranslateX] = useState(-100);
  const [translateY, setTranslateY] = useState(0);
  const [prevPoint, setPrevPoint] = useState(0);
  const dispatch = useAppDispatch();
  const { scaleX, d } = useLineChartModel({data, width, height, cursorR});
  const svgPath = parse(d);
  
  const bisect = d3.bisector((d: number[]) => {
    return d[0]
  }).left;

  const onChangeCoordinate = (x:number) => {
    if(x < 0 || x >= width) return;
    const y = getYForX(svgPath, x)
    const x0 = scaleX.invert(x);
    const i = bisect(data, x0, 1);
    const currentPoint = data[i];
    setTranslateX(x);
    setTranslateY(y as number);
    setPrevPoint(i);
    if(prevPoint !== i) {
      Haptics.selectionAsync();
      dispatch(
        setDatum({
          x: currentPoint[0], 
          y: currentPoint[1]
        })
      )
    }
  }

  const onChangeActive = (state:boolean) => {
    if(!state) {
      setTranslateX(-100);
      setTranslateY(0);
      dispatch(
        setDatum({
          x: 0,
          y: 0
        })
      )
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
    <View style={StyleSheet.absoluteFill}>
      <LongPressGestureHandler
        {...{ onGestureEvent }}
        minDurationMs={300}
      >
        <Animated.View style={StyleSheet.absoluteFill}>
          <CursorWrap 
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
    </View>
  );
};

export default Cursor;

const CursorWrap = styled.View`
  width: ${CURSOR_SIZE}px;
  height: ${CURSOR_SIZE}px;
  border-radius: ${CURSOR_SIZE / 2}px;
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

