import puppeteer from "puppeteer";

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto("https://www.set.or.th/en/home", { waitUntil: "networkidle2" });

    // SET Value ကို ယူမယ်
    const setValue = await page.$eval(".live-index-board .number", el => el.innerText);

    // Change / Value ကို ယူမယ်
    const valueNumber = await page.$eval(".live-index-board .change", el => el.innerText);

    await browser.close();

    // 2D calculation
    const lastDigit = setValue.replace(/,/g, "").slice(-1);
    const beforeDecimal = valueNumber.split(".")[0].slice(-1);

    res.status(200).json({
      set: setValue,
      value: valueNumber,
      result: lastDigit + beforeDecimal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
