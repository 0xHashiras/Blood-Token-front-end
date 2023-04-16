import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Donate.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export default function Donate() {
    const [bloodTable, setbloodTable] = useState([]);

    //useEffect call
  
    return (
        <div className={styles.donate}>
          <Link href="/register">
            <button>REGISTER</button>
          </Link>
          <Link href="/login">
            <button>LOGIN</button>
          </Link>
    
          {/* <Routes>
            <Route path="/reg/usr" component={UserRegister} />
            <Route path="/login/usr" component={UserLogin} />
          </Routes> */}
        </div>
      );
}
