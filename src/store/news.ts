import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsStateType {
  categories: string[]
  excludeCategories: string[]
  sortOrder: 'latest' | 'popular'
  lTs: number
}

const initialState: NewsStateType = {
  categories: [],
  excludeCategories: [],
  sortOrder: 'latest',
  lTs: 0
}

export const newsSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    changeCategories: (state, action: PayloadAction<string[]>) => {
      
    },
    changeSortOrder: (state, action: PayloadAction<Pick<NewsStateType, 'sortOrder'>> ) => {

    }
  }
})

export const { 
  changeCategories,
  changeSortOrder
} = newsSlice.actions;
export default newsSlice.reducer;