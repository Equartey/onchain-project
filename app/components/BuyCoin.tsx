'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useSimulateContract } from 'wagmi';
import { parseEther, formatEther, Address } from 'viem';
import { tradeCoinCall } from '@zoralabs/coins-sdk';

interface BuyCoinProps {
  coinAddress: Address;
}

export default function BuyCoin({ coinAddress }: BuyCoinProps) {
  const [amount, setAmount] = useState<string>('0.01');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { address } = useAccount();
  
  // Generate the contract call parameters for buying a coin
  const buyParams = address
    ? tradeCoinCall({
        direction: 'buy',
        target: coinAddress,
        args: {
          recipient: address,
          orderSize: parseEther(amount || '0'),
          // Add a 1% slippage protection
          minAmountOut: parseEther(amount || '0') * BigInt(99) / BigInt(100),
        }
      })
    : undefined;

  // Simulate the contract call
  const { data: simulationData, error: simulationError } = useSimulateContract(
    buyParams ? {
      address: buyParams.address,
      abi: buyParams.abi,
      functionName: buyParams.functionName,
      args: buyParams.args,
    } : undefined
  );

  const { writeContract } = useWriteContract();

  const handleBuy = async () => {
    if (!address) {
      setError('Please connect your wallet');
      return;
    }

    if (!buyParams || simulationError) {
      setError('Error preparing transaction. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await writeContract(simulationData!.request);
      setSuccess(true);
    } catch (err: any) {
      console.error('Error buying coin:', err);
      setError(err?.message || 'Failed to buy coin');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
        Buy Coins
      </h2>
      
      <div className="mb-4">
        <label 
          htmlFor="buy-amount" 
          className="block text-sm font-medium text-black dark:text-white mb-2"
        >
          ETH Amount
        </label>
        <div className="flex items-center">
          <input
            id="buy-amount"
            type="number"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      
      <button
        onClick={handleBuy}
        disabled={isLoading || !address}
        className={`w-full px-4 py-2 rounded-md shadow-sm text-white font-medium ${
          isLoading || !address
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {isLoading ? 'Processing...' : 'Buy Coins'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md">
          Transaction successful! You've bought {amount} ETH worth of coins.
        </div>
      )}
      
      {!address && (
        <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
          Please connect your wallet to buy coins
        </div>
      )}
    </div>
  );
} 