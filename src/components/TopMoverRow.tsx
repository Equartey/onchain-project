import { Token } from "@/src/hooks/useTopMovers";
import { Tooltip, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface TopMoverRowProps {
  coin: Token;
  disabled: boolean;
}

export default function TopMoverRow({ coin, disabled }: TopMoverRowProps) {
  const isPositive = parseFloat(coin.marketCapDelta24h) >= 0;
  const percentChange = parseFloat(coin.marketCapDelta24h).toFixed(2);
  const bgColor = isPositive ? "bg-green-100" : "bg-red-50";
  const textColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <div
      className={`py-2 px-3 rounded-lg border transition-colors ${
        disabled ? "opacity-50" : ""
      } ${bgColor}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left">
          <div className="text-lg font-bold">{coin.symbol}</div>
          <div className="text-xs text-gray-600">{coin.name}</div>
        </div>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUpIcon className={`${textColor} text-lg`} />
          ) : (
            <TrendingDownIcon className={`${textColor} text-lg`} />
          )}
          <Tooltip title="24-hour price change">
            <Box
              component="span"
              className={`font-semibold ${textColor} text-sm`}
            >
              {percentChange}%
            </Box>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
