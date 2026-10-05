import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    fetchData();
    const interval = setInterval(fetchData, 3000);
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
          .loading-container { text-align: center; padding: 100px 20px; font-family: 'Pyidaungsu', sans-serif; background: #040814; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; }
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
          <div className="youtube-badge">▶ YOUTUBE LIVE STREAM</div>
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
        <div className="live-header-bar">● LIVE STREAMING</div>
        
        <div className="live-number-wrapper">
          <div className="live-number-display">
            {data?.live?.twod || "06"}
          </div>
        </div>

        {/* SET & VALUE Grid */}
        <div className="market-grid">
          <div className="market-box set-box">
            <div className="m-title">SET MARKET</div>
            <div className="m-val">{data?.live?.set || "1,573.87"}</div>
          </div>
          <div className="market-box val-box">
            <div className="m-title">VALUE AMOUNT</div>
            <div className="m-val">{data?.live?.value || "41,395.24"}</div>
          </div>
        </div>

        {/* Purple Middle Result Bar */}
        <div className="purple-result-row">
          <div className="p-label">REAL-TIME 2D</div>
          <div className="p-val">{data?.live?.twod || "06"}</div>
        </div>

        {/* Sessions List (12:01 & 4:30) */}
        <div className="session-rows">
          <div className="s-row">
            <div className="s-time-info">
              <span className="clock-icon">🕒</span>
              <div>
                <strong>12:01 PM</strong>
                <p>Open Result</p>
              </div>
            </div>
            <div className="s-res-display">
              <span>2D :</span> <strong className="red-text">{result12?.twod || "00"}</strong>
            </div>
          </div>

          <div className="s-row">
            <div className="s-time-info">
              <span className="clock-icon">🕒</span>
              <div>
                <strong>4:30 PM</strong>
                <p>Final Result</p>
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
          ✨ 2D လက်ဆောင် <br/>ကံထူးပါစေ ❤️️
        </div>
        <div className="subscribe-badge">
          ▶ SUBSCRIBE <br/><small>LIKE & SHARE 🔔</small>
        </div>
      </div>

      <div className="footer-brand">
        🌿 — 2D LIVE MYANMAR OFFICIAL — 🌿
      </div>

      {/* Styles */}
      <style jsx>{`
        .main-container {
          max-width: 480px;
          margin: 0 auto;
          background: radial-gradient(circle at center, #0f172a 0%, #030712 100%);
          min-height: 100vh;
          font-family: 'Pyidaungsu', sans-serif;
          color: #fff;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          box-shadow: 0 0 50px rgba(0,0,0,0.9);
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
          padding: 3px 12px;
          border-radius: 6px;
          letter-spacing: 1px;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
        }

        .youtube-badge {
          background: #dc2626;
          color: white;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 3px 10px;
          border-radius: 6px;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.6);
        }

        .flag-title-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 8px 0;
        }

        .myanmar-flag {
          width: 48px;
          height: 32px;
          background: linear-gradient(to bottom, #ffcc00 33%, #34b233 33%, #34b233 66%, #ce1126 66%);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(255, 204, 0, 0.5);
          border: 1px solid rgba(255,255,255,0.3);
        }
        .star { color: white; font-size: 18px; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }

        .title-group h1 {
          font-size: 3rem;
          font-weight: 900;
          color: #facc15;
          margin: 0;
          line-height: 1;
          text-shadow: 3px 3px 0px #b45309, 0 0 25px rgba(250, 204, 21, 0.8);
          font-style: italic;
          letter-spacing: 2px;
        }

        .title-group h2 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #f8fafc;
          margin: 3px 0 0 0;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.9);
        }

        .date-pill {
          display: inline-block;
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #000;
          font-size: 1.35rem;
          font-weight: 900;
          padding: 5px 28px;
          border-radius: 25px;
          margin: 10px 0 14px 0;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
          border: 2px solid #fff;
          letter-spacing: 1px;
        }

        .content-card {
          background: #ffffff;
          color: #000;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.7);
          border: 3px solid #f59e0b;
        }

        .live-header-bar {
          background: linear-gradient(90deg, #be123c, #e11d48, #be123c);
          color: white;
          text-align: center;
          font-weight: bold;
          font-size: 0.9rem;
          padding: 6px;
          letter-spacing: 2px;
        }

        /* 💥 Live Number Animation (ခုန်နေစေရန်) */
        .live-number-wrapper {
          background: #ffffff;
          padding: 10px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .live-number-display {
          font-size: 6.2rem;
          font-weight: 900;
          color: #dc2626;
          line-height: 1;
          text-shadow: 4px 4px 8px rgba(220, 38, 38, 0.2);
          animation: pulseBounce 1.2s infinite ease-in-out;
        }

        @keyframes pulseBounce {
          0% { transform: scale(1); text-shadow: 0 0 10px rgba(220,38,38,0.2); }
          50% { transform: scale(1.08); text-shadow: 0 0 25px rgba(220,38,38,0.5); }
          100% { transform: scale(1); text-shadow: 0 0 10px rgba(220,38,38,0.2); }
        }

        .market-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 2px solid #e5e7eb;
          border-bottom: 2px solid #e5e7eb;
        }

        .market-box {
          padding: 10px;
          text-align: center;
        }
        .set-box { background: #1d4ed8; color: white; border-right: 2px solid #e5e7eb; }
        .val-box { background: #15803d; color: white; }

        .m-title { font-size: 0.75rem; font-weight: bold; letter-spacing: 1px; opacity: 0.9; }
        .m-val { font-size: 1.25rem; font-weight: 900; margin-top: 3px; letter-spacing: 0.5px; }

        .purple-result-row {
          background: linear-gradient(90deg, #6d28d9, #7c3aed, #6d28d9);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 22px;
          font-size: 1.1rem;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .p-val { font-size: 1.6rem; color: #fde047; text-shadow: 0 0 10px rgba(253, 224, 71, 0.6); }

        .session-rows {
          padding: 12px 18px;
          background: #f8fafc;
        }

        .s-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .s-row:last-child { border-bottom: none; }

        .s-time-info {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #1e293b;
        }
        .clock-icon { font-size: 1.3rem; }
        .s-time-info strong { font-size: 1rem; display: block; line-height: 1.1; color: #0f172a; }
        .s-time-info p { font-size: 0.75rem; color: #64748b; margin: 2px 0 0 0; }

        .s-res-display {
          font-size: 1.1rem;
          font-weight: bold;
          color: #334155;
        }
        .red-text { color: #dc2626; font-size: 1.5rem; margin-left: 6px; }

        .footer-promo {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 12px;
          margin: 15px 0 10px 0;
        }

        .promo-text-badge {
          background: linear-gradient(135deg, #fef08a 0%, #facc15 50%, #ca8a04 100%);
          color: #111827;
          font-weight: 900;
          text-align: center;
          padding: 10px;
          border-radius: 14px;
          font-size: 0.9rem;
          box-shadow: 0 0 15px rgba(250, 204, 21, 0.4);
          border: 2px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.3;
        }

        .subscribe-badge {
          background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
          color: white;
          font-weight: 900;
          text-align: center;
          padding: 10px;
          border-radius: 14px;
          font-size: 0.9rem;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
          border: 2px solid #fff;
          line-height: 1.3;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .subscribe-badge small { font-size: 0.72rem; font-weight: normal; color: #fecaca; }

        .footer-brand {
          text-align: center;
          color: #fbbf24;
          font-size: 0.9rem;
          font-weight: bold;
          letter-spacing: 3px;
          margin-top: 5px;
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
        }
      `}</style>
    </div>
  );
}
