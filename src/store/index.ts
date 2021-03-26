import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import baseSettingReducer from './baseSetting';
import marketDetailReducer from './coinMarketDetail';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [], 
  blacklist: [
    'marketDetail'
  ] // persist에 저장하지 않을 reducer들 
}

const rootReducer = combineReducers({
  baseSettingReducer,
  marketDetailReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});
const persistor = persistStore(store);

export { store, persistor }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch