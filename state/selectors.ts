import { RootState } from "./store"

export const pokemonSelectors = {
  partyPokemon: (state: RootState) => state.pokemon.partyPokemon
}