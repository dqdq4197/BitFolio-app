import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  createMigrate,
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import reducers from './reducers'
import migrations from './persistMigrations'

const rootReducer = combineReducers({ ...reducers })
type ReducersState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<ReducersState> = {
  key: 'root',
  storage: AsyncStorage,
  version: 3,
  migrate: createMigrate(migrations as any, { debug: true }),
  whitelist: [
    'baseSettingReducer',
    'portfolioReducer',
    'transactionReducer',
    'newsReducer',
  ],
  blacklist: ['globalStateReducer'], // persist에 저장하지 않을 reducer들
  stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
const persistor = persistStore(store)

export { store, persistor }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
