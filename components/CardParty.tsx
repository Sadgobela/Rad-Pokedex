import clsx from "clsx"
import Image from "next/image"

import { H2 } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"
import React from "react"
import { useAppDispatch } from "../state/hooks"
import { removeFromDex, removeFromParty } from "../state/pokemonSlice"
import Link from "next/link"

// TODO: Card Styling
interface CardPartyProps {
  poke?: CleanPokemon;
  partyType: "ash" | "dex"
}
export default function CardParty({ poke, partyType }: CardPartyProps) {
  const dispatch = useAppDispatch();
  const handleRemovePokemon = () => {
    if(poke?.id){
      if( partyType === "ash" ){
        dispatch(removeFromParty(poke.id))
      } else if (partyType === "dex") {
        dispatch(removeFromDex(poke.id))
      }
    }
  }

  return (
    <article className={`col-span-6 lg:col-span-4 relative mb-20 pokemonCard ${poke ? 'selected' : ''}`}>
      {/* TODO: Handle adding to party */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full block z-10 cursor-pointer rounded-lg"
      >
        <span className="sr-only">Add {poke?.name} to Party</span>
      </button>
      <div className="rounded-xl text-center h-48 w-48">
        <Image
          src={poke?.image ?? '/img/placeholder-ball.png'}
          alt={poke?.name ?? 'pokemon'}
          className="pixel-art not-selected"
          width="150"
          height="150"
          unoptimized
        />
        {poke ? '' : <Link href="/" passHref className='addPokemonTriangle z-10'></Link>}
        <div className='cardContent'>
          {poke?.name !== undefined && (
            <>
              <div>
                <div className="inline-block w-14 h-6 rounded-full bg-zinc-100 text-slate-700 card-id"
                     title={`Pokemon ID Number: ${poke?.id}`}>
                  #00{poke?.id}
                </div>
              </div>
              <div>
                <H2>{poke?.name}</H2>
              </div>
              <div className='mt-2'>
                <ul>
                  {poke?.types?.map((type) => (
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
            </>
          )}
        </div>
        {poke ? <button
          type="button"
          className="removeBtn"
          onClick={handleRemovePokemon}
        >
          <span>x</span>
        </button> : '' }
      </div>
    </article>
  )
}
