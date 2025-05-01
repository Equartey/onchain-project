import { Button, Tooltip } from "@mui/material";
import { formatNumber } from "@/src/utils/format";
import { Token } from "@/src/hooks/useMostValuable";
import Link from "next/link";
import { Address } from "viem";

interface MostValuableRowProps {
  coin: Token;
  disabled?: boolean;
}

export default function MostValuableRow({
  coin,
  disabled,
}: MostValuableRowProps) {
  // Use the coin's address directly from the API
  // If it's not available, we'll use the symbol as a fallback
  const coinAddress = (coin.address || `0x${coin.symbol.toLowerCase().padEnd(40, '0')}`) as Address;

  return (
    <Tooltip title={`View ${coin.name} details`}>
      <Link href={`/coin/${coinAddress}`} style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
        <Button
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
                ${formatNumber(coin.marketCap)}
              </div>
              <div className="text-xs text-[#00ff00]">
                Vol: {formatNumber(coin.volume24h)}
              </div>
            </div>
          </div>
        </Button>
      </Link>
    </Tooltip>
  );
}
