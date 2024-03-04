import clsx from "clsx"
import Image from "next/image"

import { H2 } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"
import React, { useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../state/hooks"
import { addToParty, addToDex } from "../state/pokemonSlice"
import { pokemonSelectors } from "../state/selectors"

// TODO: Card Styling
export default function Card({ id, name, types, image }: CleanPokemon) {
  const dispatch = useAppDispatch();
  const partyPokemon = useAppSelector(pokemonSelectors.partyPokemon)
  const dexPokemon = useAppSelector(pokemonSelectors.dexPokemon)
  // const inPartyQuantityData = useAppSelector(pokemonSelectors.inPartyQuantityData);
  const handleAddPokemon = () => {
    if(partyPokemon.length < 6 && !partyPokemon.find(pokemon=>pokemon.id === id)){
      dispatch(addToParty({id, name, types, image}));
    }
    if(partyPokemon.length >= 6 && dexPokemon.length < 6 && !dexPokemon.find(pokemon=>pokemon.id === id)){
      dispatch(addToDex({id, name, types, image}));
      console.log('DEX')
    }
  }

  const isSelected = useMemo(() => {
        return partyPokemon.find(pokemon=>pokemon.id === id) ||  dexPokemon.find(dexPokemon=> dexPokemon.id === id)
  }, [partyPokemon,dexPokemon, id]);
  // const partyQuantity = useMemo(() => inPartyQuantityData[id] ?? 0, [inPartyQuantityData, id]);
  const pokemonInWhichParty = useMemo(() => {
    if(partyPokemon.find(pokemon=>pokemon.id === id) && dexPokemon.find(dexPokemon=> dexPokemon.id === id)) {
      return "2 Parties"
    }
    if(partyPokemon.find(pokemon=>pokemon.id === id)) {
      return "Ash's Party"
    }
    if(dexPokemon.find(dexPokemon=> dexPokemon.id === id)) {
      return "Dex's Party"
    }

    return ''
  }, [partyPokemon, dexPokemon, id])

  console.log('isSelected', isSelected)
  return (
    <article className={`col-span-6 lg:col-span-4 relative mb-20 pokemonCard ${isSelected ? 'selected' : ''}`}>
      <button
        type="button"
        className="absolute inset-0 w-full h-full block z-10 cursor-pointer rounded-lg"
        onClick={handleAddPokemon}
      >
        <span className="sr-only">Add {name} to Party</span>
      </button>
      <div className="rounded-xl text-center h-48 w-48">
        <Image
          src={image}
          alt={name}
          className="pixel-art"
          width="150"
          height="150"
          unoptimized
        />
        <div className='cardContent'>
          {name !== undefined && (
            <>
              <div>
                <div className="inline-block w-14 h-6 rounded-full bg-zinc-100 text-slate-700 card-id" title={`Pokemon ID Number: ${id}`}>
                  #00{id}
                </div>
              </div>
              <div>
                <H2>{name}</H2>
              </div>
              <div className='mt-2'>
                <ul>
                  {types.map((type) => (
                    <li
                      className={clsx(
                        `bg-${type.toLowerCase()}`,
                        "text-white",
                        "inline-block"
                      )}
                      key={type}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
              {pokemonInWhichParty && <p>Added to {pokemonInWhichParty}</p>}
            </>
          )}
        </div>
      </div>
    </article>
  )
}
