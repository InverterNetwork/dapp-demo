'use client'

import { useIsHydrated } from '@/hooks'
import utils from '@/lib/utils'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Button, ButtonProps, Loading } from '@/react-daisyui'

export function WalletWidget(props: Omit<ButtonProps, 'color' | 'onClick'>) {
  const { size, ...rest } = props
  const isHydrated = useIsHydrated()
  const dynamicContext = useDynamicContext()

  const isConnected = dynamicContext.primaryWallet?.connected
  const address = dynamicContext.primaryWallet?.address

  if (!isHydrated || (isConnected && !address))
    if (!isHydrated) return <Loading variant="dots" className="m-auto" />

  return (
    <Button
      {...rest}
      {...(!isConnected && { color: 'primary' })}
      type="button"
      size={!size ? 'sm' : size}
      onClick={() =>
        dynamicContext[
          !isConnected ? 'setShowAuthFlow' : 'setShowDynamicUserProfile'
        ](true)
      }
    >
      {!isConnected ? 'Connect Wallet' : utils.format.compressAddress(address)}
    </Button>
  )
}
