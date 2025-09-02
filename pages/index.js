import useSWR from "swr";
const fetcher = (url) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/2d", fetcher, { refreshInterval: 10000 });

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading…</div>;

  const { live, history } = data;
  return (
    <div style={{ textAlign: "center", padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Myanmar 2D Live</h1>
      <p>SET Index: {live.setIndex.toFixed(2)}</p>
      <p>Value (M.Baht): {live.valueMB.toFixed(2)}</p>
      <h2>Current 2D: {live.now2D}</h2>

      <hr style={{ margin: "20px 0" }}/>

      <h3>Historical 2D Results</h3>
      <div>
        <p>
          <strong>12:01 AM</strong>: {history["00:01"] ?? "—"}
        </p>
        <p>
          <strong>4:30 PM</strong>: {history["16:30"] ?? "—"}
        </p>
      </div>
    </div>
  );
}
