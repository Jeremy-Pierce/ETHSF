import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { providers, ethers } from 'ethers'
import Web3Token from 'web3-token'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import * as dotenv from 'dotenv'
import VerifyID from '../components/VerifyID'
import { useRouter } from 'next/router'
import { useStore } from '../components/Store'

dotenv.config()


export default function Home() {

  const router = useRouter()

  const INFURA_ID = process.env.REACT_APP_INFURA_ID
  const WorldID_URL = 'https://id.worldcoin.org/use?action_id=wid_staging_3ebb3b050fbeedfc4997b65b4552b54a&signal=user-id-1&app_name=UniCourse&signal_description=Connecting%20Mentors%20&%20Students%20in%20Web3&return_to=https://127.0.0.1:3000/profile'
  
  const [web3Modal, setWeb3Modal] = useState<any>()
  const [signer, setSigner] = useState<any>()
  const [address, setAddress] = useState<string>('')
  const [ens, setENS] = useState<string>('')
  const [walletStatus, setWalletStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected')
  const [verified, setVerified] = useState<boolean>(false)

  useEffect(() => {
    verified && router.push({ pathname: '/profile', query: { ens: ens, address: address } })
  }, [verified])

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID,
        }
      },
    }

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      network: 'mainnet',
      providerOptions,
      theme: 'dark',
    })

    setWeb3Modal(newWeb3Modal)
  }, [])

  useEffect(() => {
    if(web3Modal && web3Modal.cachedProvider){
      loadWeb3()
    }
  }, [web3Modal])

  // async function sign(token, eSigner) {
  //   token = await Web3Token.sign(async msg => await eSigner.signMessage(msg), {
  //     statement: 'This is a signed message',
  //     expires_in: '1y'
  //   })
  //   return token
  // }

  async function loadWeb3() {
    setWalletStatus('connecting')
    const provider = await web3Modal.connect()
    addListeners(provider)
    const ethersProvider = new providers.Web3Provider(provider)
    const signer = ethersProvider.getSigner()
    setSigner(signer)
    const ethAddress = await signer.getAddress()
    setAddress(ethAddress)
    const name = await ethersProvider.lookupAddress('0xa0b1c445773ce2144d45d093359e9be9efc9a1d3');
    // name && useStore.setState({ens: name})
    name && setENS(name)
    // console.log(name)
    
  //   let token = localStorage.getItem(ethAddress)
  //   token && setAddress(ethAddress)
  //   if (!token) { 
  //     token = await sign(token, signer)
  //     localStorage.setItem(ethAddress, token)
  //     setAddress(ethAddress)
  //   }

    setWalletStatus('connected')
  }

  function clearAddress() {
    setAddress('')
    localStorage.removeItem(address)
    setWalletStatus('disconnected')
  }

  async function addListeners(web3ModalProvider) {
    web3ModalProvider.on('accountsChanged', (accounts) => {
      window.location.reload()
    })

    // web3ModalProvider.on('chainChanged', (chainId) => {
    //   window.location.reload()
    // })

    // web3ModalProvider.on('connect', (info) => {
    //   console.log(info)
    // })
    
    web3ModalProvider.on('disconnect', (error) => {
      web3Modal.clearCachedProvider()
      clearAddress()
      // window.location.reload()
      console.log(error)
    })
  }

  async function disconnectWeb3() {
    await web3Modal.clearCachedProvider()
    clearAddress()
  }

  return (
    <div className="dark">
      <Head>
        <title>Acely</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

        <div className="dark:bg-gray-900 h-screen flex justify-center items-center dark:text-white">
        { !address ? 
            <button onClick={loadWeb3} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
              <svg className="mr-2 -ml-1 w-6 h-5" fill="none" height="332" viewBox="0 0 480 332" width="480" xmlns="http://www.w3.org/2000/svg"><path d="m126.613 93.9842c62.622-61.3123 164.152-61.3123 226.775 0l7.536 7.3788c3.131 3.066 3.131 8.036 0 11.102l-25.781 25.242c-1.566 1.533-4.104 1.533-5.67 0l-10.371-10.154c-43.687-42.7734-114.517-42.7734-158.204 0l-11.107 10.874c-1.565 1.533-4.103 1.533-5.669 0l-25.781-25.242c-3.132-3.066-3.132-8.036 0-11.102zm280.093 52.2038 22.946 22.465c3.131 3.066 3.131 8.036 0 11.102l-103.463 101.301c-3.131 3.065-8.208 3.065-11.339 0l-73.432-71.896c-.783-.767-2.052-.767-2.835 0l-73.43 71.896c-3.131 3.065-8.208 3.065-11.339 0l-103.4657-101.302c-3.1311-3.066-3.1311-8.036 0-11.102l22.9456-22.466c3.1311-3.065 8.2077-3.065 11.3388 0l73.4333 71.897c.782.767 2.051.767 2.834 0l73.429-71.897c3.131-3.065 8.208-3.065 11.339 0l73.433 71.897c.783.767 2.052.767 2.835 0l73.431-71.895c3.132-3.066 8.208-3.066 11.339 0z" fill="#fff"/></svg>
              Connect Wallet
            </button>

          : <VerifyID setVerified={setVerified} />
          
          // <a href={WorldID_URL} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
          //   <div className="worldID-logo mt-[10px]"><svg width={42} height={42} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9728 13.1327C21.4192 11.2371 25.8349 6.49303 27.942 8.076C30.3946 9.97654 27.534 13.7923 26.5261 15.2678C26.5261 15.2678 26.3245 13.2255 24.7166 11.3739C23.4351 12.1995 22.2496 13.0301 21.5536 13.5284C21.4913 13.5702 21.4182 13.5923 21.3436 13.592C21.269 13.5917 21.1962 13.5691 21.1342 13.5268C21.0722 13.4846 21.0238 13.4246 20.9951 13.3545C20.9664 13.2844 20.9587 13.2073 20.9728 13.1327V13.1327ZM22.7727 15.9957C22.7195 16.0209 22.6733 16.059 22.6381 16.1067C22.603 16.1545 22.5799 16.2103 22.5711 16.2693C22.5543 16.3609 22.5716 16.4556 22.6194 16.5351C22.6673 16.6145 22.7425 16.673 22.8303 16.6993C23.6463 16.9436 25.0238 17.3735 26.4541 17.8816C26.0317 20.3147 24.5918 21.7462 24.5918 21.7462C26.3533 21.6289 31.0618 21.5361 30.9994 18.3946C30.9082 15.7319 24.5102 15.17 22.7727 15.9957ZM21.6928 19.2105C21.6252 19.1766 21.549 19.1645 21.4745 19.1759C21.4 19.1873 21.3306 19.2216 21.2758 19.2742C21.2209 19.3268 21.1832 19.3953 21.1677 19.4703C21.1521 19.5454 21.1595 19.6235 21.1888 19.6942C21.5056 20.4955 22.0384 21.8586 22.5375 23.3194C20.4017 24.4969 18.405 24.2379 18.405 24.2379C19.5905 25.5668 22.5951 29.2604 24.9662 27.2573C26.958 25.5277 23.4111 20.0802 21.6928 19.2105ZM18.549 20.3538C18.5369 20.2952 18.5109 20.2405 18.4732 20.1945C18.4356 20.1485 18.3874 20.1126 18.333 20.09C18.2491 20.0515 18.154 20.0467 18.0667 20.0766C17.9795 20.1065 17.9066 20.1689 17.8626 20.2512C17.4451 21.0036 16.7251 22.2739 15.914 23.5783C13.6821 22.611 12.6358 20.857 12.6358 20.857C12.3526 22.6305 11.3831 27.3257 14.4021 27.9706C16.9699 28.4787 18.9522 22.2592 18.549 20.3538V20.3538ZM15.7172 18.5558C15.7525 18.5093 15.7769 18.4552 15.7885 18.3976C15.8002 18.3401 15.7988 18.2805 15.7844 18.2236C15.7616 18.1325 15.7061 18.0533 15.6288 18.0018C15.5515 17.9502 15.458 17.93 15.3668 17.9451C14.5269 18.0819 13.1013 18.3018 11.5942 18.4679C10.9463 16.0837 11.6422 14.1636 11.6422 14.1636C10.1015 15.0381 5.89222 17.1927 7.27453 19.9922C8.48405 22.3569 14.4981 20.0606 15.7172 18.5558V18.5558ZM15.3284 15.1798C15.3871 15.1816 15.4454 15.1687 15.4981 15.1423C15.5508 15.1159 15.5963 15.0768 15.6308 15.0284C15.6859 14.9526 15.7116 14.8588 15.7027 14.7649C15.6938 14.6711 15.6511 14.5839 15.5828 14.5202C14.954 13.9388 13.8981 12.9422 12.8326 11.8429C14.2629 9.84463 16.1731 9.2046 16.1731 9.2046C14.5413 8.5206 10.2647 6.5028 8.97362 9.35605C7.90808 11.7891 13.4133 15.1505 15.3284 15.1798V15.1798ZM17.9922 12.9177C18.0842 12.9144 18.1718 12.8767 18.2382 12.8118C18.3046 12.7469 18.3452 12.6594 18.3522 12.566C18.405 11.7012 18.5202 10.2404 18.6978 8.70626C21.1264 8.59877 22.8063 9.72248 22.8063 9.72248C22.3167 7.99783 21.2032 3.33687 18.2082 4.07949C15.674 4.74883 16.5187 11.2273 17.685 12.776C17.7218 12.8225 17.7687 12.8595 17.8221 12.8841C17.8754 12.9087 17.9337 12.9202 17.9922 12.9177V12.9177Z" fill="url(#paint0_linear_18_318)" /><defs><linearGradient id="paint0_linear_18_318" x1={7} y1="15.9999" x2={31} y2="15.9999" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6848" style={{stopColor: 'var(--gradient-from)'}} /><stop offset={1} stopColor="#4940E0" style={{stopColor: 'var(--gradient-to)'}} /></linearGradient><linearGradient id="paint1_linear_18_318" x1="1.45287e-07" y1={37} x2={39} y2={37} gradientUnits="userSpaceOnUse"><stop stopColor="#FF6848" style={{stopColor: 'var(--gradient-from)'}} /><stop offset={1} stopColor="#4940E0" /></linearGradient></defs></svg></div>
          //     WorldID Verification
          //   </a>
        }
      </div>
    </div>
  )
}