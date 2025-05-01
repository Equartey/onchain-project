import { useEffect, useState } from "react";
import useTopVolume from "../hooks/useTopVolume"; // Changed from useTopMovers
import { formatNumber } from "@/src/utils/format";
import { CircularProgress, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Token } from "../hooks/useTopVolume"; // Changed from useTopMovers

export default function CoinOfTheDayBanner() {
  const { coins, loading, error } = useTopVolume(); // Changed from useTopMovers
  const [coinOfDay, setCoinOfDay] = useState<Token | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (coins && coins.length > 0) {
      // Select a random coin from top volume
      const randomIndex = Math.floor(Math.random() * Math.min(10, coins.length));
      setCoinOfDay(coins[randomIndex]);
    }
  }, [coins]);

  const handleViewDetails = () => {
    if (coinOfDay) {
      router.push(`/coin/${coinOfDay.address}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-[#222222] p-4 rounded-lg mb-8 flex justify-center">
        <CircularProgress size={30} sx={{ color: "#ff8c00" }} />
      </div>
    );
  }

  if (error || !coinOfDay) {
    return null; // Hide banner on error or if coin isn't available
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#222222] to-[#111111] p-6 rounded-lg mb-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <div className="text-xs uppercase tracking-wider text-[#ff8c00] font-bold mb-2">
            COIN OF THE DAY
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {coinOfDay.name} ({coinOfDay.symbol.toUpperCase()})
          </h2>
          <div className="flex space-x-4 text-sm">
            <div className="text-[#00ff00]">
              24h Change: {formatNumber(coinOfDay.marketCapDelta24h || "0")}%
            </div>
            <div className="text-gray-300">
              Market Cap: ${formatNumber(coinOfDay.marketCap)}
            </div>
            <div className="text-gray-300">
              Volume: ${formatNumber(coinOfDay.volume24h)}
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleViewDetails}
          variant="contained"
          sx={{
            backgroundColor: "#ff8c00",
            "&:hover": { backgroundColor: "#ff9c20" },
            fontWeight: "bold",
          }}
        >
          Trade Now
        </Button>
      </div>
    </div>
  );
}