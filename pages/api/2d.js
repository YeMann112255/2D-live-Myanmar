import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get("https://www.set.or.th/en/home");
    const $ = cheerio.load(data);

    const setIndex = $(".index-data .last").first().text().trim();
    const valueText = $(".index-data .value").first().text().trim();

    let result2D = "N/A";
    if (setIndex && valueText) {
      const setLastDigit = parseInt(setIndex.replace(/,/g, "").slice(-1));
      const valueMatch = valueText.replace(/,/g, "").match(/(\d+)\./);
      const valueDigit = valueMatch ? parseInt(valueMatch[1].slice(-1)) : null;

      if (!isNaN(setLastDigit) && valueDigit !== null) {
        result2D = `${setLastDigit}${valueDigit}`;
      }
    }

    res.status(200).json({
      setIndex: setIndex || "N/A",
      value: valueText || "N/A",
      result2D,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
