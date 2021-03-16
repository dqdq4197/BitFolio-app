import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarketDetailState {
  datum: {
    x: number,
    y: number,
  }
}

const initialState: MarketDetailState = {
  datum: {
    x:0,
    y:0
  }
}

export const marketDetailSlice = createSlice({
  name: 'marketDetail',
  initialState,
  reducers: {
    setDatum: (state, action: PayloadAction<{x: number, y:number}>) => {
      state.datum = action.payload
    },
  }
})

export const { 
  setDatum,
} = marketDetailSlice.actions;
export default marketDetailSlice.reducer;