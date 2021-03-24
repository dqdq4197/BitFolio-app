import { useMemo } from 'react';
import { scaleTime, scaleLinear } from "d3-scale";
import * as shape from "d3-shape";
import * as d3 from 'd3';



const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain)
];

interface ModelProps {
  data: {
    prices: [number[]],
    total_volumes: [number[]]
  }
  width: number,
  height: number,
  cursorR: number
}
export default function Model({ data, width, height, cursorR }: ModelProps) {
  // ohlc
  return useMemo(() => {
    // Line Chart
    const scaleX = scaleTime()
      .domain(getDomain(data['prices'].map(d => d[0])))
      .range([0, width]);
    const scaleY = scaleLinear()
      .domain(getDomain(data['prices'].map(d => d[3])))
      .range([height + cursorR, 0]);

    const d = 
      shape
      .line<number[]>()
      .x(p => scaleX(p[0]))
      .y(p => scaleY(p[3]))
      .curve(shape.curveBasis)(data['prices']) as string
    //  
    // Volume Chart

    const yVolumeScale = d3
      .scaleLinear()
      .domain(getDomain(data['total_volumes'].map(d => d[1])))
      .range([height, height * (3 / 4)]);

      

      return {
        scaleX,
        scaleY,
        yVolumeScale,
        d,
    }
  }, [data, width, height, cursorR])
  
}

