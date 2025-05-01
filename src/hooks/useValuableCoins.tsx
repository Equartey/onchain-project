import { getCoinsMostValuable, ExploreResponse } from "@zoralabs/coins-sdk";
import { useEffect, useState } from "react";
import { Token } from "./useTopMovers";

// Make createdAt optional in the interface
export interface TokenWithDate extends Token {
  createdAt?: string;
}

export default function useValuableCoins() {
  const [coins, setCoins] = useState<TokenWithDate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await fetchMostValuableCoins();
      // Extract tokens from response and handle optional createdAt
      const tokens = response.data?.exploreList.edges.map(edge => ({
        ...edge.node,
        createdAt: edge.node.createdAt || "Not available", // Provide fallback value
      })) || [];
      setCoins(tokens);
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

// Use the SDK's native type instead of our custom one
async function fetchMostValuableCoins(): Promise<ExploreResponse> {
  const response = await getCoinsMostValuable({
    count: 10,
    after: undefined,
  });

  console.log(`Most Valuable Coins (${response.data?.exploreList.edges.length || 0} coins):`);
  
  response.data?.exploreList.edges.forEach((edge, index) => {
    console.log(`${index + 1}. ${edge.node.name} (${edge.node.symbol})`);
    console.log(`   Market Cap: ${edge.node.marketCap}`);
    console.log(`   Volume 24h: ${edge.node.volume24h}`);
    console.log(`   Created: ${edge.node.createdAt || "Not available"}`);
    console.log('-----------------------------------');
  });
  
  if (response.data?.exploreList.pageInfo.endCursor) {
    console.log("Next page cursor:", response.data.exploreList.pageInfo.endCursor);
  }
  
  return response;
}