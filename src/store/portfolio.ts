import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type SortType = 
| 'default'
| 'name_desc' 
| 'name_asc' 
| 'price_desc'
| 'price_asc'
| 'holding_desc' 
| 'holding_asc' 
| 'buyPrice_desc'
| 'buyPrice_asc'
| 'pl_desc'
| 'pl_asc'
| 'allocation_desc'
| 'allocation_asc'

export interface CoinType {
  id: string
  state: 'tracking' | 'traded'
  symbol: string
  image: string
  name: string
}

export type ModeType = 'public' | 'private'
export type ShowValueModeType = 'short' | 'full'
export type ActiveTabType = 'allocation' | 'statistics'

type ChangeCoinStateAction = {
  portfolioId: string
  coinId: string
}

type AddTrackAction = {
  portfolioId: string
  coin: {
    id: string
    image: string
    name: string
    symbol: string
  }
}

export interface InitialState {
  id: string
  coins: CoinType[]
  assetSortType: SortType
  mode: ModeType
  showValueMode: ShowValueModeType
  analysisActiveTab: ActiveTabType
  isHideAnalysisSheet: boolean
}

const initialState: InitialState = {
  id: 'qwesfzcv-asd', // uuid 적용하기
  coins: [{
    id: 'bitcoin',
    state: 'tracking',
    symbol: 'btc',
    name: "Bitcoin",
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
  }, {
    id: 'tether',
    state: 'tracking',
    symbol: 'usdt',
    name: "Tether",
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707'
  }],
  assetSortType: 'default',
  mode: 'public',
  showValueMode: 'short',
  analysisActiveTab: 'allocation',
  isHideAnalysisSheet: false
}

export const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<AddTrackAction>) => {
      const { coin } = action.payload;

      state.coins = [
        ...state.coins,
        {
          ...coin,
          state: 'tracking'
        }
      ]
    },
    changeCoinState: (state, action: PayloadAction<ChangeCoinStateAction>) => {
      const { coinId } = action.payload;
      const coinIdx = state.coins.findIndex(coin => coin.id === coinId);

      if(state.coins[coinIdx].state === 'tracking')
        state.coins[coinIdx].state = 'traded';
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.assetSortType = action.payload;
    },
    changeMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    changeShowValueMode: (state, action: PayloadAction<ShowValueModeType>) => {
      state.showValueMode = action.payload;
    },
    changeAnalysisActiveTab: (state, action: PayloadAction<ActiveTabType>) => {
      state.analysisActiveTab = action.payload
    },
    onHideAnalysisSheet: (state, action: PayloadAction<boolean>) => {
      state.isHideAnalysisSheet = action.payload
    }
  }
})

export const { 
  addTrack,
  changeCoinState,
  changeSortType,
  changeMode,
  changeShowValueMode,
  changeAnalysisActiveTab,
  onHideAnalysisSheet
} = portfolioSlice.actions;
export default portfolioSlice.reducer;