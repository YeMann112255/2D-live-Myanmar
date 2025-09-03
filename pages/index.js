// pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/live")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Myanmar 2D Live Result</h1>
      {data ? (
        <div>
          <p>Set: {data.set}</p>
          <p>Value: {data.value}</p>
          <p>Time: {data.time}</p>
          <p>2D: {data.twod}</p>
          <p>Date: {data.date}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
