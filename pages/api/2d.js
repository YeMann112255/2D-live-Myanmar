import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://marketplace.set.or.th/api/public/realtime-data/index?market=SET",
      { headers: { "api-key": process.env.SET_API_KEY } }
    );

    const { last, value } = response.data[0]; // JSON配列の1番目がSET
    const setStr = last.toString();
    const valueStr = value.toString();

    const lastDigit = setStr.slice(-1);
    const beforeDecimal = valueStr.split(".")[0].slice(-1);
    const result2D = `${lastDigit}${beforeDecimal}`;

    res.status(200).json({ setIndex: setStr, value: valueStr, result2D });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
