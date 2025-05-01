import useTopMovers from "../hooks/useTopMovers";


export default function TopMovers() {
    const { coins, loading, error, refetch } = useTopMovers();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="text-center mb-8">
        <button
          onClick={() => refetch()}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Loading...' : 'Fetch Top Movers'}
        </button>

        {coins.length > 0 && (
          <div className="mt-4 max-h-60 overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">Top Movers</h3>
            <div className="grid grid-cols-1 gap-2">
              {coins.map((token, index) => (
                <div
                  key={index}
                  className="p-3 rounded border dark:border-gray-700 border-gray-200"
                >
                  <div className="font-semibold">{token.name} ({token.symbol})</div>
                  <div className="text-sm">
                    24h Change: {parseFloat(token.marketCapDelta24h).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
}