import Image from "next/image"
import Link from "next/link"
import Card from "../components/Card"
import Container from "../components/Container"
import Grid from "../components/Grid"
import ArrowRightIcon from "../icons/ArrowRight"
import ScrollIcon from "../icons/Scroll"
import { H1, P } from "../styles/Type"
import { CleanPokemon } from "../types/Pokemon"
import usePartyPokemon from "../hooks/usePartyPokemon"
import { useEffect, useRef, useState } from "react"
import { getPokemon } from './api/pokemon'
import Spinner from "../icons/Spinner"
import { useAppSelector } from "../state/hooks"
import { pokemonSelectors } from "../state/selectors"
export async function getStaticProps() {
  const { pokemon, totalPokemon  } = await getPokemon()

  return {
    props: {
      pokemon,
      totalPokemon,
    },
  }
}

export default function Home({
  pokemon,
  totalPokemon,
}: {
  pokemon: CleanPokemon[]
  totalPokemon: number
}) {
  const [localPokemon, setLocalPokemon] = useState(pokemon);
  const [isLoading, setIsLoading] = useState(false);
  const currentPage = useRef(1);
  const mergedPokemon = usePartyPokemon()

  useEffect(() => {
    const handleLoadMore = async () => {
      if(window.scrollY + window.innerHeight + 100 >= document.documentElement.scrollHeight){
        setIsLoading(true);
        window.removeEventListener('scroll', handleLoadMore)
        currentPage.current += 1;
        const response = await getPokemon(currentPage.current);
        setLocalPokemon(prevState => [...prevState, ...response.pokemon]);
        if(response.pokemon?.length){
          window.addEventListener('scroll', handleLoadMore, { passive: true })
        }
        setIsLoading(false);
      }
    }
    window.addEventListener('scroll', handleLoadMore, { passive: true })
    return () => {
      window.removeEventListener('scroll',handleLoadMore)
      currentPage.current = 1;
    }
  }, []);

  return (
    <Container>
      <Grid className="items-start">
        <div className="col-span-full lg:col-start-2 lg:col-span-2 flex flex-col lg:min-h-[calc(100vh-300px)]">
          <div className="flex-grow flex items-top relative">
            <H1>
              Choose <br />
              your team
            </H1>
          </div>
          <div className="hidden lg:flex flex-col items-center text-center font-serif opacity-60">
            <P>Scroll for more</P>
            <ScrollIcon className="mt-2.5 block" />
          </div>
        </div>
        <div className="col-span-full lg:col-span-6">
          <Grid>
            {localPokemon?.map((mon) => (
              <Card key={mon.id} {...mon} />
            ))}
          </Grid>
          {isLoading && (
            <div className="loader flex justify-center">
              <Spinner />
            </div>
          )}
          <div className="text-center my-5 text-[1.5rem]">
          {localPokemon.length}/{totalPokemon}
          </div>
        </div>
        <div className="col-span-full row-start-2 lg:row-start-1 lg:col-span-1 lg:col-start-11 lg:sticky top-5 grid grid-cols-6 lg:grid-cols-1 lg:gap-5 gap-7">
          {mergedPokemon.map((pok, i) => (
              <Image
                key={pok?.id ?? `_key${i}`}
                src={pok?.image ?? '/img/placeholder-ball.png'}
                alt={pok?.name ?? 'pokemon'}
                width="83"
                height="83"
                className="opacity-40"
              />
            ))}
          <div>
            <Link
              href="/party"
              passHref
              className="w-14 h-14 lg:w-20 lg:h-20 p-2.5 rounded-full bg-gulf hover:bg-surfie text-white mx-auto flex flex-col items-center justify-center font-serif text-[0.75rem] lg:text-[1.125rem] transition duration-300 fixed bottom-4 right-4 lg:static"
            >
              Party
              <ArrowRightIcon className="block w-full h-2.5" />
            </Link>
          </div>
        </div>
      </Grid>
    </Container>
  )
}
