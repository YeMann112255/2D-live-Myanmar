import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/2d", fetcher, { refreshInterval: 10000 });

  if (error) return <div className="error">❌ Error loading data</div>;
  if (!data) return <div className="loading">⏳ Loading...</div>;

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "30px" }}>
      <h1>📊 Myanmar 2D Live Result</h1>
      <div style={{ fontSize: "20px", margin: "10px" }}>
        <strong>SET Index:</strong> {data.setIndex}
      </div>
      <div style={{ fontSize: "20px", margin: "10px" }}>
        <strong>Value:</strong> {data.value}
      </div>
      <div style={{ fontSize: "30px", marginTop: "20px", color: "green" }}>
        🎯 <strong>2D Result:</strong> {data.result2D}
      </div>
      <p style={{ marginTop: "40px", fontSize: "14px", color: "gray" }}>
        Auto refresh every 10s
      </p>
    </div>
  );
}
