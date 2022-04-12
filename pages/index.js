import Head from "next/head";
import Title from "../components/Common/Title";
import Account from "../components/Common/Account";
import Footer from "../components/Common/Footer";
import Main from "../components/Main";

export default function Home() {
  return (
    <div>
      <Head>
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap&apos;);
        </style>
        <title>Simple Joe</title>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black flex justify-center">
        <div className="flex flex-col min-h-screen items-stretch min-w-fit max-w-3xl w-11/12">
          <div className="flex justify-between items-center">
            <Title />
            <Account />
          </div>
          <main className="flex-grow flex bg-black">
            <Main />
          </main>
          <div className="flex justify-end">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
