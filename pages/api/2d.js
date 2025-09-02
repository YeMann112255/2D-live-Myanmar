import { chromium } from 'playwright';

function pick2D(setStr, valueStr) {
  const clean = s => s.replace(/[^\d.]/g, '');
  const setNumStr = clean(setStr);
  const valueNumStr = clean(valueStr);

  const lastDigit = setNumStr?.match(/\d(?=[^0-9]*$)/)?.[0];
  const beforeDecimal = valueNumStr?.split('.')?.[0]?.slice(-1);
  return (lastDigit && beforeDecimal) ? `${lastDigit}${beforeDecimal}` : 'N/A';
}

export default async function handler(req, res) {
  let browser;
  try {
    browser = await chromium.launch({ args: ['--no-sandbox'], headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.set.or.th/en/home', { waitUntil: 'networkidle' });

    // စာမျက်နှာက text တွေ ယူရန်
    const textDump = await page.evaluate(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const arr = [];
      while (walker.nextNode()) {
        const t = walker.currentNode.nodeValue.trim();
        if (t) arr.push(t);
      }
      return arr;
    });

    // ဂဏန်းပေါ်စေ
    const numberLike = textDump.filter(t => /[\d]+[\d,]*\.?\d*/.test(t));
    const toNumber = s => Number(s.replace(/[^\d.]/g, ''));
    const candidates = numberLike.map(s => ({ raw: s, num: toNumber(s) }));

    // SET index candidate
    const setCand = candidates
      .filter(x => x.num > 700 && x.num < 3000 && String(x.raw).includes('.'))
      .sort((a,b) => Math.abs(1600 - a.num) - Math.abs(1600 - b.num));

    // Value candidate
    const valCand = candidates
      .filter(x => x.num > 1000)
      .sort((a,b) => b.num - a.num);

    const setStr = setCand[0]?.raw ?? '';
    const valueStr = valCand[0]?.raw ?? '';
    const result2D = pick2D(setStr, valueStr);

    res.status(200).json({
      setIndex: setStr || 'N/A',
      value: valueStr || 'N/A',
      result2D,
      at: new Date().toISOString()
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    if (browser) await browser.close();
  }
}
