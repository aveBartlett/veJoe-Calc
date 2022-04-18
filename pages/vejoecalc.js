import Title from "../src/components/Title";
import Account from "../src/components/Account";
import Footer from "../src/components/Footer";
import VeJoeCalculator from "../src/components/VeJoeCalculator";

export default function VeJoeHome() {
  return (
    <div>
      <div className="bg-black flex justify-center">
        <div className="flex flex-col min-h-screen items-stretch min-w-fit max-w-3xl w-11/12">
          <div className="flex justify-between items-center">
            <Title />
            <Account />
          </div>
          <main className="flex-grow flex bg-black">
            <VeJoeCalculator />
          </main>
          <div className="flex justify-end">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
