import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {appointmentReducer} from "./appointment/appointment.slice";
import { authReducer } from './auth/auth.slice';

const persistConfig = {
  key: 'appointment',
  storage,
}

const authPersistConfig = {
  key: 'auth',
  storage
}

const rootReducer = combineReducers({
  appointment: persistReducer(persistConfig, appointmentReducer),
  auth: persistReducer(authPersistConfig, authReducer)
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
