import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import filters from './features/products/filters'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  filters: filters,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
