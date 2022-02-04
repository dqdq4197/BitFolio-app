import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import baseSettingReducer from './baseSetting';
import portfolioReducer from './portfolio';
import transactionReducer from './transaction';
import globalStateReducer from './globalState';
import newsReducer from './news';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'baseSettingReducer',
    'portfolioReducer',
    'transactionReducer',
    'newsReducer',
  ],
  blacklist: ['globalStateReducer'], // persist에 저장하지 않을 reducer들
  debugger: true,
};

const rootReducer = combineReducers({
  baseSettingReducer,
  portfolioReducer,
  transactionReducer,
  globalStateReducer,
  newsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
