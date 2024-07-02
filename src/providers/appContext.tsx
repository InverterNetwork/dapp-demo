'use client'

import { useInverterHandler } from '@/hooks/useInverterHandler'
import useIsHydratedHandler from '@/hooks/useIsHydratedHandler'
import { createContext, useContext } from 'react'

export type TAppContext = {
  isHydrated: boolean
  inverter: ReturnType<typeof useInverterHandler>
}

const AppContext = createContext({} as TAppContext)

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const inverter = useInverterHandler()
  const isHydrated = useIsHydratedHandler()

  // CONTEXT
  //==============================================
  const contextData: TAppContext = {
    inverter,
    isHydrated,
  }

  // RETURN
  //==============================================
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
