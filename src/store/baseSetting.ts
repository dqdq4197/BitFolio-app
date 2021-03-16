import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BaseSettingState {
  currency: 'usd' | 'krw' | 'eur',
  detailOption: 'prices' | 'total_volumes' | 'market_caps' | 'ohlc',
  chartTimeFrame: 1 | 7 | 30 | 365 | 'max',
}

const initialState: BaseSettingState = {
  currency: 'krw',
  detailOption: 'prices',
  chartTimeFrame: 1
}

export const baseSettingSlice = createSlice({
  name: 'baseSetting',
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<'usd' | 'krw' | 'eur'>) => {
      state.currency = action.payload
    },
    changeDetailOption: (state, action: PayloadAction<'prices' | 'total_volumes' | 'market_caps' | 'ohlc'>) => {
      state.detailOption = action.payload
    },
    changeChartTimeFrame: (state, action: PayloadAction<1 | 7 | 30 | 365 | 'max'>) => {
      state.chartTimeFrame = action.payload
    }
  }
})

export const { 
  changeCurrency,
  changeDetailOption,
  changeChartTimeFrame
} = baseSettingSlice.actions;
export default baseSettingSlice.reducer;