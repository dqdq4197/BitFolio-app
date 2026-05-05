/* eslint-disable prefer-destructuring */
import type { ChartDataReturn } from '@/types/coin-gecko-return-type'
import type { ChartTimeIntervalType } from '@/types/coingecko'

const filteredPriceData = (
  data: ChartDataReturn,
  dateFrame: ChartTimeIntervalType
): ChartDataReturn => {
  // data = [prices[number, number], marketCap[number,number] ...];
  if (!data) return data
  const { prices, market_caps, total_volumes } = data
  const start = new Date().getTime()
  let timeInterval = 0
  // eslint-disable-next-line default-case
  switch (dateFrame) {
    case 1:
      timeInterval = 10
      break
    case 7:
      timeInterval = 60 * 1
      break
    case 30:
      timeInterval = 60 * 6
      break
    case 365:
      timeInterval = 60 * 24 * 2
      break
    case 'max':
      timeInterval = 60 * 24 * 8
      break
  }
  timeInterval *= 60 * 1000
  let tempTime = 0
  const pricesResult = []
  const marketCapsResult = []
  const volumesResult = []

  for (let i = 0; i < prices.length; i += 1) {
    const isFirst = i === 0
    const isLast = i === prices.length - 1

    if (isFirst) {
      pricesResult.push(prices[i])
      marketCapsResult.push(market_caps[i])
      volumesResult.push(total_volumes[i])
      tempTime = prices[i][0]
    } else if (isLast) {
      pricesResult.push(prices[i])
      marketCapsResult.push(market_caps[i])
      volumesResult.push(total_volumes[i])
      break
    } else if (prices[i][0] >= tempTime + timeInterval) {
      pricesResult.push(prices[i])
      marketCapsResult.push(market_caps[i])
      volumesResult.push(total_volumes[i])
      tempTime = prices[i][0]
    }
  }

  const elapsed = new Date().getTime() - start

  if (elapsed > 3) {
    console.log('걸린 시간', elapsed)
  }

  return {
    prices: pricesResult,
    market_caps: marketCapsResult,
    total_volumes: volumesResult,
  }
}

export default filteredPriceData
