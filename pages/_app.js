import "../styles/index.css";
import { MoralisProvider } from "react-moralis";
import MainProvider from "../src/context/Provider";
import Head from "next/head";

const APP_ID = "4fnErG17uYipvjOZkzVjwjySCJGJYpFGjAwAWBTz";
const SERVER_URL = "https://cs23appumvpf.usemoralis.com:2053/server";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <MainProvider>
        <Head>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Mono:wght@300&display=swap');
          </style>
          <title>Simple Joe</title>
          <meta charset="UTF-8" />
          <meta
            name="description"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </MainProvider>
    </MoralisProvider>
  );
}

export default MyApp;
