import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BaseSettingState {
  currency: 'usd' | 'krw' | 'eur'
}

const initialState: BaseSettingState = {
  currency: 'krw',

}

export const baseSettingSlice = createSlice({
  name: 'baseSetting',
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<'usd' | 'krw' | 'eur'>) => {
      state.currency = action.payload
    }
  }
})

export const { changeCurrency } = baseSettingSlice.actions;
export default baseSettingSlice.reducer;