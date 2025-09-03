// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  // function for fetching data
  const fetchData = async () => {
    const res = await fetch("/api/live");
    const d = await res.json();
    setData(d);
  };

  useEffect(() => {
    fetchData(); // load once when page open

    // auto refresh every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval); // cleanup interval
  }, []);

  if (!data) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  // latest live result
  const latest = data.result[data.result.length - 1];

  // filter today 12:01 & 4:30
  const today = new Date().toISOString().slice(0, 10);
  const daily = data.result.filter(
    (r) =>
      r.stock_date === today &&
      (r.open_time === "12:01:00" || r.open_time === "16:30:00")
  );

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "15px" }}>
        2D Live Myanmar
      </h1>

      {/* latest live */}
      <div
        style={{
          fontSize: "90px",
          fontWeight: "bold",
          color: "#FF4500",
          textShadow: "3px 3px #ccc",
        }}
      >
        {latest.twod}
      </div>
      <p style={{ margin: "5px 0", fontWeight: "bold", color: "green" }}>🔴 Live</p>
      <p style={{ color: "gray", fontSize: "14px" }}>
        Updated: {latest.stock_datetime}
      </p>

      {/* daily results */}
      <div style={{ marginTop: "20px" }}>
        {daily.map((r, i) => (
          <div
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? "#1976D2" : "#009688",
              color: "white",
              borderRadius: "10px",
              padding: "15px",
              margin: "10px auto",
              width: "260px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              fontSize: "15px",
            }}
          >
            <h2 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
              {r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}
            </h2>
            <p style={{ margin: "2px 0" }}>Set: {r.set}</p>
            <p style={{ margin: "2px 0" }}>Value: {r.value}</p>
            <p style={{ fontSize: "18px", marginTop: "5px" }}>
              2D: <span style={{ fontWeight: "bold", color: "yellow" }}>{r.twod}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
