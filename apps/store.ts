import { Action, configureStore, Store, ThunkAction } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { createWrapper } from 'next-redux-wrapper'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
})

const makeStore = () => store
export const wrapper = createWrapper<Store>(makeStore)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type Thunk = ThunkAction<void, RootState, null, Action<string>>
