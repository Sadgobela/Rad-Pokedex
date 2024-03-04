import { FC, ReactNode, useEffect } from "react"

import Header from "./Header"
import { useAppDispatch } from "../state/hooks"
import {
  pokemonDexLsDataKey,
  pokemonLsDataKey,
  // pokemonPartyCountLsKey,
  // setInitialInPartyQuantityData,
  setInitialPokemon,
  setInitialDexPokemon
} from "../state/pokemonSlice"

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const pokemonLocalStorageData = localStorage?.getItem(pokemonLsDataKey);
    const pokemonDexLocalStorageData = localStorage?.getItem(pokemonDexLsDataKey);
    // const inPartyQuantityStorageData = localStorage?.getItem(pokemonPartyCountLsKey);

    if(pokemonLocalStorageData){
      dispatch(setInitialPokemon(JSON.parse(pokemonLocalStorageData)))
    }
    if(pokemonDexLocalStorageData){
      dispatch(setInitialDexPokemon(JSON.parse(pokemonDexLocalStorageData)))
    }
    // if(inPartyQuantityStorageData){
    //   dispatch(setInitialInPartyQuantityData(JSON.parse(inPartyQuantityStorageData)))
    // }
  }, [])
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
