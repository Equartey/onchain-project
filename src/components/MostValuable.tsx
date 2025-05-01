import useMostValuable from "../hooks/useMostValuable";
import GenericHomeList from "./GenericHomeList";
import MostValuableRow from "./MostValuableRow";

export default function MostValuable() {
  const { coins, loading, error, refetch } = useMostValuable();

  return (
    <GenericHomeList
      title="MOST VALUABLE"
      loading={loading}
      error={error}
      refetch={refetch}
      hasData={!!coins.length}
    >
      {coins.map((coin) => (
        <MostValuableRow key={coin.id} coin={coin} disabled={loading} />
      ))}
    </GenericHomeList>
  );
}
