import React, {useState, useRef} from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
  interpolate,
} from "react-native-reanimated";
import * as d3 from 'd3';
import { getYForX, interpolatePath, parse  } from "react-native-redash";

const { height, width } = Dimensions.get('window');
const CURSOR = 10;
const styles = StyleSheet.create({
  cursor: {
    position: 'relative',
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    borderWidth: 1,
    borderColor: 'white',
    // backgroundColor: "white",
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
  },
  tooltip: {
    position:'relative',
    
  },
  text: {
    position:'absolute',
    color: 'white',
    fontSize: 14,
    width: 200,
    height:100
  },
  text2: {
    marginTop: 20,
    position:'absolute',
    color: 'white',
    fontSize: 14,
    width: 200,
    height:100
  }
});


interface CursorProps {
  path: string,
  valueX: [number, number],
  valueY: [number, number]
}

const Cursor = ({ path, valueX, valueY, scaleX, data }: any) => {
  const svgPath = parse(path);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [datum, setDatum] = useState({
    x: 0,
    y: 0
  })

  // const price = useDerivedValue(() => {
    
  //   return `$ ${round(p, 2).toLocaleString("en-US", { currency: "USD" })}`;
  // });
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
    setDatum({
      x: selectedData[0],
      y: selectedData[1]
    })
  }

  const onChangeActive = (state:boolean) => {
    setIsActive(state);
    if(!state) {
      setTranslateX(-100);
      setTranslateY(0);
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
      <PanGestureHandler {...{ onGestureEvent }}>
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
            <View style={styles.tooltip}>
              <Text style={styles.text}>
                {Math.floor(datum.y).toLocaleString("en-US", { currency: "KRW" })}
              </Text>
              <Text style={styles.text2}>
                {new Date(datum.x).getHours()}
              </Text>
            </View>
            <View style={styles.line}/>
            <View style={styles.cursorBody} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Cursor;