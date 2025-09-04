// pages/api/live.js
export default async function handler(req, res) {
  try {
    // Thai Stock 2D API ကို ခေါ်
    const r = await fetch("https://api.thaistock2d.com/live");
    const data = await r.json();

    console.log("API Response:", data);

    // Frontend (index.js) ကိုက်အောင် format ပြန်ပေး
    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    const result = [
      {
        stock_date: today,
        stock_datetime: data.live?.stock_datetime || now.toISOString(),
        open_time: "12:01:00", // 🔔 မနက်နာရီ
        set: data.live?.set || "--",
        value: data.live?.value || "--",
        twod: data.live?.twod || "--",
      },
      {
        stock_date: today,
        stock_datetime: data.live?.stock_datetime || now.toISOString(),
        open_time: "16:30:00", // 🔔 ညနာရီ
        set: data.live?.set || "--",
        value: data.live?.value || "--",
        twod: data.live?.twod || "--",
      },
    ];

    res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch live data" });
  }
}
