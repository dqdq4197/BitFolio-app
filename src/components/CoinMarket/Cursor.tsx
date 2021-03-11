import React, {useState, useRef} from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { getYForX, Vector, parse } from "react-native-redash";


const { height } = Dimensions.get('window');
const CURSOR = 10;
const styles = StyleSheet.create({
  cursor: {
    position: 'relative',
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cursorBody: {
    width: 6,
    height: 6,
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
}

const Cursor = ({ path }: CursorProps) => {
  const isActive = useSharedValue(false);
  const svgPath = parse(path);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  
  const onChangeCoordinate = (x:number) => {
    const y = getYForX(svgPath, x)
    setTranslateX(x);
    setTranslateY(y);
  }

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true;
    },
    onActive: (event) => {
      runOnJS(onChangeCoordinate)(event.x)
    },
    onEnd: () => {
      isActive.value = false;
    },
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View 
            style={[styles.cursor, { 
              transform: [
                { translateX: translateX - CURSOR / 2 },
                { translateY: translateY - CURSOR / 2 },
                { scale: isActive.value ? 1 : 0 }
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