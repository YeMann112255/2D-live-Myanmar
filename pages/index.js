import useSWR from 'swr';
const fetcher = url => fetch(url).then(r => r.json());

export default function Home() {
  const { data, error } = useSWR('/api/2d', fetcher, { refreshInterval: 15000 });

  if (error) return <div>❌ Failed to load</div>;
  if (!data) return <div>⏳ Loading...</div>;

  return (
    <main style={{ fontFamily: 'system-ui', textAlign: 'center', padding: '32px' }}>
      <h1>Myanmar 2D Live</h1>
      <p>SET Index: <b>{data.setIndex}</b></p>
      <p>Value (M.Baht): <b>{data.value}</b></p>
      <h2>🎯 2D Result: {data.result2D}</h2>
      <small>Updated: {new Date(data.at).toLocaleString()}</small>
    </main>
  );
}
