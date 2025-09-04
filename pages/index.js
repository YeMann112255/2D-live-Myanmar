import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // 30 seconds
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/live');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>လက်ရှိထွက်ဂဏန်းများ ရယူနေသည်...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>ThaiStock 2D - Live Results</title>
        <meta name="description" content="တရားဝင် ထိုင်းထွက်စဉ် 2D နံပါတ်များ" />
      </Head>

      {/* Header Section */}
      <header className="header">
        <h1>ThaiStock 2D</h1>
        <div className="current-time">
          🕒 {currentTime.toLocaleTimeString('my-MM')}
        </div>
      </header>

      {/* Main Live Result */}
      <div className="main-live-card">
        <div className="live-number">
          {data?.live?.twod || '--'}
        </div>
        <div className="live-info">
          <div className="update-time">
            ✓ Updated: {data?.live?.time || new Date().toLocaleString()}
          </div>
          <div className="stock-info">
            <span>Set: {data?.live?.set || '--'}</span>
            <span>Value: {data?.live?.value || '--'}</span>
          </div>
        </div>
      </div>

      {/* Today's Results Table */}
      <div className="results-section">
        <h2>📊 ယနေ့ထွက်ရလဒ်များ</h2>
        
        <div className="results-table">
          {data?.result?.map((item, index) => (
            <div key={index} className="result-row">
              <div className="time-column">
                <div className="time-label">
                  {formatTime(item.stock_datetime) || item.open_time}
                </div>
              </div>
              
              <div className="data-column">
                <div className="data-grid">
                  <div className="data-item">
                    <span className="label">Set</span>
                    <span className="value set-value">{item.set}</span>
                  </div>
                  <div className="data-item">
                    <span className="label">Value</span>
                    <span className="value value-amount">{item.value}</span>
                  </div>
                  <div className="data-item">
                    <span className="label">2D</span>
                    <span className="value number-2d">{item.twod}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto Refresh Info */}
      <div className="refresh-info">
        <p>🔄 အလိုအလျောက်ပြန်လည်မွမ်းမံခြင်း (၃၀ စက္ကန့်)</p>
      </div>
    </div>
  );
}
