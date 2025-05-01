"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import CoinInfo from "./CoinInfo";
import BuyCoin from "./BuyCoin";
import SellCoin from "./SellCoin";

interface CoinTraderProps {
  coinAddress: Address;
}

export default function CoinTrader({ coinAddress }: CoinTraderProps) {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const { address } = useAccount();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <CoinInfo coinAddress={coinAddress} userAddress={address} />
      </div>

      <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#333333]">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium text-[#ededed] ${
              activeTab === "buy"
                ? "border-b-2 border-[#ff8c00]"
                : "hover:border-b-2 hover:border-[#ff8c00]"
            }`}
            onClick={() => setActiveTab("buy")}
          >
            Buy Coins
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium text-[#ededed] ${
              activeTab === "sell"
                ? "border-b-2 border-[#ff8c00]"
                : "hover:border-b-2 hover:border-[#ff8c00]"
            }`}
            onClick={() => setActiveTab("sell")}
          >
            Sell Coins
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "buy" ? (
            <BuyCoin coinAddress={coinAddress} />
          ) : (
            <SellCoin coinAddress={coinAddress} />
          )}
        </div>
      </div>
    </div>
  );
}
