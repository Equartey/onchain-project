import { Button, Tooltip } from "@mui/material";
import { formatNumber } from "@/src/utils/format";
import { Token } from "@/src/hooks/useTopVolume";
import Link from "next/link";
import { Address } from "viem";
import { useRouter } from "next/navigation";

interface TopVolumeRowProps {
  coin: Token;
  disabled?: boolean;
}

export default function TopVolumeRow({
  coin,
  disabled,
}: TopVolumeRowProps) {
  const router = useRouter();
  
  // Use the coin's address directly from the API, or ID as fallback
  const addressFromAPI = (coin as any).address;
  const idFromAPI = coin.id;
  // For safety, convert the ID to a valid Ethereum address format if needed
  const fallbackAddress = idFromAPI && idFromAPI.startsWith('0x') 
    ? idFromAPI.substring(0, 42) 
    : `0x${coin.symbol.toLowerCase().padEnd(40, '0')}`;
  
  const coinAddress = (addressFromAPI || fallbackAddress) as Address;
  
  // Debug the coin address
  console.log('TopVolumeRow coin:', coin);
  console.log('Using coinAddress:', coinAddress);
  console.log('Coin ID:', idFromAPI);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      const path = `/coin/${coinAddress}`;
      console.log('Navigating to:', path);
      router.push(path);
    }
  };

  // Create a simple div with onClick for direct navigation instead of using Link
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <div
        className={`p-3 rounded border border-gray-700 hover:bg-gray-800 transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold text-[#ff8c00]">
              {coin.symbol.toUpperCase()} - {coin.name}
            </div>
            <div className="text-sm text-gray-400">
              Click to view details
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-[#00ff00]">
              Volume: ${formatNumber(coin.volume24h)}
            </div>
            <div className="text-xs text-gray-300">
              Address: {coinAddress.substring(0, 10)}...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}