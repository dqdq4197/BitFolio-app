import React from 'react';
import { Text, View, StyleSheet, Dimensions } from "react-native";
// import Animated, {
//   useAnimatedProps,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// // import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import Svg, { Path } from "react-native-svg";
// import { mixPath, useVector } from "react-native-redash";
import { CharDataReturn } from '/lib/api/CoinGeckoReturnType';

// // const { width } = Dimensions.get("window");
// const AnimatedPath = Animated.createAnimatedComponent(Path);

type LineChartProps = {
  data: CharDataReturn
}
const LineChart = ({ data }: LineChartProps) => {
  // const translation = useVector();
  // const transition = useSharedValue(0);
  // const previous = useSharedValue(0);
  // const current = useSharedValue(0);
  console.log(data);
  // const animateProps = useAnimatedProps(() => {
  //   const previosPath = 
  // })

  return (
    <>
    </>
  )
}

export default LineChart;