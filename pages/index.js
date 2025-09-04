import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({ result: [], live: "--", status: "🔴 Live Now", updated: "--" });

  // Fetch live data every 5 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/live");
        const json = await res.json();
        if (json && typeof json === "object") {
          setData({
            result: Array.isArray(json.result) ? json.result : [],
            live: json.live || "--",
            status: json.status || "🔴 Live Now",
            updated: json.updated || "--",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const results = data.result || [];
  const latest = results[results.length - 1] || {};

  const daily = results.filter(
    (r) => r?.stock_date === today && (r.open_time === "12:01:00" || r.open_time === "16:30:00")
  );

  const latestNumber = latest?.twod && latest.twod !== "--" ? latest.twod : data.live;
  const status = data.status;
  const updatedTime = latest?.stock_datetime || data.updated;

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>2D Live Myanmar</h1>

      <div style={{ margin: "30px 0" }}>
        <div
          style={{
            fontSize: "100px",
            fontWeight: "900",
            background: "linear-gradient(90deg, #f43f5e, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {latestNumber || "--"}
        </div>
        <p>{status}</p>
        <p>Updated: {updatedTime}</p>
      </div>

      <div>
        {daily.length > 0 ? (
          daily.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "400px",
                margin: "10px auto",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <div>{r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}</div>
              <div>
                <p>Set: {r?.set || "--"}</p>
                <p>Value: {r?.value || "--"}</p>
              </div>
              <div>{r?.twod && r.twod !== "--" ? r.twod : data.live || "--"}</div>
            </div>
          ))
        ) : (
          <p>No results yet</p>
        )}
      </div>
    </div>
  );
}
