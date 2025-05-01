import { GetCoinResponse, getCoinsTopGainers } from "@zoralabs/coins-sdk";
import { useEffect } from "react";
import { useState } from "react";

export type Token = NonNullable<GetCoinResponse["zora20Token"]>;

export default function useTopMovers() {
  const [coins, setCoins] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await getCoinsTopGainers({
        count: 10, // Optional: number of coins per page
        after: undefined, // Optional: for pagination
      });
      
      // Debug the raw API response
      console.log('getCoinsTopGainers API response:', response);
      
      const tokens = response.data?.exploreList?.edges
        ?.map((edge) => {
          const node = edge?.node;
          if (node) {
            // Log each token to inspect its structure
            console.log('Coin data object structure:', node);
            // Check for the contract address field
            console.log('Contract address fields:', {
              address: node.address,
              contractAddress: node.contractAddress,
              tokenAddress: node.tokenAddress,
              creatorAddress: node.creatorAddress
            });
          }
          return node;
        })
        .filter(Boolean) as Token[];
      
      setCoins(tokens);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching top movers:', error);
      setError(error as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return { coins, loading, error, refetch: fetchCoins };
}
