import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CoinType {
  id: string,
  amount: number,
  currency: string
}

interface PortfolioType {
  name: string,
  coins: CoinType[]
}

interface PortfoliosState {
  portfolio: PortfolioType
}

interface InitialState {
  portfolios: PortfoliosState[]
}

const defaultPortfolio: PortfolioType = {
  name: 'Main Portfolio',
  coins: [{
    id: 'bitcoin',
    amount: 35000000,
    currency: 'krw',
  }, {
    id: 'tether',
    amount: 10000,
    currency: 'krw',
  }]
}

const initialState: InitialState = {
  portfolios: [{
    portfolio: defaultPortfolio
  }]
}

export const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    createPortfolio: (state, action: PayloadAction<string>) => {
      state.portfolios = [...state.portfolios, ]
    }
  }
})

export const { 
} = portfolioSlice.actions;
export default portfolioSlice.reducer;