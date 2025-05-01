import { getCoinsTopVolume24h } from "@zoralabs/coins-sdk";
import { useEffect, useState } from "react";
import { Token } from "./useTopMovers"; // Reuse the Token interface

interface TopVolumeResponse {
  data?: {
    exploreList?: {
      edges?: Array<{ node: Token }>;
      pageInfo?: {
        endCursor?: string;
      };
    };
  };
}

export default function useTopVolume() {
  const [coins, setCoins] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await fetchTopVolumeCoins();
      setCoins(
        response.data?.exploreList?.edges?.map((edge) => edge.node) || []
      );
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return { coins, loading, error, refetch: fetchCoins };
}

async function fetchTopVolumeCoins(): Promise<TopVolumeResponse> {
  const response = await getCoinsTopVolume24h({
    count: 10,
    after: undefined,
  });

  const tokens = response.data?.exploreList?.edges?.map(
    (edge: { node: Token }) => edge.node
  );

  console.log(`Top Volume Coins (${tokens?.length || 0} coins):`);
  
  tokens?.forEach((coin: Token, index: number) => {
    console.log(`${index + 1}. ${coin.name} (${coin.symbol})`);
    console.log(`   Volume 24h: ${coin.volume24h}`);
    console.log(`   Market Cap: ${coin.marketCap}`);
    console.log('-----------------------------------');
  });
  
  if (response.data?.exploreList?.pageInfo?.endCursor) {
    console.log("Next page cursor:", response.data?.exploreList?.pageInfo?.endCursor);
  }
  
  return response;
}