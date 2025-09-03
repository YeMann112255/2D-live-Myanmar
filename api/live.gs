import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.thaistock2d.com/live");
    const data = await r.json();
    res.status(200).json(data.live);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch live data" });
  }
}
