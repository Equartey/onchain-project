import { formatNumber } from "@/src/utils/format";
import { CircularProgress, Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import useTopMovers from "../hooks/useTopMovers";

export default function CoinOfTheDayBanner() {
  const { coins, loading, error } = useTopMovers();
  const router = useRouter();

  const randomIndex = Math.floor(Math.random() * Math.min(10, coins.length));
  const coinOfDay = coins[randomIndex];

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
          <div className="flex space-x-4 text-sm gap-2">
            <div className="text-[#00ff00] p-2 rounded-lg bg-[#111111]">
              24h Change: {formatNumber(coinOfDay.marketCapDelta24h) || "0"}%
            </div>
            <div className="text-gray-300 p-2 rounded-lg bg-[#111111]">
              Market Cap: ${formatNumber(coinOfDay.marketCap)}
            </div>
            <div className="text-gray-300 p-2 rounded-lg bg-[#111111]">
              Volume: {formatNumber(coinOfDay.volume24h)}
            </div>
          </div>
        </div>
        <Link
          onClick={handleViewDetails}
          className={`px-4 py-3 rounded-lg transition-colors duration-200 bg-[#ff8c00] text-[#0a0a0a] hover:bg-[#ff9c20] font-bold no-underline`}
        >
          <span className="text-[#0a0a0a] font-bold">Trade Now</span>
        </Link>
      </div>
    </div>
  );
}
