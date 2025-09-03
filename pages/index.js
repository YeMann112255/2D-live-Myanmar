// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/live")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  if (!data) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  // နောက်ဆုံးထွက် result
  const latest = data.result[data.result.length - 1];

  // today ရဲ့ 12:01 နဲ့ 04:30 ပဲ filter
  const today = new Date().toISOString().slice(0, 10);
  const daily = data.result.filter(
    (r) => r.stock_date === today && (r.open_time === "12:01:00" || r.open_time === "16:30:00")
  );

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>Myanmar 2D Live</h1>

      {/* Latest big number */}
      <div style={{ fontSize: "80px", fontWeight: "bold", color: "#FF5733", textShadow: "2px 2px #ccc" }}>
        {latest.twod}
      </div>
      <p style={{ color: "gray" }}>Updated: {latest.stock_datetime}</p>

      {/* Daily Results */}
      <div style={{ marginTop: "20px" }}>
        {daily.map((r, i) => (
          <div
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? "#4DA6FF" : "#66CC99", // အရောင် ပြောင်းထား
              color: "white",
              borderRadius: "10px",
              padding: "15px",
              margin: "10px auto",
              width: "250px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0" }}>
              {r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}
            </h2>
            <p>Set: {r.set}</p>
            <p>Value: {r.value}</p>
            <p style={{ fontSize: "20px" }}>
              2D: <span style={{ fontWeight: "bold", color: "yellow" }}>{r.twod}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
