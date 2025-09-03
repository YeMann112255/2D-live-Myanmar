// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/live");
      const d = await res.json();
      setData(d);
    } catch (e) {
      console.error("Failed to fetch:", e);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // auto refresh every 5s
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  const latest = data.result[data.result.length - 1];
  const today = new Date().toISOString().slice(0, 10);

  const daily = data.result.filter(
    (r) =>
      r.stock_date === today &&
      (r.open_time === "12:01:00" || r.open_time === "16:30:00")
  );

  return (
    <div className="container">
      <h1 className="title">2D Live Myanmar</h1>

      {/* Live Number */}
      <div className="live-number">{latest.twod}</div>
      <p className="live-status">🔴 Live Now</p>
      <p className="update-time">Updated: {latest.stock_datetime}</p>

      {/* Daily Result */}
      <div className="results">
        {daily.map((r, i) => (
          <div className="result-box" key={i}>
            <span className="time">
              {r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}
            </span>
            <span>Set: {r.set}</span>
            <span>Value: {r.value}</span>
            <span className="twod">{r.twod}</span>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .container {
          text-align: center;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
          background: #111827;
          min-height: 100vh;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #f3f4f6;
        }
        .live-number {
          font-size: 120px;
          font-weight: 900;
          color: #ef4444;
          text-shadow: 4px 6px 15px rgba(239, 68, 68, 0.7);
          margin-bottom: 10px;
        }
        .live-status {
          font-size: 22px;
          font-weight: bold;
          color: #22c55e;
          margin-bottom: 8px;
        }
        .update-time {
          color: #9ca3af;
          font-size: 14px;
          margin-bottom: 25px;
        }
        .results {
          display: flex;
          flex-direction: column;
          gap: 25px;
          align-items: center;
        }
        .result-box {
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          border-radius: 14px;
          padding: 25px 15px;
          width: 92%;
          max-width: 420px;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
          font-size: 18px;
          font-weight: 500;
          color: white;
        }
        .time {
          font-weight: 700;
          font-size: 18px;
          color: #bfdbfe;
          width: 90px;
        }
        .twod {
          font-weight: 900;
          color: #fde047;
          font-size: 28px;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
          width: 50px;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
