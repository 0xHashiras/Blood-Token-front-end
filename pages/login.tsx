import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/EmployeeLogin.module.css'

const Login = () => {
  // const { connectWallet } = useConnection();
  const [empUserName, setempUsername] = useState("");
  const [empPassword, setempPassword] = useState("");

  const empLoginCheck = () => {}

  return (
    <div className={styles.empLogin}>
      <h2>EMPLOYEE LOGIN</h2>
      <form>
        <input
          name="username"
          type="text "
          placeholder="username"
          onChange={(e) => {
            setempUsername(e.target.value);
          }}
        />
        <input
          name="password"
          type="text "
          placeholder="password"
          onChange={(e) => {
            setempPassword(e.target.value);
          }}
        />
        <button onClick={empLoginCheck}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Login;
