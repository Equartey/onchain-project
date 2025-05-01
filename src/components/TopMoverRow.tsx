import { Button, Tooltip } from "@mui/material";
import { formatNumber } from "@/src/utils/format";
import { Token } from "@/src/hooks/useTopMovers";

interface TopMoverRowProps {
  coin: Token;
  disabled?: boolean;
}

export default function TopMoverRow({ coin, disabled }: TopMoverRowProps) {
  //   const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/coin/${coin.id}`);
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
              ${formatNumber(coin.marketCapDelta24h)}
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
