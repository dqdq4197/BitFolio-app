import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseTypes } from 'base-types';
import { v4 as uuidv4 } from 'uuid';

export interface CoinType {
  id: string,
  currency?: string | null,
  amount?: number | null,
  quantity?: number | null,
  memo?: string | null,
  type: 'buy' | 'sell' | 'transfer' | 'incomplete',
}

export interface PortfolioType {
  id: string,
  name: string,
  coins: CoinType[],
  currency: baseTypes.Currency
}

interface InitialState {
  portfolios: PortfolioType[]
}

type CreatePortfolioAction = {
  name: string;
  currency: baseTypes.Currency;
}

type AddTrackAction = {
  portfolioId: string,
  id: string
}
// 가격 -> 보유자산 -> 당일 손익 -> 지난 손익 -> 포트폴리오 점유율
// each current price -> holdings(price * 갯수), 갯수 -> 24h percentage -> pl -> share
const defaultPortfolio: PortfolioType = {
  id: 'Default-main-portfolio',
  name: 'Main Portfolio123',
  currency: 'usd',
  coins: [{
    id: 'bitcoin',
    amount: 35000000,
    currency: 'krw',
    quantity: 2,
    type: 'buy',
  }, {
    id: 'tether',
    amount: 10000,
    currency: 'krw',
    quantity: 2,
    type: 'buy',
  }]
}

const initialState: InitialState = {
  portfolios: [
    defaultPortfolio, {
      ...defaultPortfolio,
      id: 'defaultPortfolio2',
      name: 'defaultPortfolio2'
    }
  ]
}

export const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    createPortfolio: (state, action: PayloadAction<CreatePortfolioAction>) => {
      const { payload: { name, currency } } = action;
      state.portfolios = [
        ...state.portfolios, 
        {
          id: uuidv4(),
          name,
          currency,
          coins: []
        }
      ]
    },
    addTrack: (state, action: PayloadAction<AddTrackAction>) => {
      let { portfolios } = state;
      const { portfolioId, id } = action.payload;
      const portfolioIdx = state.portfolios.findIndex(portfolio => portfolio.id === portfolioId);

      portfolios[portfolioIdx] = {
        ...portfolios[portfolioIdx],
        coins: [
          ...portfolios[portfolioIdx].coins,
          {
            id,
            amount: null,
            currency: null,
            quantity: null,
            memo: null,
            type: 'incomplete'
          }
        ]
      }
    }
  }
})

export const { 
  createPortfolio,
  addTrack
} = portfolioSlice.actions;
export default portfolioSlice.reducer;