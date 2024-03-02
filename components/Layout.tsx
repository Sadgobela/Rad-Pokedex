import { FC, ReactNode, useEffect } from "react"

import Header from "./Header"
import { useAppDispatch } from "../state/hooks"
import {
  pokemonLsDataKey,
  pokemonPartyCountLsKey,
  setInitialInPartyQuantityData,
  setInitialPokemon,
} from "../state/pokemonSlice"

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const pokemonLocalStorageData = localStorage?.getItem(pokemonLsDataKey);
    const inPartyQuantityStorageData = localStorage?.getItem(pokemonPartyCountLsKey);

    if(pokemonLocalStorageData){
      dispatch(setInitialPokemon(JSON.parse(pokemonLocalStorageData)))
    }
    if(inPartyQuantityStorageData){
      dispatch(setInitialInPartyQuantityData(JSON.parse(inPartyQuantityStorageData)))
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
