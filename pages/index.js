import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("");

  // Fetch API data every 3 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); // 3s auto-refresh
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (data?.result?.length > 0) {
      const nextTime = new Date(
        `${data.live.date} ${data.result[data.result.length - 1].open_time}`
      );
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

  if (loading)
    return (
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

  // Helper function to safely get result by time
  const getResult = (time) => data?.result?.find(r => r.open_time === time);

  const result12 = getResult("12:01:00");
  const result1630 = getResult("16:30:00");

  return (
    <div className="container">
      <Head>
        <title>2D Live Myanmar</title>
      </Head>

      {/* Header */}
      <header className="header">
        <h1>2D Live Myanmar</h1>
        <div className="current-time">
          🕒 {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
        </div>
      </header>

      {/* Live Box */}
      <div className="live-box">
        <h2>
          LIVE <span className="red-dot"></span>
        </h2>
        <div className="live-number">{data?.live?.twod || "--"}</div>
        <div className="set-value">
          Set: {data?.live?.set || "--"}, Value: {data?.live?.value || "--"}
        </div>
        <p className="live-time">Updated: {data?.live?.time}</p>
      </div>

      {/* Results Grid - Always show 12:01 & 4:30 */}
      <div className="results-grid">
        {/* 12:01 PM Box */}
        <div className="result-box">
          <div className="time">12:01 PM</div>
          <div className="row"><span className="label">Set</span><span>{result12?.set || "--"}</span></div>
          <div className="row"><span className="label">Value</span><span>{result12?.value || "--"}</span></div>
          <div className="row"><span className="label">2D</span><span className="number">{result12?.twod || "--"}</span></div>
        </div>

        {/* 4:30 PM Box */}
        <div className="result-box">
          <div className="time">4:30 PM</div>
          <div className="row"><span className="label">Set</span><span>{result1630?.set || "--"}</span></div>
          <div className="row"><span className="label">Value</span><span>{result1630?.value || "--"}</span></div>
          <div className="row"><span className="label">2D</span><span className="number">{result1630?.twod || "--"}</span></div>
        </div>
      </div>

      {/* Countdown */}
      <div className="refresh-info">🔄 Next update in: {countdown}</div>

      {/* Styled JSX */}
      <style jsx>{`
        .container { max-width:500px; margin:auto; padding:20px; font-family:'Pyidaungsu', sans-serif; }

        .header { text-align:center; padding:15px; margin-bottom:20px; border-bottom:2px solid #00b4d8; }
        .header h1 { font-size:2em; color:#00b4d8; font-weight:bold; }
        .current-time { font-size:1.2em; color:#555; }

        .live-box { background:#fff; color:#222; text-align:center; padding:25px; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); margin-bottom:25px; }
        .live-box h2 { font-size:1.5em; margin-bottom:10px; color:#0077b6; display:flex; justify-content:center; align-items:center; gap:8px; }
        .red-dot { width:12px; height:12px; background:red; border-radius:50%; display:inline-block; animation: blink 1s infinite; }
        @keyframes blink { 0%,50%,100% {opacity:1;} 25%,75% {opacity:0;} }

        .live-number {
          font-size: 4em;
          font-weight: bold;
          color: #d62828;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.4);
          display: inline-block;
          animation: heartbeat 1.2s infinite;
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          40% { transform: scale(0.9); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .set-value { font-size:1.2em; margin:10px 0; }
        .live-time { font-size:0.9em; color:#555; }

        .results-grid { display:grid; grid-template-columns:1fr 1fr; gap:15px; }
        .result-box { background:#fff; color:#222; padding:20px; border-radius:10px; box-shadow:0 3px 8px rgba(0,0,0,0.1); transition:0.3s; }
        .row { display:flex; justify-content:space-between; margin:5px 0; }
        .label { font-weight:600; color:#555; }
        .number { color:#d62828; font-weight:bold; font-size:1.5em; }

        .refresh-info { text-align:center; margin-top:20px; color:#555; font-weight:500; }

        @media(max-width:768px){ .results-grid{grid-template-columns:1fr;} }
      `}</style>
    </div>
  );
}
