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
    <Container className="relative">
      <Grid>
        <div>
          <H1>
            Choose <br />
            your team
          </H1>
        </div>
          {mergedPokemon?.map((mon) => (
            <CardParty key={mon.id} poke={mon} />
          ))}
        <div className="col-start-11 text-center">
          <H3 as="p">{mergedPokemon.filter(p => p?.id).length}/6</H3>
          <Link
            href="/"
            passHref
            className="w-14 h-14 lg:w-20 lg:h-20 p-2.5 rounded-full bg-gulf hover:bg-surfie text-white mx-auto flex flex-col items-center justify-center font-serif text-[0.75rem] lg:text-[1.125rem] transition duration-300 fixed bottom-4 right-4 lg:static"
          >
            Dex
            <ArrowRightIcon className="block w-full h-2.5" />
          </Link>
        </div>
      </Grid>
    </Container>
  )
}
