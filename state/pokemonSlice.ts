import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CleanPokemon, InPartyQuantity } from "../types/Pokemon"

export const pokemonLsDataKey = 'pokemon';
export const pokemonPartyCountLsKey = 'pokemon_party_q';
export interface PokemonState {
  partyPokemon: CleanPokemon[]
  inPartyQuantityData: InPartyQuantity
}

const initialState: PokemonState = {
  partyPokemon: [],
  inPartyQuantityData: {}
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setInitialPokemon: (state, action: PayloadAction<CleanPokemon[]>) =>{
      return { ...state, partyPokemon: action.payload }
    },
    setInitialInPartyQuantityData: (state, action: PayloadAction<InPartyQuantity>) =>{
      return { ...state, inPartyQuantityData: action.payload }
    },
    addToParty: (state, action: PayloadAction<CleanPokemon>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.partyPokemon.push(action.payload);
      state.inPartyQuantityData[action.payload.id] = (state.inPartyQuantityData[action.payload.id] ?? 0) + 1;
      localStorage?.setItem(pokemonLsDataKey, JSON.stringify(state.partyPokemon))
      localStorage?.setItem(pokemonPartyCountLsKey, JSON.stringify(state.inPartyQuantityData))
    },
    removeFromParty: (state, action: PayloadAction<CleanPokemon['id']>) => {
      const newState = {...state, partyPokemon: state.partyPokemon.filter(pokemon => pokemon.id !== action.payload)};
      localStorage?.setItem(pokemonLsDataKey, JSON.stringify(newState.partyPokemon))
      return newState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToParty, removeFromParty, setInitialPokemon, setInitialInPartyQuantityData } = pokemonSlice.actions

export default pokemonSlice.reducer