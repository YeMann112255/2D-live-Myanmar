import { useEffect, useState } from "react";

export default function Home() {
  const [live, setLive] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Live result
    fetch("/api/live").then((res) => res.json()).then(setLive);

    // Today results
    fetch("/api/history").then((res) => res.json()).then(setHistory);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>ThaiStock 2D</h1>

      {/* 🔥 Live Result */}
      {live ? (
        <div style={{ fontSize: "80px", fontWeight: "bold" }}>
          {live.twod}
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            ✅ Updated: {live.date} {live.time}
          </p>
        </div>
      ) : (
        <p>Loading live...</p>
      )}

      {/* 📌 Today Results */}
      <div style={{ marginTop: "30px" }}>
        {history.length > 0 ? (
          history.map((h, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#4DA6FF",
                margin: "10px auto",
                padding: "15px",
                borderRadius: "10px",
                color: "white",
                maxWidth: "300px",
                fontSize: "18px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {h.open_time === "12:01:00" ? "12:01 PM" :
                 h.open_time === "16:30:00" ? "04:30 PM" :
                 h.open_time}
              </div>
              <div>Set: {h.set}</div>
              <div>Value: {h.value}</div>
              <div>
                2D: <b style={{ color: "yellow" }}>{h.twod}</b>
              </div>
            </div>
          ))
        ) : (
          <p>No results today yet</p>
        )}
      </div>
    </div>
  );
}
