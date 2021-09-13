import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAB_ROUTE_NAME } from '/lib/constant';

interface GlobalStateProps {
  activeTabName: keyof typeof TAB_ROUTE_NAME
}

const initialState: GlobalStateProps = {
  activeTabName: 'home'
}

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    changeActiveTabIndex: (state, action: PayloadAction<Pick<GlobalStateProps, 'activeTabName'>>) => {
      const { activeTabName } = action.payload;

      state.activeTabName = activeTabName;
    },
  }
})

export const { 
  changeActiveTabIndex
} = globalStateSlice.actions;
export default globalStateSlice.reducer;