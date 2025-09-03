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
      <div className="live-wrapper">
        <div className="live-number">{latest.twod}</div>
        <p className="live-status">🟢 Live Now</p>
        <p className="update-time">Updated: {latest.stock_datetime}</p>
      </div>

      {/* Daily Result */}
      <div className="results">
        {daily.map((r, i) => (
          <div className="result-card" key={i}>
            <div className="time">
              {r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}
            </div>
            <div className="info">
              <p>Set: {r.set}</p>
              <p>Value: {r.value}</p> {/* ✅ ပိတ်လိုက်ပြီး */}
            </div>
            <div className="twod">{r.twod}</div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .container {
          text-align: center;
          font-family: "Poppins", sans-serif;
          padding: 20px;
          background: #fdfdfd;
          min-height: 100vh;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #0f172a;
        }
        .live-wrapper {
          margin-bottom: 25px;
        }
        .live-number {
          font-size: 110px;
          font-weight: 900;
          background: linear-gradient(90deg, #f43f5e, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 2px 4px 8px rgba(236, 72, 153, 0.3);
        }
        .live-status {
          font-size: 20px;
          font-weight: 600;
          color: #22c55e;
          margin: 8px 0;
        }
        .update-time {
          font-size: 14px;
          color: #6b7280;
        }
        .results {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }
        .result-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          border-radius: 16px;
          padding: 18px 20px;
          width: 90%;
          max-width: 420px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-left: 6px solid #3b82f6;
          transition: transform 0.2s ease;
        }
        .result-card:hover {
          transform: translateY(-3px);
        }
        .time {
          font-size: 18px;
          font-weight: 700;
          color: #2563eb;
          width: 80px;
        }
        .info {
          text-align: left;
          font-size: 16px;
          flex-grow: 1;
          color: #334155;
        }
        .twod {
          font-weight: 900;
          font-size: 28px;
          color: #eab308;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
          width: 60px;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
