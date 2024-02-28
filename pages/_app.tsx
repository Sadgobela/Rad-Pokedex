import type { AppProps } from "next/app"
import Head from "next/head"

import "../styles/global.css"

import Layout from "../components/Layout"
import { Provider } from "react-redux"
import { store } from "../state/store"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokemon Team Builder</title>
        <meta
          name="description"
          content="Browse and select your party of Generation 1 Pokemon"
        />

        <link rel="prefetch" href="/img/pokeball-loader.gif" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default MyApp
