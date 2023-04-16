import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Loginas.module.css'
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/apps/store";
import html2canvas from "html2canvas";
// import { useConnection } from "./_app";

const LoginAs = ({connectionState, connectWallet}: any) => {
    // const {connectionState}: any = useConnection()
    const router = useRouter()
    const { bloodContract, address } = useSelector((state: RootState) => state.authReducer)
    useEffect(() => {
        console.log("address:", !address, address)
        // console.log("address--------",address)
        // console.log("bloodContract--------",bloodContract)

        if(!bloodContract) {
            router.push('/')
            return
        }
        // init()
    }, [])

    const init = async () => {
        console.log(await bloodContract.methods.COLLECTOR_ROLE().call())
    }

    const handleLogin = async (type: 'user'| 'application_approver' | 'physical_verifier' | 'collector' | 'screener') => {
        console.log("address", address)
        let val = '';
        switch (type) {
            case 'user':
                val = '';
                break;
            case 'physical_verifier':
                val = await bloodContract.methods.PHYSICAL_VERIFIER_ROLE().call();
                break;
            case 'application_approver':
                val = await bloodContract.methods.APPROVER_ROLE().call();
                break;
            case 'collector':
                val = await bloodContract.methods.COLLECTOR_ROLE().call();
                break;
            case 'screener':
                val = await bloodContract.methods.SCREENER_ROLE().call();
                break;
            default:
                val = '';
                break;
        }
        if(type !== 'user') {
            let isValid = await bloodContract.methods.hasRole(val, address).call();
            console.log("isValid", isValid)
            if(isValid) {
               type === 'application_approver' ? router.push('/applicationreq') : type === 'collector' ? router.push('/bloodcollection') : type === 'physical_verifier' ? router.push('physicaldataverify') : type === 'screener' ? router.push('screening') : '';
               return
            } else {
                alert(`Access Deined. Please choose correct type...!`);
                return
            }
        }
        // if()
        router.push('/user/dashboard')
        
    }

  return (
    <div className={styles.empdashboard}>
      {/* <a href="/login/emp/uh">
        <button>UPDATE HEALTH</button>
      </a> */}
      <h1> LOGIN AS</h1>
      {/* <Link href="/user/dashboard"> */}
        <button onClick={() => handleLogin('user')}>Donar</button>
      {/* </Link> */}
      {/* <Link href="/user/dashboard"> */}
        <button onClick={() => handleLogin('application_approver')}>Application Approver</button>
      {/* </Link> */}
      {/* <Link href="/samplerequest"> */}
        <button onClick={() => handleLogin('physical_verifier')}>Physical Approver</button>
      {/* </Link> */}
      {/* <Link href="/applicationreq"> */}
        <button onClick={() => handleLogin('collector')}>Collector</button>
      {/* </Link> */}
      {/* <Link href="/applicationreq"> */}
        <button onClick={() => handleLogin('screener')}>Screener</button>
      {/* </Link> */}
    </div>
  );
};

export default LoginAs;
