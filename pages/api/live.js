let morningResult = null;
let eveningResult = null;

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.thaistock2d.com/live");
    const data = await response.json();

    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const hour = now.getHours();
    const minute = now.getMinutes();

    const liveTwod = data.live || "--";
    const liveSet = data.set || "--";
    const liveValue = data.value || "--";
    const liveTime = data.stock_datetime || now.toISOString();

    // 🕒 12:01 freeze
    if (!morningResult && hour >= 12 && minute >= 1) {
      morningResult = {
        stock_date: today,
        stock_datetime: liveTime,
        open_time: "12:01:00",
        set: liveSet,
        value: liveValue,
        twod: liveTwod,
      };
    }

    // 🕓 16:30 freeze
    if (!eveningResult && hour >= 16 && minute >= 30) {
      eveningResult = {
        stock_date: today,
        stock_datetime: liveTime,
        open_time: "16:30:00",
        set: liveSet,
        value: liveValue,
        twod: liveTwod,
      };
    }

    // 🔴 / ✅ Status
    let status = "🔴 Live Now";
    let mainNumber = liveTwod;

    if (eveningResult) {
      status = "✅ Final Result";
      mainNumber = eveningResult.twod;
    }

    const result = [
      morningResult || { stock_date: today, open_time: "12:01:00", set: "--", value: "--", twod: "--" },
      eveningResult || { stock_date: today, open_time: "16:30:00", set: "--", value: "--", twod: "--" },
    ];

    res.status(200).json({
      result,
      live: mainNumber,
      status,
      updated: liveTime,
    });
  } catch (err) {
    console.error("Live API fetch error:", err);
    res.status(500).json({ error: "Failed to fetch live data" });
  }
}
