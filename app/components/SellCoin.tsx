'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useSimulateContract } from 'wagmi';
import { parseEther, formatEther, Address } from 'viem';
import { tradeCoinCall } from '@zoralabs/coins-sdk';

interface SellCoinProps {
  coinAddress: Address;
}

export default function SellCoin({ coinAddress }: SellCoinProps) {
  const [amount, setAmount] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { address } = useAccount();
  
  // Generate the contract call parameters for selling a coin
  const sellParams = address
    ? tradeCoinCall({
        direction: 'sell',
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
    sellParams ? {
      address: sellParams.address,
      abi: sellParams.abi,
      functionName: sellParams.functionName,
      args: sellParams.args,
    } : undefined
  );

  const { writeContract } = useWriteContract();

  const handleSell = async () => {
    if (!address) {
      setError('Please connect your wallet');
      return;
    }

    if (!sellParams || simulationError) {
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
      console.error('Error selling coin:', err);
      setError(err?.message || 'Failed to sell coin');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
        Sell Coins
      </h2>
      
      <div className="mb-4">
        <label 
          htmlFor="sell-amount" 
          className="block text-sm font-medium text-black dark:text-white mb-2"
        >
          Coin Amount
        </label>
        <div className="flex items-center">
          <input
            id="sell-amount"
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
        onClick={handleSell}
        disabled={isLoading || !address}
        className={`w-full px-4 py-2 rounded-md shadow-sm text-white font-medium ${
          isLoading || !address
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
        }`}
      >
        {isLoading ? 'Processing...' : 'Sell Coins'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md">
          Transaction successful! You've sold {amount} coins.
        </div>
      )}
      
      {!address && (
        <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
          Please connect your wallet to sell coins
        </div>
      )}
    </div>
  );
} 