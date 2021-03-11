import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BaseSettingState {
  currency: 'usd' | 'krw' | 'eur',
  detailOption: 'prices' | 'total_volumes' | 'market_caps' | 'ohlc'
}

const initialState: BaseSettingState = {
  currency: 'krw',
  detailOption: 'prices'
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
    }
  }
})

export const { 
  changeCurrency,
  changeDetailOption
} = baseSettingSlice.actions;
export default baseSettingSlice.reducer;