import { getCoin } from "@zoralabs/coins-sdk";
import { base } from "viem/chains";
import { useState, useEffect } from "react";

// Define the coin data type based on the response structure
type CoinData = {
  name: string;
  symbol: string;
  description: string | null;
  totalSupply: string;
  marketCap: string | null;
  volume24h: string | null;
  creatorAddress: string;
  createdAt: string;
  uniqueHolders: number;
  mediaContent?: {
    previewImage?: {
      small: string;
      medium: string;
      blurhash?: string;
    };
  };
};

type UseCoinDetailsReturn = {
  coinData: CoinData | null;
  isLoading: boolean;
  error: Error | null;
};

export function useCoinDetails(address: string): UseCoinDetailsReturn {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      if (!address) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await getCoin({
          address,
          chain: base.id,
        });
        console.log(response);

        const coin = response.data?.zora20Token;

        if (coin) {
          setCoinData({
            name: coin.name,
            symbol: coin.symbol,
            description: coin.description,
            totalSupply: coin.totalSupply,
            marketCap: coin.marketCap,
            volume24h: coin.volume24h,
            creatorAddress: coin.creatorAddress || "",
            createdAt: coin.createdAt || "",
            uniqueHolders: coin.uniqueHolders,
            mediaContent: {
              previewImage: coin.mediaContent?.previewImage
            }
          });
        } else {
          throw new Error("Coin data not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch coin details"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoinDetails();
  }, [address]);

  return { coinData, isLoading, error };
}