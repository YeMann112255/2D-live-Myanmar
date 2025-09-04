import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchData();
    const dataInterval = setInterval(fetchData, 5000); // 5 seconds
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    
    return () => {
      clearInterval(dataInterval);
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
        </div>
      </div>

      {/* Today's Results */}
      <div className="results-section">
        <div className="result-item">
          <div className="time-header">11:00 AM</div>
          <div className="data-row">
            <span className="data-label">Set</span>
            <span className="data-label">Value</span>
            <span className="data-label">2D</span>
          </div>
          <div className="data-row">
            <span className="data-value set">1,262.45</span>
            <span className="data-value value">21,100.99</span>
            <span className="data-value number">50</span>
          </div>
        </div>

        <div className="result-item">
          <div className="time-header">12:01 PM</div>
          <div className="data-row">
            <span className="data-label">Set</span>
            <span className="data-label">Value</span>
            <span className="data-label">2D</span>
          </div>
          <div className="data-row">
            <span className="data-value set">1,263.42</span>
            <span className="data-value value">24,622.25</span>
            <span className="data-value number">22</span>
          </div>
        </div>

        <div className="result-item">
          <div className="time-header">03:00 PM</div>
          <div className="data-row">
            <span className="data-label">Set</span>
            <span className="data-label">Value</span>
            <span className="data-label">2D</span>
          </div>
          <div className="data-row">
            <span className="data-value set">1,255.22</span>
            <span className="data-value value">34,766.06</span>
            <span className="data-value number">26</span>
          </div>
        </div>

        <div className="result-item">
          <div className="time-header">04:30 PM</div>
          <div className="data-row">
            <span className="data-label">Set</span>
            <span className="data-label">Value</span>
            <span className="data-label">2D</span>
          </div>
          <div className="data-row">
            <span className="data-value set">1,252.55</span>
            <span className="data-value value">44,813.45</span>
            <span className="data-value number">53</span>
          </div>
        </div>
      </div>

      {/* Auto Refresh Info */}
      <div className="refresh-info">
        <p>🔄 Auto Refresh (5 seconds)</p>
      </div>
    </div>
  );
}
