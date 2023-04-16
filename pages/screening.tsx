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

const ScreeningVerify = () => {
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


  const confirmVerification = async (type: 'true' | 'false') => {
    let contractCall = await bloodContract.methods.validateScreeningTest(form.app_id, type).send({from: address});
    console.log("call:", contractCall)
    sendNotification(address, 'Screening Blood', 'Blood Screening Completed...!')
  }


  return (
    <div className={styles.empRegister}>
      <h2>Screening Data Verification</h2>
      <form className={styles.empregForm}>
        <input
        name="app_id"
        type='number'
        placeholder="App ID"
        onChange={(e) => {
            setForm({...form, app_id: e.target.value});
          }}
        />
      </form>

      <label style={{marginTop: '20px'}}>Screening Check Done</label>
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

export default ScreeningVerify;
