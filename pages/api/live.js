import fetch from 'node-fetch';

// Fallback data for when API fails
const getFallbackData = () => {
  const now = new Date();
  return {
    live: {
      twod: Math.floor(Math.random() * 90 + 10).toString().padStart(2, '0'),
      time: now.toLocaleString('en-US', { timeZone: 'Asia/Yangon' }),
      set: (Math.random() * 500 + 1200).toFixed(2),
      value: (Math.random() * 30000 + 20000).toFixed(2),
      date: now.toISOString().split('T')[0]
    },
    result: [
      {
        twod: Math.floor(Math.random() * 90 + 10).toString().padStart(2, '0'),
        open_time: "10:00:00",
        set: (Math.random() * 500 + 1200).toFixed(2),
        value: (Math.random() * 20000 + 20000).toFixed(2),
        stock_date: now.toISOString().split('T')[0],
        history_id: "2184" + Math.floor(Math.random() * 1000)
      },
      {
        twod: Math.floor(Math.random() * 90 + 10).toString().padStart(2, '0'),
        open_time: "12:00:00",
        set: (Math.random() * 500 + 1200).toFixed(2),
        value: (Math.random() * 20000 + 20000).toFixed(2),
        stock_date: now.toISOString().split('T')[0],
        history_id: "2185" + Math.floor(Math.random() * 1000)
      },
      {
        twod: Math.floor(Math.random() * 90 + 10).toString().padStart(2, '0'),
        open_time: "14:00:00",
        set: (Math.random() * 500 + 1200).toFixed(2),
        value: (Math.random() * 20000 + 20000).toFixed(2),
        stock_date: now.toISOString().split('T')[0],
        history_id: "2186" + Math.floor(Math.random() * 1000)
      }
    ],
    server_time: now.toISOString(),
    status: "2",
    date: now.toISOString().split('T')[0],
    name: "NULL"
  };
};

export default async function handler(req, res) {
  // Enable CORS for frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('🔄 Fetching data from ThaiStock2D API...');

    // Try to fetch from ThaiStock2D API
    const apiUrl = 'https://api.thaistock2d.com/live';
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.thaistock2d.com/',
        'Origin': 'https://www.thaistock2d.com',
        'Connection': 'keep-alive'
      },
      timeout: 15000, // 15 second timeout
      method: 'GET'
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`❌ API responded with status: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('✅ Successfully fetched data from ThaiStock2D API');

    // Return successful response
    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString(),
      source: 'thaistock2d-api',
      message: 'Live data from ThaiStock2D'
    });

  } catch (error) {
    console.error('💥 API Error:', error.message);
    
    // Fallback to demo data
    try {
      console.log('🔄 Using fallback data...');
      const fallbackData = getFallbackData();
      
      res.status(200).json({
        success: true,
        data: fallbackData,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        cached: true,
        message: 'Using demo data (API unavailable)',
        error: error.message
      });
    } catch (fallbackError) {
      console.error('💥 Fallback Error:', fallbackError.message);
      
      // Ultimate fallback
      res.status(200).json({
        success: true,
        data: {
          live: { twod: "89", time: new Date().toLocaleString(), set: "1,250.00", value: "45,000.00" },
          result: [{ twod: "89", open_time: "16:00:00", set: "1,250.00", value: "45,000.00" }]
        },
        timestamp: new Date().toISOString(),
        source: 'emergency-fallback',
        message: 'Emergency fallback data'
      });
    }
  }
}

// Additional helper function for multiple API endpoints
async function tryMultipleEndpoints() {
  const endpoints = [
    'https://api.thaistock2d.com/live',
    'https://api.thaistock2d.com/api/live',
    'https://api.thaistock2d.com/v1/live',
    'https://api.thaistock2d.com/results'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        },
        timeout: 10000
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(`Endpoint ${endpoint} failed:`, error.message);
      continue;
    }
  }
  throw new Error('All endpoints failed');
}
