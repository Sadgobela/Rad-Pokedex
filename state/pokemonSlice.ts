import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CleanPokemon } from "../types/Pokemon"

export const pokemonLSDataKey = 'pokemon';
export interface PokemonState {
  partyPokemon: CleanPokemon[]
}

const initialState: PokemonState = {
  partyPokemon: [],
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setInitialPokemon: (state, action: PayloadAction<CleanPokemon[]>) =>{
      return { ...state, partyPokemon: action.payload }
    },
    addToParty: (state, action: PayloadAction<CleanPokemon>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.partyPokemon.push(action.payload);
      localStorage?.setItem(pokemonLSDataKey, JSON.stringify(state.partyPokemon))
    },
    removeFromParty: (state, action: PayloadAction<CleanPokemon['id']>) => {
      const newState = {...state, partyPokemon: state.partyPokemon.filter(pokemon => pokemon.id !== action.payload)};
      localStorage?.setItem(pokemonLSDataKey, JSON.stringify(newState.partyPokemon))
      return newState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToParty, removeFromParty, setInitialPokemon } = pokemonSlice.actions

export default pokemonSlice.reducer