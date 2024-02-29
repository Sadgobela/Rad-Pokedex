import clsx from "clsx"
import Image from "next/image"

import { H2 } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"
import React from "react"
import { useAppDispatch } from "../state/hooks"
import { removeFromParty } from "../state/pokemonSlice"

// TODO: Card Styling
interface CardPartyProps {
  poke?: CleanPokemon;
}
export default function CardParty({ poke }: CardPartyProps) {
  const dispatch = useAppDispatch();
  const handleRemovePokemon = () => {
    if(poke?.id){
      dispatch(removeFromParty(poke.id))
    }
  }

  return (
    <article className="col-span-6 lg:col-span-4 relative mb-14">
      {/* TODO: Handle adding to party */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full block z-10 cursor-pointer rounded-lg"
        onClick={handleRemovePokemon}
      >
        <span className="sr-only">Add {poke?.name} to Party</span>
      </button>
      <div className="bg-white rounded-xl text-center">
        <Image
          src={poke?.image ?? '/img/placeholder-ball.png'}
          alt={poke?.name ?? 'pokemon'}
          className="pixel-art"
          width="150"
          height="150"
          unoptimized
        />
        <div className=''>
          {poke?.name !== undefined && (
            <>
              <div>
                <div className="inline-block" title={`Pokemon ID Number: ${poke?.id}`}>
                  #{poke?.id}
                </div>
              </div>
              <div>
                <H2>{poke?.name}</H2>
              </div>
              <div>
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
      </div>
    </article>
  )
}
