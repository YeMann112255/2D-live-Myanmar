export default async function handler(req, res) {
  try {
    // fetch SET data or mock data
    const result = {
      index: 1248.78,
      valueMB: 34424.58,
      twoD: "87"
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
