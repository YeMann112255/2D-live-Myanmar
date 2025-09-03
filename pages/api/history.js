export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.thaistock2d.com/live");
    const data = await r.json();

    // ⏰ Today date
    const today = new Date().toISOString().slice(0, 10); // "2025-09-04"

    // 🔎 result array ထဲက today only
    const todayResults = data.result.filter(r =>
      r.stock_date === today &&
      (r.open_time === "12:01:00" || r.open_time === "16:30:00")
    );

    res.status(200).json(todayResults);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
}
