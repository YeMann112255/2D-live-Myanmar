import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://www.set.or.th/en/home");
    const $ = cheerio.load(response.data);

    // ဥပမာ selector
    const setValue = $(".set-index .value").first().text();
    const lastDigit = setValue.slice(-1);

    const valueNumber = $(".set-index .change").first().text();
    const beforeDecimal = valueNumber.split(".")[0].slice(-1);

    const result = lastDigit + beforeDecimal;

    res.status(200).json({
      set: setValue,
      value: valueNumber,
      result
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
