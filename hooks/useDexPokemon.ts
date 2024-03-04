import React, { useMemo } from "react"
import { useAppSelector } from "../state/hooks"
import { pokemonSelectors } from "../state/selectors"

export default function useDexPokemon() {
  const dexPokemon = useAppSelector(pokemonSelectors.dexPokemon)

  return useMemo(() => {
    if(dexPokemon.length < 6){
      return [...dexPokemon, ...Array(6 - dexPokemon.length).fill('')]
    }
    return dexPokemon;
  }, [dexPokemon]);
}