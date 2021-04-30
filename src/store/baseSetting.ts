import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BaseSettingState {
  language: 'en' | 'ko',
  currency: 'usd' | 'krw' | 'eur',
  chartOption: 'prices' | 'total_volumes' | 'market_caps' | 'ohlc',
  chartTimeFrame: 1 | 7 | 30 | 365 | 'max',
}

const initialState: BaseSettingState = {
  language: 'ko',
  currency: 'krw',
  chartOption: 'prices',
  chartTimeFrame: 1
}

export const baseSettingSlice = createSlice({
  name: 'baseSetting',
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<'usd' | 'krw' | 'eur'>) => {
      state.currency = action.payload
    },
    changeChartOption: (state, action: PayloadAction<'prices' | 'total_volumes' | 'market_caps' | 'ohlc'>) => {
      state.chartOption = action.payload
    },
    changeChartTimeFrame: (state, action: PayloadAction<1 | 7 | 30 | 365 | 'max'>) => {
      state.chartTimeFrame = action.payload
    }
  }
})

export const { 
  changeCurrency,
  changeChartOption,
  changeChartTimeFrame
} = baseSettingSlice.actions;
export default baseSettingSlice.reducer;