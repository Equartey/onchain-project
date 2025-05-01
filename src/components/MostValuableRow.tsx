import { TokenWithDate } from "../hooks/useValuableCoins";

interface MostValuableRowProps {
  coin: TokenWithDate;
  disabled?: boolean;
}

export default function MostValuableRow({ coin, disabled }: MostValuableRowProps) {
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
            Created: {coin.createdAt || "Not available"}
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-green-600">
            Market Cap: ${parseFloat(coin.marketCap).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            Volume: ${parseFloat(coin.volume24h).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}