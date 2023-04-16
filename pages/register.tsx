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
    address?: string
}

const Register = () => {
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
  const [form, setForm] = useState<FormData>({name: '', dob: '', nationalId: '', bloodType: '', address: address})

  const submitEmployeeRegister = async (e: any) => {
    e.preventDefault();
    let hash = web3.utils.soliditySha3(form.name, form.dob, form.nationalId);
    console.log("hash", hash)
    let contractCall = await bloodContract.methods.enrollDonor(hash, form.bloodType, address).call();
    console.log("Hash:", contractCall)
    console.log("Form Data is: ", form);
    dispatch(updateUserId(contractCall));
    sendNotification(address, 'Register', 'Registration Successfully...!')
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
      <h2>User Register</h2>
      <form className={styles.empregForm} onSubmit={submitEmployeeRegister}>
        <input
          name="name"
          type="text "
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
        <input
          name="wallet address"
          type="text"
          value={form.address}
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, address: e.target.value});
          }}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
