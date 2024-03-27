import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { authentificationSlice } from './reducers/AuthReducer';
import { configureStore } from '@reduxjs/toolkit';
import { profileSlice } from './reducers/ProfileReducer';
import { connectorsSlice } from './reducers/ConnectorsReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authentificationSlice.reducer);

export const store = configureStore({
    reducer: {
      auth: persistedAuthReducer,
      profile: profileSlice.reducer,
      connectors : connectorsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
      if (process.env.NODE_ENV === 'development') {
        return getDefaultMiddleware({
          serializableCheck: false, 
        });
      }
      return getDefaultMiddleware();
    },
  });
  
  // eslint-disable-next-line react-refresh/only-export-components
  export const persistor = persistStore(store);
  export type AppDispatch = typeof store.dispatch
  export type RootState = ReturnType<typeof store.getState>
  export default store;