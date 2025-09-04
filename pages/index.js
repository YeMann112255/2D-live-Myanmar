import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLiveData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/live');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError('ဒေတာရယူ၍မရပါ');
      }
    } catch (err) {
      setError('ချိတ်ဆက်မှုအမှား');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>2D Live Myanmar</title>
        <meta name="description" content="Thai Lottery 2D Live Results" />
      </Head>

      <header className="header">
        <h1>🎯 2D Live Myanmar</h1>
        <p>ထိုင်းတရားဝင်ထွက်ဂဏန်းများ</p>
      </header>

      <main className="main">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>လက်ရှိထွက်ဂဏန်းများရယူနေသည်...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h3>❌ အမှားတစ်ခုဖြစ်နေသည်</h3>
            <p>{error}</p>
            <button onClick={fetchLiveData}>ပြန်ယူမည်</button>
          </div>
        )}

        {data && data.live && (
          <div className="live-card">
            <h2>လက်ရှိထွက်ဂဏန်း</h2>
            <div className="live-number">{data.live.twod}</div>
            <div className="live-info">
              <p>🕒 အချိန်: <span>{data.live.time}</span></p>
              <p>📊 စတော့: <span>{data.live.set}</span></p>
              <p>💰 တန်ဖိုး: <span>{data.live.value}</span></p>
            </div>
          </div>
        )}

        {data && data.result && (
          <div className="history-section">
            <h3>ယနေ့ထွက်ဂဏန်းများ</h3>
            <div className="history-list">
              {data.result.slice(0, 5).map((item, index) => (
                <div key={index} className="history-item">
                  <span className="time">{item.open_time}</span>
                  <span className="number">{item.twod}</span>
                  <span className="value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 2D Live Myanmar</p>
        <button onClick={fetchLiveData} className="refresh-btn">
          🔄 နောက်ဆုံးရရလဒ်များ
        </button>
      </footer>
    </div>
  );
}
