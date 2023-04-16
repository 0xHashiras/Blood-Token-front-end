import React, { useEffect, useState } from "react";
import {BigNumber,ethers} from "ethers";
import styles from '../styles/Home.module.css';



const ApproveBOB  = () => {
    const [approveAmount, setApproveAmount] = useState('1')
    function val (approveAmount:string) {
        if (approveAmount != "") {
          return approveAmount
        }
        else return "0"
      }
    

  return (
    <div className={styles.container}>
        <div>
        <p>BOB Approval </p>
            <br/>
          <div className={styles.card}>
            <label>Enter BOB amount to be approved</label>
            <input
            type= "number"
            id="approveAmount"
            onChange={(e) => setApproveAmount(e.target.value)}
            placeholder="In Wei"
            value={approveAmount}
            />
            <button onClick={()=> approveBOB?.()} >Approve</button>
          </div>
        </div>
    </div>
  );
}



export function bob() {
    const [inputAmount, setInputAmount] = useState('1')
    function val (inputAmount:string) {
        if (inputAmount != "") {
          return inputAmount
        }
        else return "0"
      }
      return (
        <div className={styles.container}>
          <ApproveBOB/>
            <div>
            <p>FREC to USDT </p>
                <br/>
              <div className={styles.card}>
                <label>Enter amount FREC to be swapped</label>
                <input
                type= "number"
                id="inputAmount"
                onChange={(e) => setInputAmount(e.target.value)}
                placeholder="In Wei"
                value={inputAmount}
                />
                <button onClick={()=> sendZKBOB?.()} >Swap</button>
              </div>
            </div>
        </div>
      );
}
export default bob;
