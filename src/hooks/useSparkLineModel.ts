import { useMemo } from 'react';
import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";

const XSIZE = 80;
const YSIZE = 40;

type ModelProps = {
  prices: number[],
}

export default function useSparkLineModel({ prices }: ModelProps) {

  return useMemo(() => {
    const formattedValues = prices.map(
      (price, i) => [price, i] as [number, number]
    );
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);    
    const scaleX = scaleLinear()
      .domain([0, prices.length])
      .range([0, XSIZE]);
    const scaleY = scaleLinear()
      .domain([minPrice, maxPrice])
      .range([YSIZE, 0]);

    return {
      minPrice,
      maxPrice,
      XSIZE,
      YSIZE,
      path: 
        shape
          .line()
          .x((d, i) => scaleX(i))
          .y(([y]) => scaleY(y))
          .curve(shape.curveBasis)(formattedValues) as string
    }
  }, [prices])
}
