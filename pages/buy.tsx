import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Donate.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/apps/store'


import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, gql ,HttpLink} from "@apollo/client/core"

const AIRSTACK_ENDPOINT = "https://api.airstack.xyz/gql"
const AIRSTACK_API_KEY = "dd4d6f2a033f413ca260aab47346c245"

// // Initializing Client 🚀
const client = new ApolloClient({
    // uri: AIRSTACK_ENDPOINT,
    link: new HttpLink({ uri: 'https://api.airstack.xyz/gql', fetch }),
    cache: new InMemoryCache(),
    headers: { Authorization: AIRSTACK_API_KEY },
})

const inter = Inter({ subsets: ['latin'] })

export default function Buy() {
    const [bloodTable, setbloodTable] = useState([]);
    const [hkval, setHkval] = useState(0)
    const [bpval, setBpval] = useState(0)
    const router = useRouter();
    const { bloodContract, address, web3 } = useSelector((state: RootState) => state.authReducer)
    useEffect(() => {
        console.log("address:", !address, address)
        if(!bloodContract) {
            router.push('/')
            return
        }
        // init()
    }, [])
    //useEffect call

    async function checkElgibility(owners: string, limit: number, contract: string, chain: string): Promise<any> {
        const query = gql`
        query CheckOwnership {
            TokenBalances(
              input: {filter: {owner: {_in: $owners}, tokenType: {_in: [ERC1155, ERC721]}, tokenAddress: {_eq: $contract}}, blockchain: $chain, limit: 10}
            ) {
              TokenBalance {
                tokenNfts {
                  metaData {
                    name
                  }
                }
                owner {
                  primaryDomain {
                    name
                  }
                }
              }
            }
          }
        `
    
        const response = await client.query({
            query,
            variables: {
                owners: owners,
                limit: limit,
                cursor: "",
            },
        })
        return response.data.TokenBalances
    }

    const getBalance = async () => {
        let tokenBalances = await checkElgibility("0x1f5d295778796a8b9f29600a585ab73d452acb1c", 10, "0x495f947276749ce646f68ac8c248420045cb7b5e", 'ethereum')
    tokenBalances.TokenBalance.forEach((tokenBalance: any) => {
        console.log(tokenBalance)
    })
    }

    useEffect(() => {
        getBalance()
    },[])

    
    
  
    return (
        <div className={styles.donate}>
            <h2 style={{color: 'green', textAlign: 'center'}}>Offer will be available only for token holder</h2>
            {/* <p>Price: 10 MATIC</p> */}
            <button>Master Health Kit </button><button onClick={() => setHkval(e=> e> 0? e-1 : 0)} >-</button> <button onClick={() => setHkval(e => e+1)}>+</button><button>{hkval}</button> <button>Price: 10 MATIC</button><br />
            
            <button>Booster Health Kit </button><button onClick={() => setBpval(e=> e> 0? e-1 : 0)} >-</button> <button onClick={() => setBpval(e => e+1)}>+</button><button>{bpval}</button><br />
            <button onClick={checkElgibility} >Buy</button>
    
          {/* <Routes>
            <Route path="/reg/usr" component={UserRegister} />
            <Route path="/login/usr" component={UserLogin} />
          </Routes> */}
        </div>
      );
}



async function checkEligibility( limit: number, cursor: string,blockchain:string,useraddr:string,contractaddr:string): Promise<any> {

    const query = gql`query CheckOwnership {
        TokenBalances(
          input: {filter: {owner: {_in: "${useraddr}"}, tokenType: {_in: [ERC1155, ERC721]}, tokenAddress: {_eq: "${contractaddr}"}}, blockchain: ${blockchain}, limit: 10}
        ) {
          TokenBalance {
            tokenNfts {
              metaData {
                name
              }
            }
            owner {
              primaryDomain {
                name
              }
            }
          }
        }
      }`

    const response = await client.query({
        query:query,
        variables: {
            limit: limit,
            cursor: cursor,
        },
    })
    return response.data.TokenBalances
}

const main = async () => {

    let limit = 10
    let cursor = ""
    let response = await checkEligibility(10, "","ethereum","0x1f5d295778796a8b9f29600a585ab73d452acb1c","0x495f947276749ce646f68ac8c248420045cb7b5e")

    console.log(response.TokenBalance != null)
}
main()
