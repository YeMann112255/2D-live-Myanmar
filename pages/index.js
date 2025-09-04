import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

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
      <style jsx>{`
        .container { text-align:center; padding:50px; font-family:'Pyidaungsu', sans-serif; }
        .spinner { border:4px solid rgba(0,0,0,0.1); border-top:4px solid #0077b6; border-radius:50%; width:60px; height:60px; animation:spin 1s linear infinite; margin:0 auto 20px; }
        @keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
      `}</style>
    </div>
  );

  return (
    <div className="container">
      <Head>
        <title>ThaiStock 2D - Live Results</title>
      </Head>

      <header className="header">
        <h1>ThaiStock 2D Myanmar</h1>
        <div className="current-time">🕒 {new Date().toLocaleTimeString('my-MM')}</div>
      </header>

      <div className="live-box">
        <h2>LIVE RESULT</h2>
        <div className="live-number">{data?.live?.twod || "--"}</div>
        <div className="set-value">Set: {data?.live?.set || "--"}, Value: {data?.live?.value || "--"}</div>
        <p className="live-time">Updated: {data?.live?.time}</p>
      </div>

      <div className="results-grid">
        {data?.result?.map((r, idx) => (
          <div key={idx} className={`result-box ${idx === data.result.length - 1 ? "latest" : ""}`}>
            <div className="time">{r.open_time}</div>
            <div className="row">
              <span className="label">Set</span><span>{r.set}</span>
            </div>
            <div className="row">
              <span className="label">Value</span><span>{r.value}</span>
            </div>
            <div className="row highlight">
              <span className="label">2D</span><span className="number">{r.twod}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="refresh-info">🔄 Next update in: {countdown}</div>

      {/* Styled JSX */}
      <style jsx>{`
        .container { max-width:500px; margin:auto; padding:20px; font-family:'Pyidaungsu', sans-serif; }
        .header { text-align:center; padding:15px; margin-bottom:20px; border-bottom:2px solid #00b4d8; }
        .header h1 { font-size:2em; color:#00b4d8; font-weight:bold; }
        .current-time { font-size:1.1em; color:#555; }

        .live-box { background:#fff; color:#222; text-align:center; padding:25px; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); margin-bottom:25px; }
        .live-box h2 { font-size:1.5em; margin-bottom:10px; color:#0077b6; }
        .live-number { font-size:4em; font-weight:bold; color:#d62828; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% {transform:scale(1);} 50% {transform:scale(1.05);} }
        .set-value { font-size:1.2em; margin:10px 0; }
        .live-time { font-size:0.9em; color:#555; }

        .results-grid { display:grid; grid-template-columns:1fr 1fr; gap:15px; }
        .result-box { background:#fff; color:#222; padding:20px; border-radius:10px; box-shadow:0 3px 8px rgba(0,0,0,0.1); transition:0.3s; }
        .result-box:hover { transform:translateY(-3px); box-shadow:0 6px 15px rgba(0,0,0,0.15);}
        .result-box.latest { border:2px solid #06d6a0; animation: glow 1.5s infinite alternate; }
        @keyframes glow { from {box-shadow:0 0 8px rgba(6,214,160,0.3);} to {box-shadow:0 0 16px rgba(6,214,160,0.6);} }

        .row { display:flex; justify-content:space-between; margin:5px 0; }
        .label { font-weight:600; color:#555; }
        .number { color:#d62828; font-weight:bold; font-size:1.5em; }

        .refresh-info { text-align:center; margin-top:20px; color:#555; font-weight:500; }

        @media(max-width:768px){ .results-grid{grid-template-columns:1fr;} }
      `}</style>
    </div>
  );
}
