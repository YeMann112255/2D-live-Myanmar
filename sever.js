import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy endpoint for live data
app.get("/api/live", async (req, res) => {
  try {
    const r = await fetch("https://api.thaistock2d.com/live");
    const data = await r.json();
    res.json(data.live); // only SET / Value / 2D / Time
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch fail" });
  }
});

// Frontend page
app.get("/", (req, res) => {
  res.send(`
    <h1>Myanmar 2D Live</h1>
    <div id="show"></div>
    <script>
      async function load() {
        const res = await fetch('/api/live');
        const d = await res.json();
        document.getElementById("show").innerHTML =
          "SET: " + d.set + "<br>" +
          "Value: " + d.value + "<br>" +
          "2D: " + d.twod + "<br>" +
          "Time: " + d.time;
      }
      load();
      setInterval(load, 60000);
    </script>
  `);
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
