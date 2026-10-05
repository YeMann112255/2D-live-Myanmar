import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    setCurrentDate(formattedDate);

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Play error:", err);
        });
      }
    }
  };

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
          .loading-container { text-align: center; padding: 100px 20px; font-family: 'Pyidaungsu', sans-serif; background: #030712; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; }
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
        <title>2D LIVE MYANMAR - Premium Stream</title>
      </Head>

      {/* 100% Copyright-Free Audio (Google Sound Library / Safe for YouTube Live) */}
      <audio 
        ref={audioRef} 
        src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg" 
        loop 
      />

      {/* Top Header Glow Bar */}
      <div className="header-banner">
        <div className="top-row">
          <div className="live-badge-top"><span>🔴</span> LIVE STREAM</div>
          <div className="youtube-badge"><span>▶</span> YOUTUBE EXCLUSIVE</div>
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
          <span>📅</span> {currentDate}
        </div>
      </div>

      {/* Modern Glassmorphism Card */}
      <div className="content-card">
        <div className="live-header-bar">
          <span className="blink-dot">●</span> OFFICIAL LIVE RESULT
        </div>
        
        {/* Main Big Number Box */}
        <div className="live-number-wrapper">
          <div className="live-number-display">
            {data?.live?.twod || "06"}
          </div>
          <div className="live-sub-tag">⚡ လက်ရှိထွက်ပေါ်နေသော ဂဏန်း ⚡</div>
        </div>

        {/* SET & VALUE Gorgeous Grid */}
        <div className="market-grid">
          <div className="market-box set-box">
            <div className="m-title">📈 SET MARKET</div>
            <div className="m-val">{data?.live?.set || "1,574.60"}</div>
          </div>
          <div className="market-box val-box">
            <div className="m-title">💰 VALUE AMOUNT</div>
            <div className="m-val">{data?.live?.value || "48,146.72"}</div>
          </div>
        </div>

        {/* Sessions List (12:01 & 4:30) */}
        <div className="session-rows">
          <div className="s-row">
            <div className="s-time-info">
              <div className="time-icon-box">🕒</div>
              <div>
                <strong>12:01 PM</strong>
                <p>Open Result Session</p>
              </div>
            </div>
            <div className="s-res-display">
              <span className="s-label-sm">2D :</span> 
              <strong className="red-text">{result12?.twod || "00"}</strong>
            </div>
          </div>

          <div className="s-row">
            <div className="s-time-info">
              <div className="time-icon-box">🕒</div>
              <div>
                <strong>4:30 PM</strong>
                <p>Final Result Session</p>
              </div>
            </div>
            <div className="s-res-display">
              <span className="s-label-sm">2D :</span> 
              <strong className="red-text">{result1630?.twod || "--"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Interactive Banners */}
      <div className="footer-promo">
        <div className="promo-text-badge">
          🎁 2D လက်ဆောင် <br/>ကံထူးကြပါစေ ❤
        </div>
        <div className="subscribe-badge" onClick={togglePlay}>
          <span>{isPlaying ? "🎵 BGM: တီးခတ်နေသည်" : "🔇 BGM: ပိတ်ထားသည်"}</span>
          <small>{isPlaying ? "တေးဂီတပိတ်ရန် နှိပ်ပါ" : "တေးဂီတဖွင့်ရန် နှိပ်ပါ"}</small>
        </div>
      </div>

      <div className="footer-brand">
        ✨ — 2D LIVE MYANMAR OFFICIAL — ✨
      </div>

      {/* Styling */}
      <style jsx>{`
        .main-container {
          max-width: 480px;
          margin: 0 auto;
          background: linear-gradient(135deg, #090d16 0%, #030712 50%, #0f172a 100%);
          min-height: 100vh;
          font-family: 'Pyidaungsu', sans-serif;
          color: #fff;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          box-shadow: 0 0 60px rgba(0,0,0,0.95);
        }
        .header-banner { text-align: center; padding-top: 4px; }
        .top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .live-badge-top { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 20px; letter-spacing: 1px; box-shadow: 0 0 15px rgba(239, 68, 68, 0.6); display: flex; align-items: center; gap: 5px; }
        .youtube-badge { background: rgba(220, 38, 38, 0.15); color: #f87171; border: 1px solid rgba(220, 38, 38, 0.4); font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; display: flex; align-items: center; gap: 4px; }
        .flag-title-wrap { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 6px 0; }
        .myanmar-flag { width: 46px; height: 32px; background: linear-gradient(to bottom, #ffcc00 33%, #34b233 33%, #34b233 66%, #ce1126 66%); border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(255, 204, 0, 0.4); border: 1.5px solid rgba(255,255,255,0.3); }
        .star { color: white; font-size: 16px; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }
        .title-group h1 { font-size: 2.8rem; font-weight: 900; color: #facc15; margin: 0; line-height: 1; text-shadow: 2px 2px 0px #b45309, 0 0 30px rgba(250, 204, 21, 0.7); font-style: italic; letter-spacing: 2px; }
        .title-group h2 { font-size: 1.1rem; font-weight: 800; color: #f1f5f9; margin: 2px 0 0 0; letter-spacing: 3px; }
        .date-pill { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000; font-size: 1.25rem; font-weight: 900; padding: 6px 24px; border-radius: 30px; margin: 10px 0 14px 0; box-shadow: 0 0 20px rgba(245, 158, 11, 0.5); border: 2px solid #fff; letter-spacing: 1px; }
        .content-card { background: rgba(255, 255, 255, 0.98); color: #0f172a; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(245, 158, 11, 0.2); border: 2.5px solid #f59e0b; }
        .live-header-bar { background: linear-gradient(90deg, #991b1b, #dc2626, #991b1b); color: white; text-align: center; font-weight: 800; font-size: 0.85rem; padding: 7px; letter-spacing: 2px; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .blink-dot { color: #4ade80; animation: blink 1s infinite alternate; }
        @keyframes blink { 0% { opacity: 0.2; } 100% { opacity: 1; } }
        .live-number-wrapper { background: linear-gradient(to bottom, #ffffff, #fffbeb); padding: 16px 0 10px 0; text-align: center; }
        .live-number-display { font-size: 6.8rem; font-weight: 900; color: #dc2626; line-height: 1; text-shadow: 4px 4px 10px rgba(220, 38, 38, 0.25); animation: pulseBounce 1.5s infinite ease-in-out; }
        .live-sub-tag { font-size: 0.75rem; font-weight: 700; color: #d97706; margin-top: 6px; letter-spacing: 1px; }
        @keyframes pulseBounce { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .market-grid { display: grid; grid-template-columns: 1fr 1fr; border-top: 2px solid #e2e8f0; border-bottom: 2px solid #e2e8f0; }
        .market-box { padding: 12px; text-align: center; }
        .set-box { background: linear-gradient(135deg, #1e40af, #1d4ed8); color: white; border-right: 2px solid #e2e8f0; }
        .val-box { background: linear-gradient(135deg, #166534, #15803d); color: white; }
        .m-title { font-size: 0.72rem; font-weight: 800; letter-spacing: 1px; opacity: 0.95; }
        .m-val { font-size: 1.2rem; font-weight: 900; margin-top: 4px; letter-spacing: 0.5px; }
        .session-rows { padding: 14px 20px; background: #f8fafc; }
        .s-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
        .s-row:last-child { border-bottom: none; }
        .s-time-info { display: flex; align-items: center; gap: 10px; color: #1e293b; }
        .time-icon-box { background: #e2e8f0; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .s-time-info strong { font-size: 0.95rem; display: block; line-height: 1.1; color: #0f172a; }
        .s-time-info p { font-size: 0.72rem; color: #64748b; margin: 2px 0 0 0; }
        .s-res-display { display: flex; align-items: center; gap: 6px; }
        .s-label-sm { font-size: 0.95rem; font-weight: bold; color: #475569; }
        .red-text { color: #dc2626; font-size: 1.55rem; font-weight: 900; }
        .footer-promo { display: grid; grid-template-columns: 1fr 1.2fr; gap: 12px; margin: 14px 0 8px 0; }
        .promo-text-badge { background: linear-gradient(135deg, #fef08a 0%, #facc15 50%, #ca8a04 100%); color: #111827; font-weight: 900; text-align: center; padding: 10px; border-radius: 16px; font-size: 0.85rem; box-shadow: 0 0 15px rgba(250, 204, 21, 0.4); border: 2px solid #fff; display: flex; align-items: center; justify-content: center; line-height: 1.3; }
        .subscribe-badge { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; font-weight: 900; text-align: center; padding: 10px; border-radius: 16px; font-size: 0.85rem; box-shadow: 0 0 15px rgba(220, 38, 38, 0.5); border: 2px solid #fff; line-height: 1.3; display: flex; flex-direction: column; justify-content: center; cursor: pointer; transition: 0.2s; }
        .subscribe-badge:hover { transform: scale(0.98); opacity: 0.9; }
        .subscribe-badge small { font-size: 0.7rem; font-weight: normal; color: #fecaca; }
        .footer-brand { text-align: center; color: #fbbf24; font-size: 0.85rem; font-weight: bold; letter-spacing: 3px; margin-top: 4px; text-shadow: 0 0 10px rgba(251, 191, 36, 0.6); }
      `}</style>
    </div>
  );
}
