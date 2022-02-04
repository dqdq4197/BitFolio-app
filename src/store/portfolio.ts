import 'react-native-get-random-values';
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
  | 'allocation_asc';

export interface CoinType {
  id: string;
  state: 'watching' | 'trading';
  symbol: string;
  image: string;
  name: string;
}

export type ModeType = 'public' | 'private';
export type ShowValueModeType = 'short' | 'full';
export type ActiveTabType = 'allocation' | 'statistics';

interface ChangeCoinStateAction extends Pick<CoinType, 'state'> {
  portfolioId: string;
  coinId: string;
}

type AddWatchingCoinProps = {
  portfolioId: string;
  coin: {
    id: string;
    image: string;
    name: string;
    symbol: string;
  };
};

type UnwatchingCoinProps = {
  portfolioId: string;
  coinId: string;
};

export type PortfolioType = {
  id: string;
  coins: CoinType[] | [];
  assetSortType: SortType;
  mode: ModeType;
  showValueMode: ShowValueModeType;
  analysisActiveTab: ActiveTabType;
  isHideAnalysisSheet: boolean;
};

export type InitialState = {
  portfolios: PortfolioType[];
  activeIndex: number;
};

const initialState: InitialState = {
  portfolios: [
    {
      id: uuidv4(),
      coins: [],
      assetSortType: 'default',
      mode: 'public',
      showValueMode: 'short',
      analysisActiveTab: 'allocation',
      isHideAnalysisSheet: false,
    },
  ],
  activeIndex: 0,
};

export const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {
    addWatchingCoin: (state, action: PayloadAction<AddWatchingCoinProps>) => {
      const { coin } = action.payload;
      const defaultPortfolio = state.portfolios[0];

      const isAlreadyInclude =
        defaultPortfolio.coins.findIndex(
          portfolioCoin => portfolioCoin.id === coin.id
        ) !== -1;

      if (isAlreadyInclude) return;

      defaultPortfolio.coins = [
        ...defaultPortfolio.coins,
        {
          ...coin,
          state: 'watching',
        },
      ];
    },
    unWatchingCoin: (state, action: PayloadAction<UnwatchingCoinProps>) => {
      const { portfolioId, coinId } = action.payload;
      const { portfolios } = state;

      const targetPortfolioIndex = portfolios.findIndex(
        portfolio => portfolio.id === portfolioId
      );
      const targetPortfolio = portfolios[targetPortfolioIndex];
      const coins = targetPortfolio.coins.filter(coin => coin.id !== coinId);

      targetPortfolio.coins = coins;
    },
    changeCoinState: (state, action: PayloadAction<ChangeCoinStateAction>) => {
      const { coinId, state: coinState } = action.payload;
      const defaultPortfolio = state.portfolios[0];
      const coinIdx = defaultPortfolio.coins.findIndex(
        coin => coin.id === coinId
      );

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
      defaultPortfolio.analysisActiveTab = action.payload;
    },
    onHideAnalysisSheet: (state, action: PayloadAction<boolean>) => {
      const defaultPortfolio = state.portfolios[0];
      defaultPortfolio.isHideAnalysisSheet = action.payload;
    },
  },
});

export const {
  addWatchingCoin,
  unWatchingCoin,
  changeCoinState,
  changeSortType,
  changeMode,
  changeShowValueMode,
  changeAnalysisActiveTab,
  onHideAnalysisSheet,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
