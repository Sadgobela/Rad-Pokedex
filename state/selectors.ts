import { RootState } from "./store"

export const pokemonSelectors = {
  partyPokemon: (state: RootState) => state.pokemon.partyPokemon,
  dexPokemon: (state: RootState) => state.pokemon.dexPokemon,
  // inPartyQuantityData: (state: RootState) => state.pokemon.inPartyQuantityData
}