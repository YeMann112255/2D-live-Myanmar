import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // fetch every 5s
    return () => clearInterval(interval);
  }, []);

  // Countdown for next update
  useEffect(() => {
    if (data?.result?.length > 0) {
      const nextTime = new Date(`${data.live.date} ${data.result[data.result.length - 1].open_time}`);
      const timer = setInterval(() => {
        const diff = nextTime - new Date();
        if (diff > 0) {
          const mins = Math.floor(diff / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          setCountdown(`${mins}m ${secs}s`);
        } else setCountdown("Waiting...");
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/live');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="container">
      <div className="loading">
        <div className="spinner"></div>
        <p>လက်ရှိထွက်ဂဏန်းများ ရယူနေသည်...</p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <Head>
        <title>ThaiStock 2D - Live Results</title>
      </Head>

      {/* Live Box */}
      <div className="live-box">
        <h2>LIVE RESULT</h2>
        <div className="live-number">{data?.live?.twod || "--"}</div>
        <p className="live-time">Updated: {data?.live?.time}</p>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {data?.result?.map((r, idx) => (
          <div key={idx} className={`result-box ${idx === data.result.length - 1 ? "latest" : ""}`}>
            <div className="time">{r.open_time}</div>
            <div className="row">
              <span className="label">Set</span>
              <span>{r.set}</span>
            </div>
            <div className="row">
              <span className="label">Value</span>
              <span>{r.value}</span>
            </div>
            <div className="row highlight">
              <span className="label">2D</span>
              <span className="number">{r.twod}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Countdown */}
      <div className="refresh-info">
        🔄 Next update in: {countdown}
      </div>
    </div>
  );
}
