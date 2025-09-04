import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/live");
        const d = await res.json();
        setData(d);
      } catch (e) {
        console.error("Failed to fetch:", e);
        setData(null);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  const today = new Date().toISOString().slice(0, 10);
  const result = Array.isArray(data.result) ? data.result : [];
  const latest = result[result.length - 1] || {};

  const daily =
    result.filter(
      (r) =>
        r?.stock_date === today &&
        (r.open_time === "12:01:00" || r.open_time === "16:30:00")
    ) || [];

  const latestNumber = latest?.twod && latest.twod !== "--" ? latest.twod : data?.live || "--";
  const status = data?.status || "🔴 Live Now";
  const updatedTime = latest?.stock_datetime || data?.updated || "--";

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>2D Live Myanmar</h1>
      <div style={{ margin: "30px 0" }}>
        <div style={{ fontSize: "100px", fontWeight: "900", color: "#f43f5e" }}>{latestNumber}</div>
        <p>{status}</p>
        <p>Updated: {updatedTime}</p>
      </div>

      <div>
        {daily.length > 0 ? (
          daily.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", maxWidth: "400px", margin: "10px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }}>
              <div>{r.open_time === "12:01:00" ? "12:01 PM" : "04:30 PM"}</div>
              <div>Set: {r?.set || "--"} | Value: {r?.value || "--"}</div>
              <div>{r?.twod !== "--" ? r.twod : data?.live || "--"}</div>
            </div>
          ))
        ) : (
          <p>No results yet</p>
        )}
      </div>
    </div>
  );
}
