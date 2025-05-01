'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Address } from 'viem';
import CoinInfo from './CoinInfo';
import BuyCoin from './BuyCoin';
import SellCoin from './SellCoin';

interface CoinTraderProps {
  coinAddress: Address;
}

export default function CoinTrader({ coinAddress }: CoinTraderProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const { address } = useAccount();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <CoinInfo 
          coinAddress={coinAddress} 
          userAddress={address}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'buy'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
            onClick={() => setActiveTab('buy')}
          >
            Buy Coins
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'sell'
                ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400'
                : 'text-black dark:text-white hover:text-red-600 dark:hover:text-red-400'
            }`}
            onClick={() => setActiveTab('sell')}
          >
            Sell Coins
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'buy' ? (
            <BuyCoin coinAddress={coinAddress} />
          ) : (
            <SellCoin coinAddress={coinAddress} />
          )}
        </div>
      </div>
    </div>
  );
} 