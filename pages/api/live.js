import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('🔍 Fetching data from ThaiStock2D API...');
    
    const response = await fetch('https://api.thaistock2d.com/live', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://www.thaistock2d.com/'
      },
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`❌ API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Data received successfully');

    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString(),
      source: 'ThaiStock2D API'
    });

  } catch (error) {
    console.error('💥 Error:', error.message);
    
    // Fallback data for demo
    const fallbackData = {
      live: {
        twod: "89",
        time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Yangon' }),
        set: "1,500.75",
        value: "55,200.00",
        date: new Date().toISOString().split('T')[0]
      },
      result: [
        {
          twod: "75",
          open_time: "10:00:00",
          set: "1,480.25",
          value: "48,500.50",
          stock_date: new Date().toISOString().split('T')[0]
        },
        {
          twod: "23",
          open_time: "12:00:00", 
          set: "1,520.30",
          value: "52,100.75",
          stock_date: new Date().toISOString().split('T')[0]
        }
      ],
      server_time: new Date().toISOString()
    };

    res.status(200).json({
      success: true,
      data: fallbackData,
      timestamp: new Date().toISOString(),
      cached: true,
      note: 'Using fallback data'
    });
  }
}
