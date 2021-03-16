import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import * as d3 from 'd3';
import { ScaleTime } from 'd3-scale';
import { getYForX, parse  } from "react-native-redash";
import { setDatum } from '/store/coinMarketDetail';
import { useAppDispatch } from '/hooks/useRedux';

const { height } = Dimensions.get('window');
const CURSOR = 10;
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


interface CursorProps {
  path: string,
  scaleX: ScaleTime<number, number, never>,
  data: [number[]],
}

const Cursor = ({ path, scaleX, data }: CursorProps) => {
  const svgPath = parse(path);
  const [translateX, setTranslateX] = useState(-100);
  const [translateY, setTranslateY] = useState(-100);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();

  const bisect = d3.bisector((d: number[]) => {
    return d[0]
  }).left;

  const onChangeCoordinate = (x:number) => {
    const y = getYForX(svgPath, x)
    const x0 = scaleX.invert(x);
    const i = bisect(data, x0, 1);
    const selectedData = data[i];
    setTranslateX(x);
    setTranslateY(y);
    dispatch(
      setDatum({
        x: selectedData[0], 
        y: selectedData[1]}
      )
    )
  }

  const onChangeActive = (state:boolean) => {
    setIsActive(state);
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
  
  const onGestureEvent = useAnimatedGestureHandler({
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
      <PanGestureHandler
        {...{ onGestureEvent }}
      >
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View 
            style={[styles.cursor, { 
              transform: [
                { translateX: translateX - CURSOR / 2 },
                { translateY: translateY - CURSOR / 2 },
                { scale: isActive ? 1 : 0}
              ]
            }]}
          >
            <View style={styles.line}/>
            <View style={styles.cursorBody} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Cursor;