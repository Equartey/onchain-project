"use client";
import TopMovers from "@/src/components/TopMovers";
import TopVolume from "@/src/components/TopVolume";
import MostValuable from "@/src/components/MostValuable";
import CoinOfTheDayBanner from "@/src/components/CoinOfTheDayBanner"; // Add this import

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#0a0a0a] text-[#ededed]">
      <main className="flex-grow flex justify-center">
        <div className="max-w-4xl w-full p-4 flex flex-col gap-4">
          {/* Add the Coin of the Day Banner */}
          <CoinOfTheDayBanner />

          <div className="flex justify-between space-x-4 mb-8 gap-4">
            <div className="flex-1 bg-[#1a1a1a] p-4 rounded-lg overflow-y-auto">
              <TopMovers />
            </div>
            <div className="flex-1 bg-[#1a1a1a] p-4 rounded-lg overflow-y-auto">
              <TopVolume />
            </div>
            <div className="flex-1 bg-[#1a1a1a] p-4 rounded-lg overflow-y-auto">
              <MostValuable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
