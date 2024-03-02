import clsx from "clsx"
import Image from "next/image"

import { H2 } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"
import React, { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../state/hooks"
import { addToParty, removeFromParty } from "../state/pokemonSlice"
import { pokemonSelectors } from "../state/selectors"
import usePartyPokemon from "../hooks/usePartyPokemon"

// TODO: Card Styling
export default function Card({ id, name, types, image }: CleanPokemon) {
  const dispatch = useAppDispatch();
  const [add, setAdd] = useState(false);
  const partyPokemon = useAppSelector(pokemonSelectors.partyPokemon)
  const inPartyQuantityData = useAppSelector(pokemonSelectors.inPartyQuantityData);
  const handleAddPokemon = () => {
    if(partyPokemon.length < 6 && !partyPokemon.find(pokemon=>pokemon.id === id)){
      dispatch(addToParty({id, name, types, image}));
    }
    if(partyPokemon.find(pokemon=>pokemon.id === id)){
      dispatch(removeFromParty(id));
    }
  }

  const isSelected = useMemo(() => partyPokemon.find(pokemon=>pokemon.id === id), [partyPokemon, id]);
  const partyQuantity = useMemo(() => inPartyQuantityData[id] ?? 0, [inPartyQuantityData, id]);

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
              <p>Added to party {partyQuantity} times</p>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
