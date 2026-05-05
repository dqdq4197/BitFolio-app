import { useMemo } from 'react'
import * as shape from 'd3-shape'
import { scaleLinear } from 'd3-scale'

type ModelProps = {
  prices: number[]
  xSize: number
  ySize: number
}

export default function useSparkLineModel({
  prices,
  xSize,
  ySize,
}: ModelProps) {
  return useMemo(() => {
    const formattedValues = prices.map(
      (price, i) => [price, i] as [number, number]
    )
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const scaleX = scaleLinear().domain([0, prices.length]).range([0, xSize])
    const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([ySize, 0])

    return {
      minPrice,
      maxPrice,
      scaleY,
      path: shape
        .line()
        .x((d, i) => scaleX(i))
        .y(([y]) => scaleY(y))
        .curve(shape.curveCardinal)(formattedValues) as string,
    }
  }, [prices, xSize, ySize])
}
