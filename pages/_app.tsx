import React, { useState } from 'react'
import type { AppProps } from 'next/app'
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import '../styles/globals.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import * as dotenv from 'dotenv'

dotenv.config()

const INFURA_ID = 'f8cdb8db1e88415aa55755437ca44efa'

const { chains, provider } = configureChains(
  [chain.polygon], // you can add more chains here like chain.mainnet, chain.optimism etc.
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`, 
        };
      },
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Acely',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


export default function App({ Component, pageProps }: AppProps) {
  // const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
       <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
