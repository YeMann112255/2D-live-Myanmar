import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/2d", fetcher, { refreshInterval: 10000 });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Myanmar 2D Live Result</h1>
      <p><strong>SET:</strong> {data.set}</p>
      <p><strong>Value:</strong> {data.value}</p>
      <p><strong>2D Result:</strong> {data.result}</p>
    </div>
  );
}
