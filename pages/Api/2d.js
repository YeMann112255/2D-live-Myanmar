import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const url = "https://www.set.or.th/en/home";
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const text = $("body").text();
    const regex = /SET\s+([0-9,]+\.[0-9]+)\s+[+\-][0-9.,]+\s+[0-9,]+\s+([0-9,]+\.[0-9]+)/;
    const match = text.match(regex);

    if (match) {
      const index = parseFloat(match[1].replace(/,/g, ""));
      const value = parseFloat(match[2].replace(/,/g, ""));
      const lastIntDigit = Math.abs(parseInt(index) % 10);
      const onesDigit = Math.abs(parseInt(value) % 10);
      const result2D = `${lastIntDigit}${onesDigit}`;

      res.status(200).json({ index, value, result2D });
    } else {
      res.status(404).json({ error: "SET data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
