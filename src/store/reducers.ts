import baseSettingReducer from './slices/base-setting'
import portfolioReducer from './slices/portfolio'
import transactionReducer from './slices/transaction'
import globalStateReducer from './slices/global-state'
import newsReducer from './slices/news'

export interface ApplicationState {
  baseSetting: ReturnType<typeof baseSettingReducer>
  portfolio: ReturnType<typeof portfolioReducer>
  transaction: ReturnType<typeof transactionReducer>
  globalState: ReturnType<typeof globalStateReducer>
  news: ReturnType<typeof newsReducer>
}

const reducers = {
  baseSettingReducer,
  portfolioReducer,
  transactionReducer,
  globalStateReducer,
  newsReducer,
}

export default reducers
