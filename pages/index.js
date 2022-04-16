import Title from "../components/Common/Title";
import Account from "../components/Common/Account";
import Footer from "../components/Common/Footer";
import Landing from "../components/Common/Landing";

export default function Home() {
  return (
    <div>
      <div className="bg-black flex justify-center">
        <div className="flex flex-col min-h-screen items-stretch min-w-fit max-w-3xl w-11/12">
          <div className="flex justify-between items-center">
            <Title />
            <Account />
          </div>
          <main className="flex-grow flex bg-black">
            <Landing />
          </main>
          <div className="flex justify-end">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
