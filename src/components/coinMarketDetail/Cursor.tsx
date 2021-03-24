import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LongPressGestureHandler, LongPressGestureHandlerGestureEvent } from "react-native-gesture-handler";
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
const CURSOR = 10;


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
    setTranslateY(y);
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
        {...{onGestureEvent}}
        minDurationMs={300}
      >
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View 
            style={[styles.cursor, { 
              transform: [
                { translateX: translateX - CURSOR / 2 },
                { translateY: translateY - CURSOR / 2 },
              ]
            }]}
          >
            <View style={styles.line}/>
            <View style={styles.cursorBody} />
          </Animated.View>
        </Animated.View>
      </LongPressGestureHandler>
    </View>
  );
};

export default Cursor;

const styles = StyleSheet.create({
  cursor: {
    position: 'relative',
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  cursorBody: {
    width: 2,
    height: 2,
    borderRadius: 3,
    backgroundColor: "black",
  },
  line: {
    position:'absolute',
    height: height,
    width: 1,
    backgroundColor: 'white',
  }
});
