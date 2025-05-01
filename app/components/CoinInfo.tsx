'use client';

import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { formatEther, Address } from 'viem';

// Mock ABI for basic ERC20 functions
const erc20ABI = [
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

interface CoinInfoProps {
  coinAddress: Address;
  userAddress?: Address;
}

interface CoinData {
  name: string;
  symbol: string;
  totalSupply: string;
  userBalance: string;
}

export default function CoinInfo({ coinAddress, userAddress }: CoinInfoProps) {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchCoinData = async () => {
      if (!coinAddress || !publicClient) return;
      
      try {
        setLoading(true);
        
        const [name, symbol, totalSupply, userBalance] = await Promise.all([
          publicClient.readContract({
            address: coinAddress,
            abi: erc20ABI,
            functionName: 'name',
          }),
          publicClient.readContract({
            address: coinAddress,
            abi: erc20ABI,
            functionName: 'symbol',
          }),
          publicClient.readContract({
            address: coinAddress,
            abi: erc20ABI,
            functionName: 'totalSupply',
          }),
          userAddress ? publicClient.readContract({
            address: coinAddress,
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [userAddress],
          }) : BigInt(0),
        ]);

        setCoinData({
          name: name as string,
          symbol: symbol as string,
          totalSupply: formatEther(totalSupply as bigint),
          userBalance: formatEther(userBalance as bigint),
        });
      } catch (err) {
        console.error('Error fetching coin data:', err);
        setError('Failed to load coin data');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinAddress, userAddress, publicClient]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        {coinData?.name} ({coinData?.symbol})
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
          <h3 className="text-sm text-black dark:text-white">Total Supply</h3>
          <p className="text-lg font-semibold text-black dark:text-white">
            {coinData?.totalSupply} {coinData?.symbol}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm text-black dark:text-white">Your Balance</h3>
          <p className="text-lg font-semibold text-black dark:text-white">
            {coinData?.userBalance} {coinData?.symbol}
          </p>
        </div>
      </div>
    </div>
  );
} 