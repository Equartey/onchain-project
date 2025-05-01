import { Button, Tooltip } from "@mui/material";
import { formatNumber } from "@/src/utils/format";
import { Token } from "@/src/hooks/useTopVolume";
import { Address } from "viem";
import { useRouter } from "next/navigation";

interface TopVolumeRowProps {
  coin: Token;
  disabled?: boolean;
}

export default function TopVolumeRow({ coin, disabled }: TopVolumeRowProps) {
  const router = useRouter();

  // Use the coin's address directly from the API, or ID as fallback
  const addressFromAPI = (coin as any).address;
  const idFromAPI = coin.id;
  // For safety, convert the ID to a valid Ethereum address format if needed
  const fallbackAddress =
    idFromAPI && idFromAPI.startsWith("0x")
      ? idFromAPI.substring(0, 42)
      : `0x${coin.symbol.toLowerCase().padEnd(40, "0")}`;

  const coinAddress = (addressFromAPI || fallbackAddress) as Address;

  // Debug the coin address
  console.log("TopVolumeRow coin:", coin);
  console.log("Using coinAddress:", coinAddress);
  console.log("Coin ID:", idFromAPI);

  const handleClick = () => {
    if (!disabled) {
      router.push(`/coin/${coinAddress}`);
    }
  };

  return (
    <Tooltip title={`View ${coin.name} details`}>
      <Button
        onClick={handleClick}
        disabled={disabled}
        fullWidth
        sx={{
          textTransform: "none",
          justifyContent: "flex-start",
          padding: "8px 16px",
          borderBottom: "1px solid #333333",
          borderRadius: 0,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
          },
          "&:disabled": {
            color: "#666666",
          },
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="text-left">
              <div className="font-mono font-bold text-[#ff8c00]">
                {coin.symbol.toUpperCase()}
              </div>
              <div className="text-xs text-gray-400">{coin.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono font-bold text-[#ff8c00]">
              ${formatNumber(coin.volume24h)}
            </div>
            <div className="text-xs text-[#00ff00]">
              Vol: {formatNumber(coin.volume24h)}
            </div>
          </div>
        </div>
      </Button>
    </Tooltip>
  );
}
