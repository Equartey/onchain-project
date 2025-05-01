"use client";

import { usePublicClient } from "wagmi";
import { formatEther, Address } from "viem";
import { useCoinDetails } from "../../src/hooks/useCoinDetails";
import { useEffect, useState } from "react";

interface CoinInfoProps {
  coinAddress: Address;
  userAddress?: Address;
}

export default function CoinInfo({ coinAddress, userAddress }: CoinInfoProps) {
  const {
    coinData: zoraData,
    isLoading: zoraLoading,
    error: zoraError,
  } = useCoinDetails(coinAddress);
  const [userBalance, setUserBalance] = useState<string>("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!userAddress || !publicClient || !coinAddress) return;

      try {
        const balance = await publicClient.readContract({
          address: coinAddress,
          abi: [
            {
              inputs: [
                { internalType: "address", name: "account", type: "address" },
              ],
              name: "balanceOf",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "balanceOf",
          args: [userAddress],
        });

        setUserBalance(formatEther(balance as bigint));
      } catch (err) {
        console.error("Error fetching user balance:", err);
        setError("Failed to load balance");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBalance();
  }, [coinAddress, userAddress, publicClient]);

  if (zoraLoading || loading) {
    return (
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-[#333333] rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-[#333333] rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-[#333333] rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-[#333333] rounded w-1/4 mb-2"></div>
      </div>
    );
  }

  if (zoraError || error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="text-red-500">{zoraError?.message || error}</div>
      </div>
    );
  }

  if (!zoraData) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="text-red-500">No coin data found</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-gray-50">
        {zoraData.name} ({zoraData.symbol})
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
          <h3 className="text-sm font-medium text-black dark:text-gray-50">
            Total Supply
          </h3>
          <p className="text-lg font-semibold text-black dark:text-gray-50">
            {zoraData.totalSupply} {zoraData.symbol}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-black dark:text-gray-50">
            Your Balance
          </h3>
          <p className="text-lg font-semibold text-black dark:text-gray-50">
            {userBalance} {zoraData.symbol}
          </p>
        </div>

        {zoraData.description && (
          <div className="col-span-2 mt-4">
            <h3 className="text-sm font-medium text-black dark:text-gray-50">
              Description
            </h3>
            <p className="text-sm text-black dark:text-gray-300 font-bold">
              {zoraData.description}
            </p>
          </div>
        )}

        <div className="col-span-2 mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-black dark:text-gray-50">
              Market Cap
            </h3>
            <p className="text-sm text-black dark:text-gray-300 font-bold">
              {zoraData.marketCap || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-black dark:text-gray-50">
              24h Volume
            </h3>
            <p className="text-sm text-black dark:text-gray-300 font-bold">
              {zoraData.volume24h || "N/A"}
            </p>
          </div>
        </div>

        {zoraData.mediaContent?.previewImage?.medium && (
          <div className="col-span-2 mt-4">
            <img
              src={zoraData.mediaContent.previewImage.medium}
              alt={`${zoraData.name} preview`}
              className="rounded-lg w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
