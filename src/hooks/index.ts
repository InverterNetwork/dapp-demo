import { useAppContext } from '@/providers/appContext'
import { useThemeContext } from '@/providers/themeContext'

export { default as useDisclosure } from './useDisclosure'
export { default as useServerAction } from './useServerAction'

export const useIsHydrated = () => useAppContext().isHydrated
export const useToast = () => useThemeContext().toastHandler
export const useTheme = () => useThemeContext().themeHandler
export const useInverter = () => useAppContext().inverter
