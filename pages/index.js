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
          .container { text-align:center; padding:50px; font-family:'Pyidaungsu', sans-serif; background:#0f172a; min-height:100vh; display:flex; justify-content:center; align-items:center; color:#f8fafc; }
          .spinner { border:4px solid rgba(245,158,11,0.2); border-top:4px solid #f59e0b; border-radius:50%; width:60px; height:60px; animation:spin 1s linear infinite; margin:0 auto 20px; }
          @keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
        `}</style>
      </div>
    );

  const getResult = (time) => data?.result?.find(r => r.open_time === time);

  const result12 = getResult("12:01:00");
  const result1630 = getResult("16:30:00");

  return (
    <div className="container">
      <Head>
        <title>2D Live Myanmar - Modern Dashboard</title>
      </Head>

      {/* Header */}
      <header className="header">
        <div className="logo-area">
          <span className="red-dot"></span>
          <h1>2D LIVE MYANMAR</h1>
        </div>
        <div className="current-time">
          🕒 {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
        </div>
      </header>

      {/* Live Box */}
      <div className="live-box">
        <div className="live-badge">
          <span className="red-dot-pulse"></span> LIVE STREAM
        </div>
        <p className="live-subtitle">ယနေ့ အချိန်တိုအတွင်း ထွက်ပေါ်နေသော 2D ရလဒ်</p>
        
        <div className="live-number">{data?.live?.twod || "--"}</div>
        
        <div className="set-value-grid">
          <div className="sv-card">
            <span className="sv-label">SET Market</span>
            <span className="sv-value">{data?.live?.set || "----.--"}</span>
          </div>
          <div className="sv-card">
            <span className="sv-label">VALUE Amount</span>
            <span className="sv-value">{data?.live?.value || "-------.--"}</span>
          </div>
        </div>

        <p className="live-time">Updated: {data?.live?.time}</p>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {/* 12:01 PM Box */}
        <div className="result-box">
          <div className="time-badge">12:01 PM (Open)</div>
          <div className="row"><span className="label">Set</span><span>{result12?.set || "--"}</span></div>
          <div className="row"><span className="label">Value</span><span>{result12?.value || "--"}</span></div>
          <div className="row"><span className="label">2D Result</span><span className="number">{result12?.twod || "--"}</span></div>
        </div>

        {/* 4:30 PM Box */}
        <div className="result-box">
          <div className="time-badge">4:30 PM (Final)</div>
          <div className="row"><span className="label">Set</span><span>{result1630?.set || "--"}</span></div>
          <div className="row"><span className="label">Value</span><span>{result1630?.value || "--"}</span></div>
          <div className="row"><span className="label">2D Result</span><span className="number">{result1630?.twod || "--"}</span></div>
        </div>
      </div>

      {/* Countdown */}
      <div className="refresh-info">🔄 Next update in: <span>{countdown}</span></div>

      {/* Styled JSX (Dark/Gold Theme) */}
      <style jsx>{`
        .container { max-width: 520px; margin: auto; padding: 20px; font-family: 'Pyidaungsu', sans-serif; background-color: #0f172a; color: #f8fafc; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; }

        .header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; margin-bottom: 20px; }
        .logo-area { display: flex; align-items: center; gap: 10px; }
        .header h1 { font-size: 1.25rem; color: #f59e0b; font-weight: bold; letter-spacing: 1px; margin: 0; }
        .current-time { font-size: 0.95rem; color: #94a3b8; font-weight: 500; }

        .red-dot { width: 10px; height: 10px; background: #ef4444; border-radius: 50%; display: inline-block; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }

        .live-box { background: linear-gradient(145deg, #1e293b, #0f172a); border: 2px solid rgba(245, 158, 11, 0.3); text-align: center; padding: 30px 20px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); margin-bottom: 20px; position: relative; overflow: hidden; }
        
        .live-badge { position: absolute; top: 16px; right: 16px; background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #f87171; font-size: 0.75rem; padding: 4px 12px; border-radius: 20px; font-weight: bold; display: flex; align-items: center; gap: 6px; letter-spacing: 1px; }
        .red-dot-pulse { width: 8px; height: 8px; background: #ef4444; border-radius: 50%; display: inline-block; animation: blink 1s infinite; }
        @keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0.3; } }

        .live-subtitle { font-size: 0.85rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; }

        .live-number {
          font-size: 6rem;
          font-weight: 900;
          color: #f59e0b;
          text-shadow: 0 0 25px rgba(245, 158, 11, 0.4);
          line-height: 1.1;
          margin: 10px 0;
          animation: heartbeat 1.5s infinite;
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.06); }
          40% { transform: scale(0.98); }
          60% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }

        .set-value-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
        .sv-card { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); padding: 12px; border-radius: 14px; text-align: center; }
        .sv-label { display: block; font-size: 0.75rem; color: #94a3b8; margin-bottom: 4px; text-transform: uppercase; }
        .sv-value { font-size: 1.1rem; font-weight: bold; color: #f8fafc; }

        .live-time { font-size: 0.8rem; color: #64748b; margin-top: 15px; }

        .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .result-box { background: #1e293b; border: 1px solid rgba(255, 255, 255, 0.08); padding: 18px; border-radius: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .time-badge { font-size: 0.8rem; font-weight: bold; color: #f59e0b; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; }
        .row { display: flex; justify-content: space-between; margin: 8px 0; font-size: 0.9rem; }
        .label { color: #94a3b8; font-weight: 500; }
        .number { color: #f59e0b; font-weight: bold; font-size: 1.3rem; }

        .refresh-info { text-align: center; color: #94a3b8; font-size: 0.9rem; font-weight: 500; padding: 10px; background: rgba(30, 41, 59, 0.4); border-radius: 12px; }
        .refresh-info span { color: #f59e0b; font-weight: bold; }

        @media(max-width: 600px) { 
          .results-grid { grid-template-columns: 1fr; } 
          .live-number { font-size: 5rem; }
        }
      `}</style>
    </div>
  );
}
