
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type AuthSliceType = {
  web3: any,
  chainId?: number,
  address?: string
  bloodContract: any,
  error?: string
  user_id?: number
}

const initialState: AuthSliceType = {
    web3: null,
    chainId: 5,
    address: '',
    bloodContract: '',
    error: '',
    user_id: 1
}

export const authSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    updateWeb3: (state, action: PayloadAction<any>) => {
      state.web3 = action.payload
    },
    updateAddress: (state, action: PayloadAction<any>) => {
      state.address = action.payload
    },
    updateContract: (state, action: PayloadAction<any>) => {
      console.log("something")
      state.bloodContract = action.payload
    },
    updateUserId: (state, action: PayloadAction<any>) => {
      state.user_id = action.payload
    },
    updateDisconnect: (state) => {
      state.bloodContract = '';
      state.address = '';
      state.web3 = null;
      state.chainId = 1;
    },
  },
})

export const authReducer = authSlice.reducer

export const { updateWeb3, updateAddress, updateContract, updateDisconnect, updateUserId } = authSlice.actions
