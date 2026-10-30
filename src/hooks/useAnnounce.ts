import {createContext, useContext} from 'react'

export const AnnounceContext = createContext<(message: string) => void>(() => {})

/** Replaces announce() from the original main.js. */
export const useAnnounce = () => useContext(AnnounceContext)