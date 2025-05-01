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
      setCoins(
        response.data?.exploreList?.edges
          ?.map((edge) => edge?.node)
          .filter(Boolean) as Token[]
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
