import useTopMovers from "../hooks/useTopMovers";
import TopMoverRow from "./TopMoverRow";
import GenericHomeList from "./GenericHomeList";

export default function TopMovers() {
  const { coins, loading, error, refetch } = useTopMovers();

  return (
    <GenericHomeList
      title="TOP MOVERS"
      loading={loading}
      error={error}
      refetch={refetch}
      hasData={!!coins.length}
    >
      {coins.map((token, index) => (
        <TopMoverRow key={index} coin={token} disabled={loading} />
      ))}
    </GenericHomeList>
  );
}
