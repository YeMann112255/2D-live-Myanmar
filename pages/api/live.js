// pages/api/live.js
export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.thaistock2d.com/live");
    const data = await r.json();

    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    // current hour/minute
    const hour = now.getHours();
    const minute = now.getMinutes();

    // time slot check
    const isMorning = hour < 12 || (hour === 12 && minute <= 1);
    const isEvening = hour >= 14 && (hour < 16 || (hour === 16 && minute <= 30));

    // Live number (only when inside session)
    const liveTwod = data.live?.twod || "--";
    const liveSet = data.live?.set || "--";
    const liveValue = data.live?.value || "--";
    const liveTime = data.live?.stock_datetime || now.toISOString();

    const result = [
      {
        stock_date: today,
        stock_datetime: liveTime,
        open_time: "12:01:00",
        set: isMorning ? liveSet : "--",   // ⏰ မနက်
        value: isMorning ? liveValue : "--",
        twod: isMorning ? liveTwod : "--",
      },
      {
        stock_date: today,
        stock_datetime: liveTime,
        open_time: "16:30:00",
        set: isEvening ? liveSet : "--",   // ⏰ ညနေ
        value: isEvening ? liveValue : "--",
        twod: isEvening ? liveTwod : "--",
      },
    ];

    res.status(200).json({ result, live: isMorning || isEvening ? liveTwod : "--" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch live data" });
  }
}
