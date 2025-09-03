// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/live");
    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
    );

  const latest = data.result[data.result.length - 1];
  const today = new Date().toISOString().slice(0, 10);
  const daily = data.result.filter(
    (r) =>
      r.stock_date === today &&
      (r.open_time === "12:01:00" || r.open_time === "16:30:00")
  );

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
        backgroundColor: "#111827",
        minHeight: "100vh",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "15px",
          color: "#f3f4f6",
        }}
      >
        2D Live Myanmar
      </h1>

      {/* Latest Live */}
      <div
        style={{
          fontSize: "120px",
          fontWeight: "900",
          color: "#ef4444",
          textShadow: "4px 6px 15px rgba(239,68,68,0.7)",
          marginBottom: "10px",
        }}
      >
        {latest.twod}
      </div>
      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: "#22c55e",
          marginBottom: "8px",
        }}
      >
        🔴 Live Now
      </p>
      <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "25px" }}>
        Updated: {latest.stock_datetime}
      </p>

      {/* Daily Results */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          alignItems: "center",
        }}
      >
        {daily.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              background: "linear-gradient(135deg, #3b82f6, #9333ea)",
              borderRadius: "14px",
              padding: "25px 15px",
              width: "92%",
