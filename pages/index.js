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
          background: #f9fafb;
          min-height: 100vh;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #111827;
        }
        .live-number {
          font-size: 120px;
          font-weight: 900;
          color: #dc2626;
          text-shadow: 3px 5px 12px rgba(220, 38, 38, 0.5);
          margin-bottom: 10px;
        }
        .live-status {
          font-size: 22px;
          font-weight: bold;
          color: #16a34a;
          margin-bottom: 8px;
        }
        .update-time {
          color: #6b7280;
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
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          border-radius: 14px;
          padding: 25px 15px;
          width: 92%;
          max-width: 420px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
          font-size: 18px;
          font-weight: 500;
          color: white;
        }
        .time {
          font-weight: 700;
          font-size: 18px;
          color: #e0f2fe;
          width: 90px;
        }
        .twod {
          font-weight: 900;
          color: #facc15;
          font-size: 28px;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
          width: 50px;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
