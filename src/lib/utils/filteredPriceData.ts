/* eslint-disable prefer-destructuring */
import type { ChartDataReturn } from '/types/coinGeckoReturnType';
import type { ChartTimeIntervalType } from '/types/coingecko';

const filteredPriceData = (
  data: ChartDataReturn,
  dateFrame: ChartTimeIntervalType
): ChartDataReturn => {
  // data = [prices[number, number], marketCap[number,number] ...];
  if (!data) return data;
  const { prices, market_caps, total_volumes } = data;
  const start = new Date().getTime();
  let timeInterval = 0;
  // eslint-disable-next-line default-case
  switch (dateFrame) {
    case 1:
      timeInterval = 10;
      break;
    case 7:
      timeInterval = 60 * 1;
      break;
    case 30:
      timeInterval = 60 * 6;
      break;
    case 365:
      timeInterval = 60 * 24 * 2;
      break;
    case 'max':
      timeInterval = 60 * 24 * 8;
      break;
  }
  timeInterval *= 60 * 1000;
  let tempTime = 0;
  const pricesResult = [];
  const marketcapsResult = [];
  const volumesResult = [];

  for (let i = 0; i < prices.length; i += 1) {
    if (i === 0) {
      pricesResult.push(prices[0]);
      marketcapsResult.push(market_caps[0]);
      volumesResult.push(total_volumes[0]);
      tempTime = prices[0][0];
      continue;
    }

    if (prices.length - 1 === i) {
      pricesResult.push(prices[i]);
      marketcapsResult.push(market_caps[i]);
      volumesResult.push(total_volumes[i]);
      break;
    }

    if (prices[i][0] >= tempTime + timeInterval) {
      pricesResult.push(prices[i]);
      marketcapsResult.push(market_caps[i]);
      volumesResult.push(total_volumes[i]);
      tempTime = prices[i][0];
    }
  }

  const elapsed = new Date().getTime() - start;

  if (elapsed > 3) {
    console.log('걸린 시간', elapsed);
  }

  return {
    prices: pricesResult,
    market_caps: marketcapsResult,
    total_volumes: volumesResult,
  };
};

export default filteredPriceData;
