import { getCoinsTopGainers } from "@zoralabs/coins-sdk";

interface Token {
  name: string;
  symbol: string;
  marketCapDelta24h: string;
  marketCap: string;
  volume24h: string;
}

interface TopGainersResponse {
  data?: {
    exploreList?: {
      edges?: Array<{ node: Token }>;
      pageInfo?: {
        endCursor?: string;
      };
    };
  };
}

export async function fetchTopGainers(): Promise<TopGainersResponse> {
  const response = await getCoinsTopGainers({
    count: 10,        // Optional: number of coins per page
    after: undefined, // Optional: for pagination
  });

  const tokens = response.data?.exploreList?.edges?.map((edge) => edge.node);
  
  console.log(`Top Gainers (${tokens?.length || 0} coins):`);
  
  tokens?.forEach((coin, index) => {
    const percentChange = coin.marketCapDelta24h 
      ? `${parseFloat(coin.marketCapDelta24h).toFixed(2)}%` 
      : "N/A";
    
    console.log(`${index + 1}. ${coin.name} (${coin.symbol})`);
    console.log(`   24h Change: ${percentChange}`);
    console.log(`   Market Cap: ${coin.marketCap}`);
    console.log(`   Volume 24h: ${coin.volume24h}`);
    console.log('-----------------------------------');
  });
  
  // For pagination
  if (response.data?.exploreList?.pageInfo?.endCursor) {
    console.log("Next page cursor:", response.data?.exploreList?.pageInfo?.endCursor);
  }
  
  return response;
}