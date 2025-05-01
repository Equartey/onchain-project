"use client";

import AppHeader from "@/src/components/AppHeader";
import ArrowSvg from "./svg/ArrowSvg";
import ImageSvg from "./svg/Image";
import OnchainkitSvg from "./svg/OnchainKit";
import TopMovers from "@/src/components/TopMovers";

const components = [
  {
    name: "Transaction",
    url: "https://onchainkit.xyz/transaction/transaction",
  },
  { name: "Swap", url: "https://onchainkit.xyz/swap/swap" },
  { name: "Checkout", url: "https://onchainkit.xyz/checkout/checkout" },
  { name: "Wallet", url: "https://onchainkit.xyz/wallet/wallet" },
  { name: "Identity", url: "https://onchainkit.xyz/identity/identity" },
];

const templates = [
  { name: "NFT", url: "https://github.com/coinbase/onchain-app-template" },
  {
    name: "Commerce",
    url: "https://github.com/coinbase/onchain-commerce-template",
  },
  { name: "Fund", url: "https://github.com/fakepixels/fund-component" },
];

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black">
      <AppHeader />
      <main className="flex-grow flex justify-center">
        <div className="max-w-4xl w-full p-4">
          <div className="flex justify-between space-x-4 mb-8">
            <div className="flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto">
              <TopMovers />
            </div>
            <div className="flex-1 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Section 2</h3>
              <p>Content for section 2</p>
            </div>
            <div className="flex-1 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Section 3</h3>
              <p>Content for section 3</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
