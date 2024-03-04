import Link from "next/link"

import Container from "../components/Container"
import Grid from "../components/Grid"
import ArrowRightIcon from "../icons/ArrowRight"
import { H1, H3 } from "../styles/Type"
import CardParty from "../components/CardParty"
import usePartyPokemon from "../hooks/usePartyPokemon"

export default function PartyPage() {
  const mergedPokemon = usePartyPokemon()

  return (
    <Container>
      <Grid className="items-start">
        <div className='col-span-full lg:col-start-2 lg:col-span-2 flex flex-col lg:min-h-[calc(100vh-300px)]'>
          <div className="flex-grow flex items-top relative">
            <H1>
              Ash's <br />
              party
            </H1>
          </div>
        </div>
        <div className="col-span-full lg:col-span-6 sm:mt-10">
          <Grid>
            {mergedPokemon?.map((mon) => (
              <CardParty key={mon.id} poke={mon} partyType={"ash"} />
            ))}
          </Grid>
        </div>
          <div className="col-start-11 text-center relative h-full max-lg:fixed max-lg:bottom-2.5 max-lg:right-10">
            <H3 as="p">{mergedPokemon.filter(p => p?.id).length}/6</H3>
            <Link
              href="/dex"
              passHref
              className="absolute left-0 right-0 w-14 h-14 lg:w-20 lg:h-20 p-2.5 rounded-full bg-gulf hover:bg-surfie text-white mx-auto flex flex-col items-center justify-center font-serif text-[0.75rem] lg:text-[1.125rem] transition duration-300 fixed bottom-4 right-4"
            >
              Dex
              <ArrowRightIcon className="block w-full h-2.5" />
            </Link>
          </div>
      </Grid>
    </Container>
)
}
