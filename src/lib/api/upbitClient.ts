import axios from 'axios';

import { UPBIT_PATH_PREFIX } from '/lib/constants/upbit';
import { UpBitClientType } from '/types/upbit';

export const http = axios.create({
  baseURL: UPBIT_PATH_PREFIX,
});

export const upbitClient: UpBitClientType = {
  candles: (periodicity, params, unit) => {
    return {
      url: `/candles/${periodicity}${unit ? `/${unit}` : ''}`,
      params,
    };
  },
};
