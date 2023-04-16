import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/EmployeeRegister.module.css'
import { useRouter } from "next/router";
import { NotificationItem, chainNameType } from "@pushprotocol/uiweb";
import * as PushAPI from "@pushprotocol/restapi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/apps/store";
import { updateUserId } from "@/apps/authSlice";
import { sendNotification } from "./components/pushProtocol";

type FormData = {
    units: string,
    dob: string,
    app_id: string
}

const BloodCollection = () => {
  // const { connectWallet } = useConnection();
//   const { account, library, chainId } = useWeb3React();
const dispatch = useDispatch();
const router = useRouter();
const { bloodContract, address, web3 } = useSelector((state: RootState) => state.authReducer)
    useEffect(() => {
        console.log("address:", !address, address)
        if(!bloodContract) {
            router.push('/')
            return
        }
        // init()
    }, [])
  const [form, setForm] = useState<FormData>({app_id: '', units: '', dob: ''});
  const [showNext, setShowNext] = useState(false);
  const [result, setResult] = useState('')

  const submitEmployeeRegister = async (e: any) => {
    e.preventDefault();
    let contractCall = await bloodContract.methods.collectBloodSample(form.app_id, form.units, form.dob).send({from: address});
    console.log("Collect Call:", contractCall)
    console.log("Form Data is: ", form);
    sendNotification(address, 'Blood Collection', 'Blood Collected...')
    setResult(contractCall ? 'success': 'failed')
    if(contractCall) {
      console.log("Data Verified successfully")
    }
    // router.push('/user/dashboard')
    // const signer = library.getSigner(account);
    // console.log("Account: ", account, library, chainId)
    // router.push('/user/dashboard');
    try {
        // const apiResponse = await PushAPI.payloads.sendNotification({
        //     signer: _signer,
        //     type: 1, // broadcast
        //     identityType: 2, // direct payload
        //     notification: {
        //       title: `[SDK-TEST] notification TITLE:`,
        //       body: `[sdk-test] notification BODY`
        //     },
        //     payload: {
        //       title: `[sdk-test] payload title`,
        //       body: `sample msg body`,
        //       cta: '',
        //       img: ''
        //     },
        //     channel: 'eip155:5:0x8da6700A5bF8d0854409F1ff646321D8DD81c781',
        //     env: "staging"
        //   });
    } catch (error) {
        
    }
  }


  return (
    <div className={styles.empRegister}>
      <h2>Blood Collection Data</h2>
      <form className={styles.empregForm} onSubmit={submitEmployeeRegister}>
        <input
        name="app_id"
        type='number'
        placeholder="App ID"
        onChange={(e) => {
            setForm({...form, app_id: e.target.value});
          }}
        />
        <input
          name="name"
          type="text"
          placeholder="Units"
          onChange={(e) => {
            setForm({...form, units: e.target.value});
          }}
          required
        />
        <input
          name="dob"
          type="date"
          placeholder="DOB"
          onChange={(e) => {
            setForm({...form, dob: e.target.value});
          }}
          required
        />
        <button type="submit">Collected</button>
      </form>
    </div>
  );
};

export default BloodCollection;
