import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Dashboard.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [bloodTable, setbloodTable] = useState([{
      b_id: 1,
      blood_group: 'O+ve',
      unit: 1
    },
    {
      b_id: 2,
      blood_group: 'B+ve',
      unit: 2
    }]);

    //useEffect call
  
    return (
      <div className={styles.dashboard}>
        <h1>BLOOD STOCK</h1>
  
        <table className={styles.bloodTable}>
          <thead>
            <tr>
              <th>BLOOD GROUP</th>
              <th>UNIT</th>
            </tr>
          </thead>
          <tbody>
            {bloodTable.length > 0 && bloodTable.map((val: any) => {
              return (
                <tr key={val.b_id}>
                  <td>{val.blood_group}</td>
                  <td>{val.unit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <img src={bfImg} alt="bg"/>*/}
        {/* <Footer /> */}
      </div>
    );
}
