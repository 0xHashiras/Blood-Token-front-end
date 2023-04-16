import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from './components/navbar'
import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from "web3";
import { useRouter } from 'next/router';
import Blood from "../lib/contracts/BloodD.json";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@/apps/store';
import { updateAddress, updateContract, updateWeb3 } from '@/apps/authSlice';
// import dao from "../contracts/Dao.json"
const defaultChainId = 1337;

const ConnectionContext: any = createContext(null);

export function useConnection() {
    return useContext(ConnectionContext);
}

export const supportedNetworks = {
  1337: {
      name: 'Ganache Local',
      tokenSymbol: 'ETH',
      rpcURL: 'http://localhost:8545',
      bloodContract: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
      // daoContract: dao.networks[1337] ? dao.networks[1337].address : ''
  },
  5: {
      name: 'Mumbai Polygon Testnet',
      tokenSymbol: 'MATIC',
      rpcURL: 'https://rpc-mumbai.maticvigil.com/',
      // crowdFundingContract: crowdFunding.networks[80001] ? crowdFunding.networks[80001].address : '',
      // daoContract: dao.networks[80001] ? dao.networks[80001].address : ''
  }
}

export default function App({ Component, pageProps }: AppProps) {
  

  return <Provider store={store}>
  <Navbar />
    <Component {...pageProps} owner="owner..." />
  </Provider>
  

}