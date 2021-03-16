import { useMemo } from 'react';
import { scaleTime, scaleLinear } from "d3-scale";
import * as shape from "d3-shape";

const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain)
];

interface ModelProps {
  data: [number[]],
  width: number,
  height: number,
  cursorR: number,
}
export default function Model({ data, width, height, cursorR }: ModelProps) {

  return useMemo(() => {
    const scaleX = scaleTime()
      .domain(getDomain(data.map(d => d[0])))
      .range([0, width]);
    const scaleY = scaleLinear()
      .domain(getDomain(data.map(d => d[1])))
      .range([height + cursorR, 0]);
    const d = 
      shape
      .line<number[]>()
      .x(p => scaleX(p[0]))
      .y(p => scaleY(p[1]))
      .curve(shape.curveBasis)(data) as string

      return {
        scaleX,
        scaleY,
        d,
    }
  }, [data, width, height, cursorR])
  
}

