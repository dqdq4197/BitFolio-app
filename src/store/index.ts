import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
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
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers from './reducers';
import migrations from './persistMigrations';

const rootReducer = combineReducers({ ...reducers });
type ReducersState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<ReducersState> = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(migrations as any, { debug: false }),
  whitelist: [
    'baseSettingReducer',
    'portfolioReducer',
    'transactionReducer',
    'newsReducer',
  ],
  blacklist: ['globalStateReducer'], // persist에 저장하지 않을 reducer들
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
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
