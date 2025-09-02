import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const resp = await axios.get("https://www.set.or.th/en/home");
    const html = resp.data;
    const $ = cheerio.load(html);

    // Example CSS selectors — အမှန်အတွက် inspect element ကြည့်ပြီးပြင်ပါ။
    const setText = $(".live-index .value").first().text().trim();
    const valueText = $(".live-index .value").eq(3).text().trim();

    const setIndex = parseFloat(setText.replace(/,/g, ""));
    const valueMB = parseFloat(valueText.replace(/,/g, ""));

    function compute2D(setVal, val) {
      const lastIntDigit = Math.abs(Math.floor(setVal) % 10);
      const onesValDigit = Math.abs(Math.floor(val) % 10);
      return `${lastIntDigit}${onesValDigit}`;
    }

    const now2D = compute2D(setIndex, valueMB);

    // Dummy historical values (replace with real logic or saved database)
    const history = {
      "00:01": "24", // placeholder 12:01am result
      "16:30": "57"  // placeholder 4:30pm result
    };

    res.status(200).json({
      live: { setIndex, valueMB, now2D },
      history
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
