import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/EmployeeRegister.module.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/apps/store";
import { sendNotification } from "./components/pushProtocol";

const pinataApiKey = "b0a5b3a93b037b8a327e";
const pinataSecretApiKey =
  "732a7772f1b8866c6f467cf653e153e8fc098eb6841b52147f99b83e6430aae9";
const PREFIX_IPFS = "https://ipfs.io/ipfs/";
const IPFS_URL = "https://gateway.pinata.cloud/ipfs/"; // 'https://ipfs.io/ipfs/';

type FormData = {
    name: string,
    dob: string,
    phone: string,
    bloodType: string,
    gender: string,
    qn_1: boolean,
    qn_2: boolean,
    qn_3: boolean
    
}

const Application = () => {
  // const { connectWallet } = useConnection();
  const [form, setForm] = useState<FormData>({name: '', dob: '', phone: '', bloodType: '', qn_1: false, qn_2: false, gender: '', qn_3: false});
  const router = useRouter()
    const { bloodContract, address, user_id } = useSelector((state: RootState) => state.authReducer)


  const submitEmployeeRegister =async (e: any) => {
    e.preventDefault();
    console.log("Form Data is: ", form)
    console.log("user Id", user_id,address)
    console.log("bloodContract---------",bloodContract)
    console.log("before call")
    // let contractCall = await bloodContract.methods.applyforBloodDonation(user_id, "IPFS image").send({from: address});
    let contractCall = await bloodContract.methods.name();
    
    console.log("App Form Call:", contractCall)
    sendNotification(address, 'Donor Form', 'Application Submitted...!')
  }

  useEffect(() => {
    if(!bloodContract) {
      router.push('/');
      return
    }
  }, [address])

  const submitPdf = async () => {
    console.log("user Id", user_id,address)
    console.log("bloodContract--",bloodContract)
    let contractCall = await bloodContract.methods.applyforBloodDonation(user_id, "IPFS image").send({from: address});
    console.log("App Form Call:", contractCall)
    // const input: any = document.getElementById('empRegister');
    // html2canvas(input)
    //   .then(async (canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, 'JPEG', 0, 0, 220, 220);
    //     // pdf.output('dataurlnewwindow');
    //     pdf.save("download.pdf");
     

    //   try {
    //     // const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //     // const { data }: any = await axios.post(url, imgData, {
    //     //   maxContentLength: 999999,
    //     //   headers: {
    //     //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGRjYmUwNS00YTk1LTQ2NGQtOTM5Yi1lYTYyNTA3YmY2MGMiLCJlbWFpbCI6InN1cml5YS5zQGd1YXJkaWFubGluay5pbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiMGE1YjNhOTNiMDM3YjhhMzI3ZSIsInNjb3BlZEtleVNlY3JldCI6IjczMmE3NzcyZjFiODg2NmM2ZjQ2N2NmNjUzZTE1M2U4ZmMwOThlYjY4NDFiNTIxNDdmOTliODNlNjQzMGFhZTkiLCJpYXQiOjE2ODE1NzkxMzV9.muoZCNqrxrTG5bfI0LO9BULyvymzIWLDMgLXDBeBrwM',
    //     //     "Content-Type": `multipart/form-data`,
    //     //     pinata_api_key: pinataApiKey,
    //     //     pinata_secret_api_key: pinataSecretApiKey,
    //     //   },
    //     // });
    //     // console.log("DATA Hash: ", data);

    //     // contract Call applyforBloodDonation
        
    //   } catch (error) {
    //     console.log("error", error)
    //   }
    // });
}


  return (
    <>
    <div id="empRegister" className={styles.empRegister}>
      <h2>Donar Form</h2>
      <form className={styles.empregForm} onSubmit={submitEmployeeRegister}>
        <h3 style={{marginTop: '13px'}}>TEMPORARY DEFERRAL, IN THE PAST 12 MONTHS HAVE YOU</h3>
        <div>
        <label htmlFor="qn_1">
        Received Tranfusion of Blood or its products?
        </label>
        <input
          name="qn_1"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_1: !(form.qn_1)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Had exposure to tattoos, acupunture or body piercing?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        ndergone any major surgery or met with any major accident?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_3: !(form.qn_3)});
          }}
        />
        </div>
        <h3>IN THE PAST 6 MONTHS HAVE YOU EVER</h3>
        <div>
        <label htmlFor="qn_2">
        Suffered from Typhoid /Cholera / Acute infection of kidney or Bladder?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Had delivery / had pregnancy / any abortion / or been breast feeding?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Had any major surgery or met with any minor accident?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <h3>PERMANENT DEFERRAL</h3>
        <div>
        <label htmlFor="qn_2">
        Uncontrolled blood pressure or stroke?
        Chronic liver disease or endocrine disorders?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Chronic liver disease or endocrine disorders?
        Major surgeries for kidney, heart, liver or brain?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Major surgeries for kidney, heart, liver or brain?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
      </form>
    </div>
    <div className={styles.btnGroup}>
    {/* <button type="button" onClick={submitPdf}>submitPdf</button> */}
    <button type="submit" onClick={submitEmployeeRegister}>Submit Form</button>
    </div>
    </>
  );
};

export default Application;
