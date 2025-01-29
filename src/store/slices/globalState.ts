import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { MainTabParamList } from '/types/navigation'

interface GlobalStateProps {
  activeTabName: keyof MainTabParamList
}

const initialState: GlobalStateProps = {
  activeTabName: 'Home',
}

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    changeActiveTabIndex: (
      state,
      action: PayloadAction<Pick<GlobalStateProps, 'activeTabName'>>
    ) => {
      const { activeTabName } = action.payload

      state.activeTabName = activeTabName
    },
  },
})

export const { changeActiveTabIndex } = globalStateSlice.actions
export default globalStateSlice.reducer
