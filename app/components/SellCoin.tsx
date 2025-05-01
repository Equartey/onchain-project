"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import { parseEther, formatEther, Address } from "viem";
import { tradeCoinCall } from "@zoralabs/coins-sdk";

interface SellCoinProps {
  coinAddress: Address;
}

export default function SellCoin({ coinAddress }: SellCoinProps) {
  const [amount, setAmount] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { address } = useAccount();

  // Generate the contract call parameters for selling a coin
  const sellParams = address
    ? tradeCoinCall({
        direction: "sell",
        target: coinAddress,
        args: {
          recipient: address,
          orderSize: parseEther(amount || "0"),
          // Add a 1% slippage protection
          minAmountOut: (parseEther(amount || "0") * BigInt(99)) / BigInt(100),
        },
      })
    : undefined;

  // Simulate the contract call
  const { data: simulationData, error: simulationError } = useSimulateContract(
    sellParams
      ? {
          address: sellParams.address,
          abi: sellParams.abi,
          functionName: sellParams.functionName,
          args: sellParams.args,
        }
      : undefined
  );

  const { writeContract } = useWriteContract();

  const handleSell = async () => {
    if (!address) {
      setError("Please connect your wallet");
      return;
    }

    if (!sellParams || simulationError) {
      setError("Error preparing transaction. Please try again.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await writeContract(simulationData!.request);
      setSuccess(true);
    } catch (err: any) {
      console.error("Error selling coin:", err);
      setError(err?.message || "Failed to sell coin");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#ededed]">Sell Coins</h2>

      <div className="mb-5">
        <label
          htmlFor="sell-amount"
          className="block text-sm font-medium text-[#ededed] mb-2"
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
            className="block w-full px-3 py-3 border border-[#333333] rounded-md shadow-sm text-[#ededed] placeholder-[#666666] focus:outline-none focus:ring-[#ff8c00] focus:border-[#ff8c00] text-base bg-[#0a0a0a]"
          />
        </div>
      </div>

      <button
        onClick={handleSell}
        disabled={isLoading || !address}
        className={`w-full py-3 px-4 text-lg rounded-md shadow-sm font-bold ${
          isLoading || !address
            ? "bg-[#333333] text-[#666666] cursor-not-allowed"
            : "bg-[#ff8c00] text-[#0a0a0a] hover:bg-[#ff9c20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff8c00]"
        }`}
      >
        {isLoading ? "Processing..." : "SELL COINS"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-[#331111] text-[#ff6666] rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-3 bg-[#113311] text-[#66ff66] rounded-md">
          Transaction successful! You've sold {amount} coins.
        </div>
      )}

      {!address && (
        <div className="mt-4 p-3 bg-[#333311] text-[#ffff66] rounded-md">
          Please connect your wallet to sell coins
        </div>
      )}
    </div>
  );
}
