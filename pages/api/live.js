export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.thaistock2d.com/live");
    const data = await r.json();

    console.log("API Response:", data); // <-- ✅ ဒီလို log ထုတ်ကြည့်

    res.status(200).json(data); // data.live မဟုတ်ရင် ဒီလို return လိုက်
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch live data" });
  }
}
