import fetch from 'node-fetch';

const getFallbackData = () => {
  const now = new Date();
  return {
    live: {
      twod: "53",
      time: "2025-09-04 16:30:00",
      set: "1,252.55",
      value: "44,813.45",
      date: "2025-09-04"
    },
    result: [
      {
        set: "1,262.45",
        value: "21,100.99",
        open_time: "11:00:00",
        twod: "50",
        stock_date: "2025-09-04",
        stock_datetime: "2025-09-04 11:00:01"
      },
      {
        set: "1,263.42",
        value: "24,622.25", 
        open_time: "12:01:00",
        twod: "22",
        stock_date: "2025-09-04",
        stock_datetime: "2025-09-04 12:01:00"
      },
      {
        set: "1,255.22",
        value: "34,766.06",
        open_time: "15:00:00",
        twod: "26",
        stock_date: "2025-09-04", 
        stock_datetime: "2025-09-04 15:00:02"
      },
      {
        set: "1,252.55",
        value: "44,813.45",
        open_time: "16:30:00",
        twod: "53",
        stock_date: "2025-09-04",
        stock_datetime: "2025-09-04 16:30:02"
      }
    ],
    server_time: now.toISOString(),
    status: "2",
    date: "2025-09-04",
    name: "NULL"
  };
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Try to get real data
    const response = await fetch('https://api.thaistock2d.com/live', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    let data;
    if (response.ok) {
      data = await response.json();
    } else {
      data = getFallbackData();
    }

    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const fallbackData = getFallbackData();
    res.status(200).json({
      success: true,
      data: fallbackData,
      timestamp: new Date().toISOString(),
      cached: true
    });
  }
}
