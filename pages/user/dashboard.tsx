import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/EmpDashboard.module.css'

const UserDashboard = ({connectionState, connectWallet}: any) => {

  return (
    <div className={styles.empdashboard}>
      {/* <Link href="/samplerequest">
        <button>User Dashboard</button>
      </Link>
      <Link href="/samplerequest">
        <button>SAMPLE REQUEST</button>
      </Link> */}
      <p>Note : Application 101 is in progess</p>

      <Link href="/applicationreq">
        <button>Balance</button>
      </Link>
      <Link href="/applicationreq">
        <button>Past Donations</button>
      </Link>
      <Link href="/application">
        <button>Donar Form</button>
      </Link>
      <Link href="/application">
        <button>Request for blood</button>
      </Link>
      <Link href="/application">
        <button>Swap Blood Token</button>
      </Link>
    </div>
  );
};

export default UserDashboard;


// approver --> user_id --> app_id
// verifier --> contract
// collector --> app_id --> collect
// screener --> app_id --> approve / reject