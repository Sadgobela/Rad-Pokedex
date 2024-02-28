import React, { useMemo } from "react"
import { useAppSelector } from "../state/hooks"
import { pokemonSelectors } from "../state/selectors"

export default function usePartyPokemon() {
  const partyPokemon = useAppSelector(pokemonSelectors.partyPokemon)

  return useMemo(() => {
    if(partyPokemon.length < 6){
      return [...partyPokemon, ...Array(6 - partyPokemon.length).fill('')]
    }
    return partyPokemon;
  }, [partyPokemon]);
}