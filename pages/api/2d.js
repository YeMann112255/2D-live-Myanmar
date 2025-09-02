import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get("https://www.set.or.th/en/home");

    const $ = cheerio.load(data);

    // SET Index ရှာ
    const setIndex = $(".live-board--set .number").first().text().trim();

    // Value ရှာ (နည်းမတူနိုင်တယ်)
    const value = $(".live-board--value .number").first().text().trim();

    let result = "N/A";
    if (setIndex && value) {
      const lastDigit = setIndex.slice(-1); // နောက်ဆုံးဂဏန်း
      const beforeDecimal = value.split(".")[0].slice(-1); // ဒသမရှေ့ဂဏန်း
      result = beforeDecimal + lastDigit;
    }

    res.status(200).json({
      setIndex: setIndex || "N/A",
      value: value || "N/A",
      result,
    });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
