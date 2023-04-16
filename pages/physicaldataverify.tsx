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
    name: string,
    dob: string,
    nationalId: string,
    bloodType: string,
    address?: string,
    app_id: string
}

const PhysicalDataVerify = () => {
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
  const [form, setForm] = useState<FormData>({app_id: '', name: '', dob: '', nationalId: '', bloodType: '', address: address});
  const [showNext, setShowNext] = useState(false);
  const [result, setResult] = useState('')

  const submitEmployeeRegister = async (e: any) => {
    e.preventDefault();
    let hash = web3.utils.soliditySha3(form.name, form.dob, form.nationalId);
    let contractCall = await bloodContract.methods.validateHashOfUser(form.app_id,  hash).call();
    console.log("Hash:", hash, contractCall)
    console.log("Form Data is: ", form);
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

  const confirmVerification = async (type: 'true' | 'false') => {
    let contractCall = await bloodContract.methods.validatePhysicalUserData(form.app_id, type).send({from: address});
    console.log("call:", contractCall)
    sendNotification(address, 'Data check', 'Physical Data check completed...')
  }


  return (
    <div className={styles.empRegister}>
      <h2>Physical Data Verification</h2>
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
          placeholder="Full Name"
          onChange={(e) => {
            setForm({...form, name: e.target.value});
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
        <input
          name="national_id"
          type="text"
          placeholder="National ID"
          onChange={(e) => {
            setForm({...form, nationalId: e.target.value});
          }}
        />
        <select name="blood_type" onChange={(e) => setForm({...form, bloodType: e.target.value})}>
            <option> --- Select Blood Group --- </option>
            <option value={'op'}>O +ve</option>
            <option value={'on'}>O -ve</option>
            <option value={'bp'}>B +ve</option>
            <option value={'bn'}>B -ve</option>
        </select>
        <button type="submit">Check Data</button>
        <p>Status: {result}</p>
      </form>

      <label style={{marginTop: '20px'}}>Physical Check Done</label>
      <input type={'checkbox'} onChange={() => setShowNext(el => !el)} />
      {showNext && 
      <>
      <div className={styles.btnGroup}>
      <button onClick={() => confirmVerification('true')}>Accept</button>
      <button onClick={() => confirmVerification('false')}>Reject</button>
      </div>
      </>
      }
    </div>
  );
};

export default PhysicalDataVerify;
