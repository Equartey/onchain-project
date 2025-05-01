import { Token } from "../hooks/useTopMovers";

interface TopVolumeRowProps {
  coin: Token;
  disabled?: boolean;
}

export default function TopVolumeRow({ coin, disabled }: TopVolumeRowProps) {
  return (
    <div
      className={`p-3 rounded border border-gray-200 hover:bg-gray-50 transition-colors ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">
            {coin.name} ({coin.symbol})
          </div>
          <div className="text-sm text-gray-600">
            Market Cap: ${parseFloat(coin.marketCap).toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-purple-600">
            Volume: ${parseFloat(coin.volume24h).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}