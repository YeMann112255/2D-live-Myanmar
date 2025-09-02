import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/2d")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📊 Myanmar 2D Result</h1>
      {data ? (
        <div>
          <p>SET Index: {data.index}</p>
          <p>Value (MB): {data.valueMB}</p>
          <h2>2D Result 👉 {data.twoD}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
