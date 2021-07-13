import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseTypes } from 'base-types';
import { v4 as uuidv4 } from 'uuid';
import { FormData, SubmitNumericData } from '/components/portfolio/transactionModal/FormModal';
import { TransactionType } from './transaction';

export interface CoinType {
  id: string,
  quantity: number | null,
  fee: { [key: string]: number } | null,
  type: 'traking' | 'traded',
}

export interface PortfolioType {
  id: string,
  name: string,
  coins: CoinType[],
  currency: baseTypes.Currency
}

interface InitialState {
  portfolios: PortfolioType[],
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
    quantity: 2,
    fee: null,
    type: 'traking',
  }, {
    id: 'tether',
    quantity: 2,
    fee: null,
    type: 'traking',
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
            quantity: null,
            fee: null,
            type: 'traking'
          }
        ]
      }
    },
    addTransactionToPortfolio: (state, action: PayloadAction<FormData<SubmitNumericData>>) => {
      const { portfolioId, coinId, transferType, type, quantity, pricePerCoin, fee, date } = action.payload;

      const targetPortfolio = state.portfolios.filter(portfolio => portfolio.id === portfolioId)[0];
      let targetCoin = targetPortfolio.coins.filter(coin => coin.id === coinId).slice()[0]; // deep copy
      let updatedFee = fee;

      if(targetCoin.fee !== null) {
        for(let currency in fee) {
          updatedFee = {
            [currency]: targetCoin.fee[currency] + fee[currency]
          }
        }
      }
      // TODO
      // 불변성 체크하기 
      if(type === 'buy' || transferType === 'transfer in') {
        const updatedQuantity = targetCoin.quantity === null ? Number(quantity) : targetCoin.quantity + Number(quantity);

        targetCoin = {
          ...targetCoin,
          quantity: updatedQuantity,
          fee: updatedFee,
          type: 'traded'
        }
      } 
       
      if(type === 'sell' || transferType === 'transfer out') {
        const updatedQuantity = targetCoin.quantity === null ? -Number(quantity) : targetCoin.quantity - Number(quantity);

        targetCoin = {
          ...targetCoin,
          quantity: updatedQuantity,
          fee: updatedFee,
          type: 'traded'
        }
      }
    },
    removeTransactionToPortfolio: (state, action: PayloadAction<TransactionType>) => {
      const { portfolioId, coinId, type, fee, transferType, quantity } = action.payload;
      const targetPortfolio = state.portfolios.filter(portfolio => portfolio.id === portfolioId)[0];
      let targetCoin = targetPortfolio.coins.filter(coin => coin.id === coinId).slice()[0];
      let updatedFee = fee;

      if(targetCoin.fee !== null) {
        for(let currency in fee) {
          updatedFee = {
            [currency]: targetCoin.fee[currency] - fee[currency]
          }
        }
      }

      if(type === 'buy' || transferType === 'transfer in') {
        const updatedQuantity = targetCoin.quantity! - quantity;

        targetCoin = {
          ...targetCoin,
          quantity: updatedQuantity,
          fee: updatedFee,
        }
      } 
       
      if(type === 'sell' || transferType === 'transfer out') {
        const updatedQuantity = -targetCoin.quantity! +quantity;

        targetCoin = {
          ...targetCoin,
          quantity: updatedQuantity,
          fee: updatedFee,
        }
      }

      console.log(state.portfolios);
    }
  }
})

export const { 
  createPortfolio,
  addTrack,
  addTransactionToPortfolio,
  removeTransactionToPortfolio
} = portfolioSlice.actions;
export default portfolioSlice.reducer;