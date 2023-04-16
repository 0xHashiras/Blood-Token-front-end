import { combineReducers } from 'redux'
import { authReducer } from './authSlice'

const rootReducer = combineReducers({
  authReducer,
})

export default rootReducer
