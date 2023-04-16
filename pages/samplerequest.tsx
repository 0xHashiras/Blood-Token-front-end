import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/HandleRequest.module.css'

type RequestData = {
    req_id: number,
    blood_group: string,
    unit: number
}

const SampleRequest = ({connectionState, connectWallet}: any) => {
    const [RequestTable, setRequestTable] = useState<RequestData[]>([]);

    useEffect(() => {
        setRequestTable([{
            req_id: 1,
            blood_group: 'O+ve',
            unit: 1
        },
        {
            req_id: 2,
            blood_group: 'B+ve',
            unit: 1
        }
    ])
    }, [])

  return (
    <div className={styles.handleRequest}>
      <h1>REQUEST TABLE</h1>
      <table className={styles.reqTable}>
        <thead>
          <th>REQ-ID</th>
          <th>BLOOD GROUP</th>
          <th>UNIT</th>
        </thead>
        <tbody>
          {RequestTable.map((request: any, i) => {
            return (
              <tr key={i}>
                <td>{request.req_id}</td>
                <td>{request.blood_group}</td>
                <td>{request.unit}</td>
                <button>
                  ACCEPT   
                </button>
                <button>
                  REJECT
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SampleRequest;
