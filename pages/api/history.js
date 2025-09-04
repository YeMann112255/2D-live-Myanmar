export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.thaistock2d.com/live");
    const data = await response.json();

    const today = new Date().toISOString().slice(0, 10);

    // result array ထဲက today only (12:01 & 16:30)
    const todayResults = Array.isArray(data.result)
      ? data.result.filter(
          (r) =>
            r?.stock_date === today &&
            (r.open_time === "12:01:00" || r.open_time === "16:30:00")
        )
      : [];

    res.status(200).json(todayResults);
  } catch (err) {
    console.error("History API fetch error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}
