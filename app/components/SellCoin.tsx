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
      
      <div className="mb-5">
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
            className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm text-black dark:text-white placeholder-black focus:outline-none focus:ring-black focus:border-black text-base bg-white dark:bg-gray-800"
          />
        </div>
      </div>
      
      <button
        onClick={handleSell}
        disabled={isLoading || !address}
        className={`w-full py-3 px-4 text-lg rounded-md shadow-sm font-bold ${
          isLoading || !address
            ? 'bg-gray-400 text-white cursor-not-allowed' 
            : 'bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-100'
        }`}
      >
        {isLoading ? 'Processing...' : 'SELL COINS'}
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