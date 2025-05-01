import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import useTopVolume from "../hooks/useTopVolume";
import TopMoverRow from "./TopMoverRow";
import GenericHomeList from "./GenericHomeList";

export default function TopVolume() {
  const { coins, loading, error, refetch } = useTopVolume();

  return (
    <GenericHomeList
      title="TOP VOLUME"
      loading={loading}
      error={error}
      refetch={refetch}
      hasData={!!coins.length}
    >
      {coins.map((coin) => (
        <TopMoverRow key={coin.id} coin={coin} disabled={loading} />
      ))}
    </GenericHomeList>
  );
}
