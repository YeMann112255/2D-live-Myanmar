import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // ယနေ့ရက်စွဲ ရယူရန် (ဥပမာ - 5.10.2026)
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    fetchData();
    const interval = setInterval(fetchData, 3000); // 3s auto-refresh
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/live');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>ဒေတာများ ရယူနေပါသည်...</p>
        <style jsx>{`
          .loading-container { text-align: center; padding: 100px 20px; font-family: 'Pyidaungsu', sans-serif; background: #0b1329; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; }
          .spinner { border: 4px solid rgba(245, 158, 11, 0.2); border-top: 4px solid #f59e0b; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin-bottom: 15px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );

  const getResult = (time) => data?.result?.find(r => r.open_time === time);
  const result12 = getResult("12:01:00");
  const result1630 = getResult("16:30:00");

  return (
    <div className="main-container">
      <Head>
        <title>2D LIVE MYANMAR - Pro Stream Overlay</title>
      </Head>

      {/* Header Banner */}
      <div className="header-banner">
        <div className="top-row">
          <div className="live-badge-top">🔴 LIVE</div>
          <div className="youtube-badge">▶ YouTube LIVE STREAM</div>
        </div>
        
        <div className="flag-title-wrap">
          <div className="myanmar-flag">
            <span className="star">★</span>
          </div>
          <div className="title-group">
            <h1 className="main-2d-text">2D</h1>
            <h2 className="sub-live-text">LIVE MYANMAR</h2>
          </div>
        </div>

        <div className="date-pill">
          {currentDate}
        </div>
      </div>

      {/* Content Card Area */}
      <div className="content-card">
        {/* Live Main Number Box */}
        <div className="live-header-bar">• LIVE</div>
        <div className="live-number-display">
          {data?.live?.twod || "06"}
        </div>

        {/* SET & VALUE Grid */}
        <div className="market-grid">
          <div className="market-box set-box">
            <div className="m-title">SET</div>
            <div className="m-val">{data?.live?.set || "1,572.80"}</div>
          </div>
          <div className="market-box val-box">
            <div className="m-title">VALUE</div>
            <div className="m-val">{data?.live?.value || "31,366.90"}</div>
          </div>
        </div>

        {/* Purple Middle Result Bar */}
        <div className="purple-result-row">
          <div className="p-label">2D</div>
          <div className="p-val">{data?.live?.twod || "06"}</div>
        </div>

        {/* Sessions List (12:01 & 4:30) */}
        <div className="session-rows">
          <div className="s-row">
            <div className="s-time-info">
              <span className="clock-icon">🕒</span>
              <div>
                <strong>12:01 PM</strong>
                <p>(Open Result)</p>
              </div>
            </div>
            <div className="s-res-display">
              <span>2D :</span> <strong className="red-text">{result12?.twod || "06"}</strong>
            </div>
          </div>

          <div className="s-row">
            <div className="s-time-info">
              <span className="clock-icon">🕒</span>
              <div>
                <strong>4:30 PM</strong>
                <p>(Final Result)</p>
              </div>
            </div>
            <div className="s-res-display">
              <span>2D :</span> <strong className="red-text">{result1630?.twod || "--"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banners */}
      <div className="footer-promo">
        <div className="promo-text-badge">
          2D လက်ဆောင် <br/>တင့်တ်က်ပါစေ ❤️
        </div>
        <div className="subscribe-badge">
          ▶ SUBSCRIBE <br/><small>LIKE & SHARE 🔔</small>
        </div>
      </div>

      <div className="footer-brand">
        🌿 — 2D LIVE MYANMAR — 🌿
      </div>

      {/* Styles */}
      <style jsx>{`
        .main-container {
          max-width: 480px;
          margin: 0 auto;
          background: linear-gradient(135deg, #070d1d 0%, #0d1b3e 50%, #050a17 100%);
          min-height: 100vh;
          font-family: 'Pyidaungsu', sans-serif;
          color: #fff;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          box-shadow: 0 0 40px rgba(0,0,0,0.8);
        }

        .header-banner {
          text-align: center;
          padding-top: 5px;
        }

        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .live-badge-top {
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 3px 10px;
          border-radius: 6px;
          letter-spacing: 1px;
        }

        .youtube-badge {
          background: #ff0000;
          color: white;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .flag-title-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 5px 0;
        }

        .myanmar-flag {
          width: 45px;
          height: 30px;
          background: linear-gradient(to bottom, #ffcc00 33%, #34b233 33%, #34b233 66%, #ce1126 66%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        .star { color: white; font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }

        .title-group h1 {
          font-size: 2.8rem;
          font-weight: 900;
          color: #ffeb3b;
          margin: 0;
          line-height: 1;
          text-shadow: 2px 2px 0px #d97706, 0 0 15px rgba(255, 235, 59, 0.6);
          font-style: italic;
        }

        .title-group h2 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 2px 0 0 0;
          letter-spacing: 1.5px;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
        }

        .date-pill {
          display: inline-block;
          background: linear-gradient(90deg, #fbbf24, #f59e0b, #d97706);
          color: #000;
          font-size: 1.3rem;
          font-weight: 900;
          padding: 4px 25px;
          border-radius: 20px;
          margin: 8px 0 12px 0;
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
          border: 1px solid #fff;
        }

        .content-card {
          background: #ffffff;
          color: #000;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          border: 3px solid #f59e0b;
        }

        .live-header-bar {
          background: #e11d48;
          color: white;
          text-align: center;
          font-weight: bold;
          font-size: 0.9rem;
          padding: 4px;
          letter-spacing: 1px;
        }

        .live-number-display {
          font-size: 5.5rem;
          font-weight: 900;
          color: #dc2626;
          text-align: center;
          line-height: 1.1;
          margin: 5px 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .market-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 2px solid #e5e7eb;
          border-bottom: 2px solid #e5e7eb;
        }

        .market-box {
          padding: 8px;
          text-align: center;
        }
        .set-box { background: #1d4ed8; color: white; border-right: 2px solid #e5e7eb; }
        .val-box { background: #15803d; color: white; }

        .m-title { font-size: 0.8rem; font-weight: bold; letter-spacing: 1px; }
        .m-val { font-size: 1.2rem; font-weight: 900; margin-top: 2px; }

        .purple-result-row {
          background: #7c3aed;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 20px;
          font-size: 1.2rem;
          font-weight: bold;
        }
        .p-val { font-size: 1.5rem; color: #fde047; }

        .session-rows {
          padding: 10px 15px;
          background: #f8fafc;
        }

        .s-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .s-row:last-child { border-bottom: none; }

        .s-time-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1e293b;
        }
        .clock-icon { font-size: 1.2rem; }
        .s-time-info strong { font-size: 0.95rem; display: block; line-height: 1.1; }
        .s-time-info p { font-size: 0.7rem; color: #64748b; margin: 0; }

        .s-res-display {
          font-size: 1.1rem;
          font-weight: bold;
          color: #334155;
        }
        .red-text { color: #dc2626; font-size: 1.4rem; margin-left: 5px; }

        .footer-promo {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 10px;
          margin: 15px 0 10px 0;
        }

        .promo-text-badge {
          background: linear-gradient(95deg, #fef08a, #facc15, #eab308);
          color: #111827;
          font-weight: 900;
          text-align: center;
          padding: 8px;
          border-radius: 12px;
          font-size: 0.85rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border: 2px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.2;
        }

        .subscribe-badge {
          background: linear-gradient(95deg, #dc2626, #b91c1c);
          color: white;
          font-weight: 900;
          text-align: center;
          padding: 8px;
          border-radius: 12px;
          font-size: 0.85rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border: 2px solid #fff;
          line-height: 1.2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .subscribe-badge small { font-size: 0.7rem; font-weight: normal; color: #fecaca; }

        .footer-brand {
          text-align: center;
          color: #fbbf24;
          font-size: 0.85rem;
          font-weight: bold;
          letter-spacing: 2px;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}
