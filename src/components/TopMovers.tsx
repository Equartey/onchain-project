import useTopMovers from "../hooks/useTopMovers";
import { IconButton, Tooltip, CircularProgress, Box } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import TopMoverRow from "./TopMoverRow";

export default function TopMovers() {
  const { coins, loading, error, refetch } = useTopMovers();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold mb-2 items-center flex gap-2">
          <span>Top Movers</span>
          {loading && <CircularProgress size={20} />}
        </h3>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Refresh data">
            <IconButton
              onClick={() => refetch()}
              disabled={loading}
              size="small"
              color="primary"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </div>
      {!coins.length && loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!coins.length && !loading && (
        <div className="mt-4 max-h-60 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            <div className="text-center text-gray-500">No data</div>
          </div>
        </div>
      )}
      {!!coins.length && (
        <div className="mt-4 max-h-60 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {coins.map((token, index) => (
              <TopMoverRow key={index} coin={token} disabled={loading} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
