import { FC, ReactNode, useEffect } from "react"

import Header from "./Header"
import { useAppDispatch } from "../state/hooks"
import { pokemonLSDataKey, setInitialPokemon } from "../state/pokemonSlice"

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const pokemonLocalStorageData = localStorage?.getItem(pokemonLSDataKey);
    if(pokemonLocalStorageData){
      dispatch(setInitialPokemon(JSON.parse(pokemonLocalStorageData)))
    }
  }, [])
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
