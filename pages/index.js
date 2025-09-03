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
              <p>Value
