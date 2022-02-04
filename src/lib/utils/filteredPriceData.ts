import { baseTypes } from 'base-types';

import { ChartDataReturn } from '/types/CoinGeckoReturnType';

const filteredPriceData = (
  data: ChartDataReturn,
  dateFrame: baseTypes.ChartTimeFrame
): ChartDataReturn => {
  // data = [prices[number, number], marketCap[number,number] ...];
  if (!data) return data;
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
  let pricesResult = [];
  let marketcapsResult = [];
  let volumesResult = [];

  for (let i = 0; i < data.prices.length; i++) {
    if (i === 0) {
      pricesResult.push(data.prices[0]);
      marketcapsResult.push(data.market_caps[0]);
      volumesResult.push(data.total_volumes[0]);
      tempTime = data.prices[0][0];
      continue;
    }

    if (data.prices.length - 1 === i) {
      pricesResult.push(data.prices[i]);
      marketcapsResult.push(data.market_caps[i]);
      volumesResult.push(data.total_volumes[i]);
      break;
    }

    if (data.prices[i][0] >= tempTime + timeInterval) {
      pricesResult.push(data.prices[i]);
      marketcapsResult.push(data.market_caps[i]);
      volumesResult.push(data.total_volumes[i]);
      tempTime = data.prices[i][0];
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
