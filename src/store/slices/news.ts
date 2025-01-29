import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const ALL_NEWS_FEEDS = 'ALL_NEWS_FEEDS'
export const ALL_NEWS_CATEGORIES = 'ALL_NEWS_CATEGORIES'

export type SortOrderType = 'latest' | 'popular'
export type FeedsType = typeof ALL_NEWS_FEEDS | string[]
export type CategoriesType = typeof ALL_NEWS_CATEGORIES | string[]

export interface NewsStateType {
  feeds: FeedsType
  categories: CategoriesType
  sortOrder: SortOrderType
  lTs: number
}

const initialState: NewsStateType = {
  feeds: ALL_NEWS_FEEDS,
  categories: ALL_NEWS_CATEGORIES,
  sortOrder: 'latest',
  lTs: 0,
}

export const newsSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    changeCategories: (state, action: PayloadAction<CategoriesType>) => {
      state.categories = action.payload
    },
    changeFeeds: (state, action: PayloadAction<FeedsType>) => {
      state.feeds = action.payload
    },
    changeSortOrder: (state, action: PayloadAction<SortOrderType>) => {
      state.sortOrder = action.payload
    },
    resetFilters: state => {
      state.feeds = ALL_NEWS_FEEDS
      state.categories = ALL_NEWS_CATEGORIES
    },
  },
})

export const { changeCategories, changeFeeds, changeSortOrder, resetFilters } =
  newsSlice.actions
export default newsSlice.reducer
