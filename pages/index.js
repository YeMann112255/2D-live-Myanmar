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
    const interval = setInterval(fetchData, 5000); // auto refresh every 5s
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
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        2D Live Myanmar
      </h1>

      {/* Latest Live */}
      <div
        style={{
          fontSize: "100px",
          fontWeight: "bold",
          color: "#E91E63",
          textShadow: "3px 3px #555",
          marginBottom: "10px",
        }}
      >
        {latest.twod}
      </div>
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "green" }}>
        🔴 Live Now
      </p>
      <p style={{ color: "gray", fontSize: "14px" }}>
        Updated: {latest.stock_datetime}
      </p>

      {/* Daily Results */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
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
              backgroundColor: "#1e1e1e",
              color: "white",
              borderRadius: "8px",
              padding: "15px 20px",
              width: "350px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            <span style={{ width: "70px", textAlign: "left" }}>
              {r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}
            </span>
            <span style={{ width: "80px" }}>Set: {r.set}</span>
            <span style={{ width: "90px" }}>Value: {r.value}</span>
            <span
              style={{
                fontWeight: "bold",
                color: "#FFD700",
                fontSize: "20px",
                width: "50px",
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
