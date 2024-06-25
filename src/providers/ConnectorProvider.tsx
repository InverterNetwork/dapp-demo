'use client'

import { Global } from '@emotion/react'
import { dynamicTheme } from '@/styles/dynamicTheme'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import {
  DynamicContextProvider,
  DynamicUserProfile,
} from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { sepolia } from 'viem/chains'
import utils from '@/lib/utils'
import { HttpTransport } from 'viem'

const { cssOverrides, shadowDomOverWrites } = dynamicTheme

const chains = [sepolia] as const,
  evmNetworks = utils.transform.viemChainsToDynamic(chains),
  config = createConfig({
    chains: chains,
    multiInjectedProviderDiscovery: false,
    transports: chains.reduce(
      (acc, chain) => {
        acc[chain.id] = http()
        return acc
      },
      {} as Record<number, HttpTransport>
    ),
    ssr: true,
  })

export default function ConnectorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // RENDER
  return (
    <>
      <Global styles={shadowDomOverWrites} />
      <DynamicContextProvider
        settings={{
          environmentId: '6bb89ec9-47d3-4c3a-8fdd-71c8995b9b3a',
          cssOverrides,
          walletConnectors: [EthereumWalletConnectors],
          overrides: {
            evmNetworks,
          },
          initialAuthenticationMode: 'connect-only',
        }}
      >
        <WagmiProvider config={config}>
          <DynamicWagmiConnector suppressChainMismatchError>
            {children}
            <DynamicUserProfile />
          </DynamicWagmiConnector>
        </WagmiProvider>
      </DynamicContextProvider>
    </>
  )
}
