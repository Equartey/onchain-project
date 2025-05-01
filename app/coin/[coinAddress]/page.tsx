'use client';

import { Address } from 'viem';
import CoinTrader from '@/app/components/CoinTrader';

interface CoinPageProps {
  params: {
    coinAddress: string;
  };
}

export default function CoinPage({ params }: CoinPageProps) {
  // Convert the coinAddress string to a valid Address type
  const coinAddress = params.coinAddress as Address;

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Coin Trading
      </h1>
      
      <CoinTrader coinAddress={coinAddress} />
    </main>
  );
} 