import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseTypes } from 'base-types';
import { v4 as uuidv4 } from 'uuid';

export interface CoinType {
  id: string,
  name: string,
  amount: number,
  image: string,
  currency: string,
  symbol: string,
  currentPrice: number,
  totalPercentage: number,
  profitAndLoss: number,
  share: number,
  quantity: number,
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
// 가격 -> 보유자산 -> 당일 손익 -> 지난 손익 -> 포트폴리오 점유율
// each current price -> holdings(price * 갯수), 갯수 -> 24h percentage -> pl -> share
const defaultPortfolio: PortfolioType = {
  id: 'Default-main-portfolio',
  name: 'Main Portfolio123',
  currency: 'usd',
  coins: [{
    id: 'bitcoin',
    name: 'Bitcoin',
    amount: 35000000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    currency: 'krw',
    symbol: 'BTC',
    currentPrice: 3414000,
    totalPercentage: 82,
    profitAndLoss: 28003.23, // currentPrice - amount 
    share: 80.00,
    quantity: 2,
  }, {
    id: 'tether-sfdskj-erkjn',
    name: 'Tether',
    amount: 10000,
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707',
    currency: 'krw',
    symbol: 'USDT',
    currentPrice: 124500,
    totalPercentage: -10,
    profitAndLoss: -12314.13,
    share: 20.00,
    quantity: 2,
  }]
}

const initialState: InitialState = {
  portfolios: [
    defaultPortfolio, {
      ...defaultPortfolio,
      id: 'asd',
      name: 'asdas'
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
    }
  }
})

export const { 
  createPortfolio
} = portfolioSlice.actions;
export default portfolioSlice.reducer;