import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { parse } from "react-native-redash";

export const XSIZE = 80;
export const YSIEZE = 40;
const POINTS = 72;

type ModelProps = {
  prices: number[],
}

const Model = ({prices}: ModelProps) => {
  const slicedPrices = prices.slice(-POINTS);
  const formattedValues = slicedPrices.map(
    (price, i) => [price, i] as [number, number]
  );
  const minPrice = Math.min(...slicedPrices);
  const maxPrice = Math.max(...slicedPrices);    
  const scaleX = scaleLinear()
    .domain([0, POINTS])
    .range([0, XSIZE]);
  const scaleY = scaleLinear()
    .domain([minPrice, maxPrice])
    .range([YSIEZE, 0]);
  return {
    minPrice,
    maxPrice,
    XSIZE,
    YSIEZE,
    path: 
      shape
        .line()
        .x((d, i) => scaleX(i))
        .y(([y]) => scaleY(y))
        .curve(shape.curveBasis)(formattedValues) as string
  }
}

export default Model;