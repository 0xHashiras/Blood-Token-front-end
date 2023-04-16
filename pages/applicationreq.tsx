import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/HandleRequest.module.css'
import { useSelector } from "react-redux";
import { RootState } from "@/apps/store";
import { useRouter } from "next/router";
import { sendNotification } from "./components/pushProtocol";

type RequestData = {
    form_id: number,
    blood_group: string,
    unit: number
}

const ApplicationRequest = ({connectionState, connectWallet}: any) => {
  const router = useRouter();
  const { bloodContract, address, user_id } = useSelector((state: RootState) => state.authReducer)
    const [RequestTable, setRequestTable] = useState<RequestData[]>([]);

    useEffect(() => {
      if(!bloodContract) {
        router.push('/');
        return
      }
      init()
    //     setRequestTable([{
    //         form_id: 100,
    //         blood_group: 'O+ve',
    //         unit: 1
    //     },
    //     {
    //         form_id: 101,
    //         blood_group: 'B+ve',
    //         unit: 1
    //     }
    // ])
    }, [])

    const init = async () => {
      console.log(bloodContract.method)
      let totalApp = await bloodContract.methods.appIdCounter().call();
      let data = await bloodContract.methods.appId2Data(2).call();
      console.log("Total App: ",totalApp);
      console.log("Data:", data)
      let temp: any = []
      for (let i = 1; i < totalApp ; i++) {
        console.log("IIII", i)
        let check = await bloodContract.methods.appId2Data(i).call();
        if(check._status == 0 && check._donorId != 0){
          check['id'] = i;
          temp.push({id: i, blood_group: check._bloodGroup, donar_id: check._donorId, url: check._formURL});
        }
      }
      console.log("Temp: ", temp);
      setRequestTable(temp)
    }

    const acceptOrReject = async (app_id: string ,status: 'true'| 'false') => {
      console.log(app_id, status)
      let result = await bloodContract.methods.validateApplication(app_id, status).send({from: address})
      console.log("result:", result)
      sendNotification(address, 'Application', 'Application updated...!')
      init();
    }

  return (
    <div className={styles.handleRequest}>
      <h2 style={{color: 'red'}}>APPLICATION REQUEST TABLE</h2>
      <table className={styles.reqTable}>
        <thead>
          <th>ID</th>
          <th>APP ID</th>
          <th>VIEW FORM</th>
          <th>BLOOD GROUP</th>
        </thead>
        <tbody>
          {RequestTable.length > 0 ?RequestTable.map((request: any, i) => {
            return (
              <tr key={i}>
                <td>{i+1}</td>
                {/* <td>{request.blood_group}</td> */}
                <td>{request.id}</td>
                <Link target={"_blank"} href={request.url ? request.url : undefined}><td>{request.url}</td></Link>
                <td>{request.blood_group}</td>
                <button onClick={() => acceptOrReject( request.id ,'true')}>
                  ACCEPT   
                </button>
                <button onClick={() => acceptOrReject( request.id ,'true')}>
                  REJECT
                </button>
              </tr>
            );
          }) : 
         <tr >
          <td style={{border: "none"}}>
          </td>
          <td style={{border: "none"}}> No Data</td>
          <td style={{border: "none"}}></td>
         </tr>
          }
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationRequest;


// appIdtoData --> status 0
// staus --> 2
// reject --> 3
