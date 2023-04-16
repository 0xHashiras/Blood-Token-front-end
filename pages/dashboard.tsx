import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/EmpDashboard.module.css'

const Dashboard = ({connectionState, connectWallet}: any) => {
    useEffect(() => {
        console.log("wallet", connectionState)
    }, [])

  return (
    <div className={styles.empdashboard}>
      {/* <a href="/login/emp/uh">
        <button>UPDATE HEALTH</button>
      </a> */}
      {/* <Link href="/login/emp/ub">
        <button>UPDATE BLOOD STOCK</button>
      </Link> */}
      <Link href="/user/dashboard">
        <button>User Dashboard</button>
      </Link>
      <Link href="/samplerequest">
        <button>SAMPLE REQUEST</button>
      </Link>
      <Link href="/applicationreq">
        <button>APPLICATION REQUEST</button>
      </Link>
    </div>
  );
};

export default Dashboard;
