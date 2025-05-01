import { GetCoinResponse, getCoinsTopVolume24h } from "@zoralabs/coins-sdk";
import { useEffect } from "react";
import { useState } from "react";

export type Token = NonNullable<GetCoinResponse["zora20Token"]>;

export default function useTopVolume() {
  const [coins, setCoins] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await getCoinsTopVolume24h({
        count: 10, // Optional: number of coins per page
        after: undefined, // Optional: for pagination
      });
      
      console.log('Top Volume API response:', response);
      
      const tokens = response.data?.exploreList?.edges
        ?.map((edge) => {
          const node = edge?.node;
          if (node) {
            // Log each token to inspect its structure
            console.log('Top Volume node:', node);
            // Log properties needed for navigation
            console.log('Navigation properties:', {
              id: node.id,
              symbol: node.symbol,
              address: node.address,
              contractAddress: (node as any).contractAddress,
              tokenAddress: (node as any).tokenAddress,
            });
          }
          return node;
        })
        .filter(Boolean) as Token[];
      
      setCoins(tokens);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching top volume coins:', error);
      setError(error as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return { coins, loading, error, refetch: fetchCoins };
}
