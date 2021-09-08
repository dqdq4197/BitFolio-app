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
  state: 'watching' | 'trading'
  symbol: string
  image: string
  name: string
}

export type ModeType = 'public' | 'private'
export type ShowValueModeType = 'short' | 'full'
export type ActiveTabType = 'allocation' | 'statistics'

interface ChangeCoinStateAction extends Pick<CoinType, 'state'> {
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

export type PortfolioType = {
  id: string
  coins: CoinType[] | []
  assetSortType: SortType
  mode: ModeType
  showValueMode: ShowValueModeType
  analysisActiveTab: ActiveTabType
  isHideAnalysisSheet: boolean
}
export type InitialState = {
  portfolios: PortfolioType[]
  activeIndex: number
};

const initialState: InitialState = {
  portfolios: [{
    id: 'qwesfzcv-asd', // uuid 적용하기
    coins: [],
    // {
    //   id: 'bitcoin',
    //   state: 'watching',
    //   symbol: 'btc',
    //   name: "Bitcoin",
    //   image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
    // }, {
    //   id: 'tether',
    //   state: 'watching',
    //   symbol: 'usdt',
    //   name: "Tether",
    //   image: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707'
    // }
    assetSortType: 'default',
    mode: 'public',
    showValueMode: 'short',
    analysisActiveTab: 'allocation',
    isHideAnalysisSheet: false
  }],
  activeIndex: 0
}

export const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<AddTrackAction>) => {
      const { coin } = action.payload;
      const defaultPortfolio = state.portfolios[0];

      defaultPortfolio.coins = [
        ...defaultPortfolio.coins,
        {
          ...coin,
          state: 'watching'
        }
      ]
    },
    changeCoinState: (state, action: PayloadAction<ChangeCoinStateAction>) => {
      const { coinId, state: coinState } = action.payload;
      const defaultPortfolio = state.portfolios[0];
      const coinIdx = defaultPortfolio.coins.findIndex(coin => coin.id === coinId);

      defaultPortfolio.coins[coinIdx].state = coinState;
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      const defaultPortfolio = state.portfolios[0];
      defaultPortfolio.assetSortType = action.payload;
    },
    changeMode: (state, action: PayloadAction<ModeType>) => {
      const defaultPortfolio = state.portfolios[0];
      defaultPortfolio.mode = action.payload;
    },
    changeShowValueMode: (state, action: PayloadAction<ShowValueModeType>) => {
      const defaultPortfolio = state.portfolios[0];
      defaultPortfolio.showValueMode = action.payload;
    },
    changeAnalysisActiveTab: (state, action: PayloadAction<ActiveTabType>) => {
      const defaultPortfolio = state.portfolios[0];
      defaultPortfolio.analysisActiveTab = action.payload
    },
    onHideAnalysisSheet: (state, action: PayloadAction<boolean>) => {
      const defaultPortfolio = state.portfolios[0];
      defaultPortfolio.isHideAnalysisSheet = action.payload
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