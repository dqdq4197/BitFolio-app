import * as React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { scaleTime, scaleLinear } from "d3-scale";
import * as shape from "d3-shape";
import Cursor from './Cursor';
import { useVector, parse } from 'react-native-redash';
import { VictoryCursorContainer, VictoryChart } from 'victory-native';


interface GraphProps {
  data: [number[]]
}

const φ = (1 + Math.sqrt(5)) / 2;
const { width, height: wHeight } = Dimensions.get("window");
const height = (1 - 1 / φ) * wHeight;
const strokeWidth = 4;
const padding = strokeWidth / 2;
const CURSOR_RADIUS = 8;
const STROKE_WIDTH = CURSOR_RADIUS / 2;

const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain)
];

export default ({ data }: GraphProps) => {
  const translation = useVector();
  const scaleX = scaleTime()
    .domain(getDomain(data.map(d => d[0])))
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map(d => d[1])))
    .range([height - padding, padding]);
  const d = 
    shape
    .line<number[]>()
    .x(p => scaleX(p[0]))
    .y(p => scaleY(p[1]))
    .curve(shape.curveBasis)(data) as string

  return (
    <View style={styles.container}>
      <Svg>
        <Path 
          d={d}
          fill='transparent'
          stroke={'white'}
        />
      </Svg>
      <Cursor
        path={d}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginTop: 100,
    width,
    height
  }
});