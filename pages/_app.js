import "../styles/index.css";
import { MoralisProvider } from "react-moralis";
import MainProvider from "../context/Provider";

const APP_ID = "4fnErG17uYipvjOZkzVjwjySCJGJYpFGjAwAWBTz";
const SERVER_URL = "https://cs23appumvpf.usemoralis.com:2053/server";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <MainProvider>
        <Component {...pageProps} />
      </MainProvider>
    </MoralisProvider>
  );
}

export default MyApp;
