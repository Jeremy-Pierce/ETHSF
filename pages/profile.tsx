import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import * as dotenv from 'dotenv'
import { useRouter } from 'next/router'
import { Web3Storage } from 'web3.storage'
import { generateChallenge, authenticate, apolloClient } from '../utils';
import { useSignMessage } from 'wagmi';
import { gql } from "@apollo/client"; 


dotenv.config()


export default function Profile(props: any) {

    //   const WEB3_STORAGE_TOKEN = process.env.REACT_APP_WEB3_STORAGE
    const WEB3_STORAGE_TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg4NjkyOTA0Y0RENjlhOEExQjdlQjg1OTQ0MkE0YjQ5OEUyNkVFNDYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njc3MDk5NDkzODgsIm5hbWUiOiJFVEhTRiJ9.x7sjH_RHuioiQHOYeEL_6B_ytQDPp9Uydg-jdnzXzbE'
    const router = useRouter()
    const { query: { ens, address } } = router
    var ethAddress = address
    //   const ens = useStore(state => state.ens);
    //   console.log(ens);
    
  const [lensStatus, setLensStatus] = useState<boolean>(false)
  const [completed, setCompleted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [tx, setTX] = useState<string>()
  const [profileData, setProfileData] = useState<any>({type: "", username: "", image: null})
  const [profileIntrests, setProfileIntrests] = useState<any>([])
  const intrestsList = ["DAOs", "NFTs", "DeFi", "Governance", "ReFi", "Trading", "Gaming", "MetaVerse", "Development"]

  const checkSelection = (e, intrest) => {
    if (e.target.checked) {
      profileIntrests.indexOf(intrest) === -1 && profileIntrests.push(intrest)
      setProfileIntrests(profileIntrests)
    //   console.log(profileIntrests);
    } else {
      let profileIntrestsNew = profileIntrests.filter(item => item !== intrest)
      setProfileIntrests(profileIntrestsNew)
    //   console.log(profileIntrests);
    }
  };


    //   Lens Protocol
    const { signMessageAsync } = useSignMessage();
    const signInLens = async () => {
        try {
            const challenge = await generateChallenge(ethAddress);
            const signature = await signMessageAsync({ message: challenge });
            const accessToken = await authenticate(address, signature);
            // console.log({ accessToken });
            window.sessionStorage.setItem('accessToken', accessToken);
            setLensStatus(true);
        } catch (error) {
            console.error(error);
        }
    };


    // IPFS
    const submitProfile = async () => {
        setLoading(true)
        const client = new Web3Storage({ token: WEB3_STORAGE_TOKEN })
        const fileInput = document.querySelector('input[type="file"]')
        const rootCid = await client.put(fileInput.files)
        const info = await client.status(rootCid)
        const IPFS_Profile_Pic = `https://ipfs.io/ipfs/${info.cid}`
        console.log(IPFS_Profile_Pic);
        createProfile();
    }

    const createProfile = async () => {
        const response = await apolloClient.mutate({
            mutation: gql`
            mutation CreateProfile {
                createProfile(request:{ 
                            handle: "${profileData.username}",
                            profilePictureUri: "${profileData.image}",
                            followNFTURI: null,
                            followModule: null
                            }) {
                ... on RelayerResult {
                    txHash
                }
                ... on RelayError {
                    reason
                }
                __typename
                }
            }`,
            })
        console.log('Lens example data: ', response)
        setTX(response.data.createProfile.txHash)
    }

    const checkTX = async () => { 
        const response = await apolloClient.query({
            query: gql`query HasTxHashBeenIndexed {
                hasTxHashBeenIndexed(request: { txHash: "${tx}" }) {
                  ... on TransactionIndexedResult {
                    indexed
                    txReceipt {
                      to
                      from
                      contractAddress
                      transactionIndex
                      root
                      gasUsed
                      logsBloom
                      blockHash
                      transactionHash
                      blockNumber
                      confirmations
                      cumulativeGasUsed
                      effectiveGasPrice
                      byzantium
                      type
                      status
                      logs {
                        blockNumber
                        blockHash
                        transactionIndex
                        removed
                        address
                        data
                        topics
                        transactionHash
                        logIndex
                      }
                    }
                    metadataStatus {
                      status
                      reason
                    }
                  }
                  ... on TransactionError {
                    reason
                    txReceipt {
                      to
                      from
                      contractAddress
                      transactionIndex
                      root
                      gasUsed
                      logsBloom
                      blockHash
                      transactionHash
                      blockNumber
                      confirmations
                      cumulativeGasUsed
                      effectiveGasPrice
                      byzantium
                      type
                      status
                      logs {
                        blockNumber
                        blockHash
                        transactionIndex
                        removed
                        address
                        data
                        topics
                        transactionHash
                        logIndex
                      }
                    }
                  },
                  __typename
                }
              }`,
            })
        console.log(response.data.hasTxHashBeenIndexed)
        return response.data.hasTxHashBeenIndexed
    }

    useEffect(() => {
        async function check() {
            if (tx){
                let txRes = await checkTX()
                txRes && setCompleted(true)
            }
        }
        setTimeout(() => {
            check()
        }, 10000);
        
        completed && router.push('/courses', undefined, { shallow: true })
      }, [completed, tx])


  return (
        <div className="dark bg-gray-900 h-screen flex justify-center items-center text-white flex-col">
            <Head>
                <title>Acely - Create Your Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            { lensStatus ? 
                <>
                    {/* <div className='flex gap-4 mb-12'>
                        <div className="flex items-center w-32 pl-4 rounded border border-gray-200 dark:border-gray-700" onClick={() => setProfileData({...profileData, type: 'student'}) }>
                            <input id="bordered-radio-1" type="radio" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="bordered-radio-1" className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Student</label>
                        </div>
                        <div className="flex items-center w-32 pl-4 rounded border border-gray-200 dark:border-gray-700" onClick={() => setProfileData({...profileData, type: 'mentor'}) }>
                            <input id="bordered-radio-2" type="radio" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="bordered-radio-2" className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Mentor</label>
                        </div>
                    </div> */}

                    <div className='flex mb-8 justify-center items-center gap-2'>
                        <div>
                            <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username or Company</label>
                            <input  type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={profileData.username} onChange={(e) => setProfileData({...profileData, username: e.target.value})} placeholder="username or company" />
                        </div>
                        {   ens && 
                            <button onClick={() => setProfileData({...profileData, username: ens.split(".")[0]})} type="button" className="mt-9 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Fill from ENS</button>
                        }
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload your profile picture:</label>
                        <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF.</p>
                    </div>
                    
                    {/* <div className='mt-8'> */}
                        {/* <h3 className="mb-5 text-base font-medium text-gray-900 dark:text-white">Choose your intrests:</h3> */}
                        {/* <ul className="grid gap-6 w-full md:grid-cols-3"> */}
                        {/* { intrestsList && intrestsList.map((intrest, index) =>  */}
                            {/* <li key={index}> */}
                                {/* <input type="checkbox" id={`react-option-${index}`} className="hidden peer" onChange={(e) => checkSelection(e, intrest)} /> */}
                                {/* <label htmlFor={`react-option-${index}`} className="inline-flex justify-between items-center p-3 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                            */}
                                    {/* <div className="block"> */}
                                        {/* <div className="w-full text-base font-semibold">{intrest}</div> */}
                                        {/* <div className="w-full text-sm">Description</div> */}
                                    {/* </div> */}
                                {/* </label> */}
                            {/* </li> */}
                        {/* )} */}
                        {/* </ul> */}
                    {/* </div> */}

                    <button type="button" className="mt-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={submitProfile}>{loading ? 'Loading...' : 'Create Profile'}</button>
                </>
            : <button className="text-gray-900 h-10 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={signInLens}>
                Sign In with Lens Protocol
            </button> 
        }
        </div>
  )
}