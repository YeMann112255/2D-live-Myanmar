export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.thaistock2d.com/live"); // သင့် API link
    const data = await r.json();

    res.status(200).json(data.live); // ✅ JSON အနက်မှ live data ကို return
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch live data" });
  }
}
