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
    const interval = setInterval(fetchData, 5000); // auto refresh 5s
    return () => clearInterval(interval);
  }, []);

  if (!data)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
    );

  // နောက်ဆုံးထွက် 2D
  const latest = data.result[data.result.length - 1];

  // ဒီနေ့ 12:01PM & 04:30PM ပဲ filter
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
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "15px",
          color: "#1e293b",
        }}
      >
        2D Live Myanmar
      </h1>

      {/* Latest Live */}
      <div
        style={{
          fontSize: "110px",
          fontWeight: "800",
          color: "#e11d48",
          textShadow: "4px 4px 10px rgba(0,0,0,0.3)",
          marginBottom: "10px",
        }}
      >
        {latest.twod}
      </div>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "green",
          marginBottom: "5px",
        }}
      >
        🔴 Live Now
      </p>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "25px" }}>
        Updated: {latest.stock_datetime}
      </p>

      {/* Daily Results */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {daily.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              color: "white",
              borderRadius: "12px",
              padding: "20px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            <span style={{ fontWeight: "600", width: "90px" }}>
              {r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}
            </span>
            <span>Set: {r.set}</span>
            <span>Value: {r.value}</span>
            <span
              style={{
                fontWeight: "bold",
                color: "#FFD700",
                fontSize: "22px",
                width: "40px",
                textAlign: "right",
              }}
            >
              {r.twod}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
