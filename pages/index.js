// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/live");
        const d = await res.json();
        setData(d);
      } catch (e) {
        console.error("Failed to fetch:", e);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  const today = new Date().toISOString().slice(0, 10);
  const result = Array.isArray(data?.result) ? data.result : [];
  const latest = result.length ? result[result.length - 1] : {};

  const daily =
    result.filter(
      (r) =>
        r?.stock_date === today &&
        (r.open_time === "12:01:00" || r.open_time === "16:30:00")
    ) || [];

  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const isMorningLive = hour >= 9 && (hour < 12 || (hour === 12 && minute <= 1));
  const isEveningLive = hour >= 14 && (hour < 16 || (hour === 16 && minute <= 30));
  const isLive = isMorningLive || isEveningLive;

  const latestNumber =
    latest?.twod && latest.twod !== "--" ? latest.twod : data?.live || "Waiting...";
  const status = data?.status || (isLive ? "🔴 Live Now" : "✅ Final Result");
  const updatedTime = latest?.stock_datetime || data?.updated || "Waiting...";

  return (
    <div className="container">
      <h1 className="title">2D Live Myanmar</h1>

      <div className="live-wrapper">
        <div className={isLive ? "live-number anim" : "live-number"}>{latestNumber}</div>
        <p className="live-status">{status}</p>
        <p className="update-time">Updated: {updatedTime}</p>
      </div>

      <div className="results">
        {daily.length > 0 ? (
          daily.map((r, i) => (
            <div className="result-card" key={i}>
              <div className="time">{r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}</div>
              <div className="info">
                <p>Set: {r?.set || "--"}</p>
                <p>Value: {r?.value || "--"}</p>
              </div>
              <div className="twod">{r?.twod !== "--" ? r.twod : data?.live || "--"}</div>
            </div>
          ))
        ) : (
          <p>No results yet</p>
        )}
      </div>

      <style jsx>{`
        @keyframes glow {
          0% { text-shadow: 0 0 6px #f43f5e, 0 0 10px #f43f5e; }
          50% { text-shadow: 0 0 20px #22c55e, 0 0 30px #22c55e; }
          100% { text-shadow: 0 0 6px #f43f5e, 0 0 10px #f43f5e; }
        }
        .container { text-align: center; font-family: "Poppins", sans-serif; padding: 20px; background: #fafafa; min-height: 100vh; }
        .title { font-size: 28px; font-weight: 700; margin-bottom: 20px; color: #0f172a; }
        .live-wrapper { margin-bottom: 25px; }
        .live-number { font-size: 110px; font-weight: 900; background: linear-gradient(90deg, #f43f5e, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .live-number.anim { animation: glow 1.5s ease-in-out infinite; }
        .live-status { font-size: 20px; font-weight: 600; color: #dc2626; margin: 8px 0; }
        .update-time { font-size: 14px; color: #6b7280; }
        .results { display: flex; flex-direction: column; gap: 18px; align-items: center; }
        .result-card { display: flex; justify-content: space-between; align-items: center; background: #ffffff; border-radius: 16px; padding: 18px 20px; width: 90%; max-width: 420px; box-shadow: 0 3px 8px rgba(0,0,0,0.12); border-left: 6px solid #2563eb; }
        .time { font-size: 18px; font-weight: 700; color: #dc2626; width: 90px; text-align: left; }
        .info { text-align: center; font-size: 16px; color: #334155; flex-grow: 1; }
        .twod { font-weight: 900; font-size: 26px; color: #f59e0b; text-shadow: 1px 1px 3px rgba(0,0,0,0.2); width: 60px; text-align: right; }
      `}</style>
    </div>
  );
}
