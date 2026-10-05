import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  
  // Admin မှ ပြင်ဆင်နိုင်သော အချက်အလက်များ
  const [sessionTitle, setSessionTitle] = useState("4:30 PM LIVE");
  const [sessionDay, setSessionDay] = useState("တနင်္လာနေ့ ညနေခင်း");
  const [customDate, setCustomDate] = useState("05-10-2026");
  const [pitThee, setPitThee] = useState("5-3-2");
  const [mainNum, setMainNum] = useState("53-57-39");
  const [subNum, setSubNum] = useState("35-23-25");
  const [horThout, setHorThout] = useState("5-9-8");
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 1000);
    fetchData();
    const dataInterval = setInterval(fetchData, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
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

  const getResult = (time) => data?.result?.find(r => r.open_time === time);
  const result12 = getResult("12:01:00");
  const result1630 = getResult("16:30:00");

  return (
    <div className="stream-container">
      <Head>
        <title>2D LIVE MYANMAR - Pro Stream</title>
      </Head>

      <button className="admin-toggle-btn" onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? "⚙️ ပြီးပြီ" : "⚙️ နေ့စဉ်ဂဏန်းပြောင်းရန်"}
      </button>

      {showAdmin && (
        <div className="admin-panel">
          <h3>📌 2D အချက်အလက်များ ပြင်ဆင်ရန်</h3>
          <div className="input-group"><label>ချိန်/ပွဲစဉ်:</label><input type="text" value={sessionTitle} onChange={(e) => setSessionTitle(e.target.value)} /></div>
          <div className="input-group"><label>နေ့/အမျိုးအစား:</label><input type="text" value={sessionDay} onChange={(e) => setSessionDay(e.target.value)} /></div>
          <div className="input-group"><label>ရက်စွဲ:</label><input type="text" value={customDate} onChange={(e) => setCustomDate(e.target.value)} /></div>
          <div className="input-group"><label>ပိတ်သီး:</label><input type="text" value={pitThee} onChange={(e) => setPitThee(e.target.value)} /></div>
          <div className="input-group"><label>မိန်း:</label><input type="text" value={mainNum} onChange={(e) => setMainNum(e.target.value)} /></div>
          <div className="input-group"><label>အရံ:</label><input type="text" value={subNum} onChange={(e) => setSubNum(e.target.value)} /></div>
          <div className="input-group"><label>ဟောထုပ်:</label><input type="text" value={horThout} onChange={(e) => setHorThout(e.target.value)} /></div>
        </div>
      )}

      {/* ဘယ်ဘက်ခြမ်း (အချိန်၊ ပွဲစဉ်အမည်၊ ဟောထုပ်) */}
      <div className="side-card left-card">
        <div className="card-header-red">{sessionTitle}</div>
        <div className="live-clock-box">{currentTime}</div>
        <div className="info-pill-dark">{sessionDay}</div>
        <div className="hor-box">
          <span className="hor-label">📌 ဟောထုပ်</span>
          <span className="hor-val">{horThout}</span>
        </div>
      </div>

      {/* အလယ်ဖုန်းစခရင်အကြီး */}
      <div className="phone-container">
        <div className="phone-screen">
          <div className="phone-banner">🔴 MYANMAR 2D LIVE</div>
          <div className="live-display-box">
            <span className="live-tag">⚡ လက်ရှိထွက်ပေါ်နေသော ⚡</span>
            <div className="mega-number">{data?.live?.twod || "57"}</div>
          </div>
          <div className="session-grid">
            <div className="ses-item">
              <span className="ses-time">12:01 PM</span>
              <span className="ses-num">{result12?.twod || "00"}</span>
            </div>
            <div className="ses-item">
              <span className="ses-time">4:30 PM</span>
              <span className="ses-num">{result1630?.twod || "57"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ညာဘက်ခြမ်း (ရက်စွဲ၊ ပိတ်သီး၊ မိန်း၊ အရံ) */}
      <div className="side-card right-card">
        <div className="date-display-box">{customDate}</div>
        
        <div className="data-group">
          <div className="label-badge gold-bg">ယနေ့အတွက်ပိတ်သီး</div>
          <div className="val-display gold-text">{pitThee}</div>
        </div>

        <div className="data-group">
          <div className="label-badge red-bg">မိန်း (Main)</div>
          <div className="val-display red-text">{mainNum}</div>
        </div>

        <div className="data-group">
          <div className="label-badge red-bg">အရံ (Sub)</div>
          <div className="val-display red-text">{subNum}</div>
        </div>
      </div>

      <style jsx>{`
        .stream-container {
          width: 1920px;
          height: 1080px;
          background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
          background-image: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%),
                            linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 50px 70px;
          position: relative;
          font-family: 'Pyidaungsu', sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }
        .admin-toggle-btn {
          position: fixed; top: 20px; left: 20px; background: #f59e0b; color: #000; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer; z-index: 99999; font-size: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
        .admin-panel {
          position: fixed; top: 75px; left: 20px; background: #0f172a; border: 2px solid #f59e0b; padding: 15px; border-radius: 12px; z-index: 99999; width: 320px; color: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.8);
        }
        .admin-panel h3 { margin: 0 0 10px 0; color: #facc15; font-size: 1rem; }
        .input-group { display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center; }
        .input-group label { color: #cbd5e1; font-weight: bold; font-size: 0.85rem; }
        .input-group input { background: #1e293b; border: 1px solid #475569; color: #fff; padding: 5px 8px; border-radius: 4px; width: 55%; }

        /* ဘယ်ဘက်ကတ်ပြား ဒီဇိုင်း */
        .side-card {
          width: 420px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(10px);
          border: 3px solid rgba(245, 158, 11, 0.4);
          border-radius: 24px;
          padding: 25px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        }
        .card-header-red {
          background: linear-gradient(90deg, #dc2626, #991b1b);
          color: #fff; font-size: 2rem; font-weight: 900; padding: 12px; border-radius: 14px; text-align: center;
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
        }
        .live-clock-box {
          background: #000; color: #38bdf8; font-size: 2.2rem; font-weight: 900; padding: 12px; border-radius: 12px; text-align: center; border: 2px solid #38bdf8; letter-spacing: 2px;
        }
        .info-pill-dark {
          background: #1e293b; color: #f8fafc; font-size: 1.6rem; font-weight: 900; padding: 15px; border-radius: 12px; text-align: center; border: 1px solid #475569;
        }
        .hor-box {
          background: #0f172a; border: 2px solid #f59e0b; padding: 16px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-top: 10px;
        }
        .hor-label { font-size: 1.4rem; font-weight: bold; color: #f59e0b; }
        .hor-val { font-size: 2rem; font-weight: 900; color: #fff; letter-spacing: 1px; }

        /* အလယ်ဖုန်းစခရင်အကြီး ဒီဇိုင်း */
        .phone-container {
          width: 480px;
          background: #000;
          border: 10px solid #1e293b;
          border-radius: 45px;
          padding: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.9);
        }
        .phone-screen {
          background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
          border-radius: 30px;
          padding: 25px;
          text-align: center;
          color: #000;
        }
        .phone-banner {
          background: #dc2626; color: #fff; font-weight: 900; font-size: 1.2rem; padding: 10px; border-radius: 12px; margin-bottom: 20px;
        }
        .live-display-box {
          background: #0f172a; color: #fff; border-radius: 20px; padding: 25px 15px; margin-bottom: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .live-tag { font-size: 0.95rem; font-weight: bold; color: #f59e0b; letter-spacing: 1px; }
        .mega-number { font-size: 7.5rem; font-weight: 900; color: #4ade80; line-height: 1; margin-top: 10px; text-shadow: 0 0 20px rgba(74, 222, 128, 0.4); }
        .session-grid { display: flex; gap: 12px; }
        .ses-item { flex: 1; background: #e2e8f0; padding: 14px; border-radius: 14px; display: flex; flex-direction: column; gap: 5px; }
        .ses-time { font-size: 0.9rem; font-weight: bold; color: #64748b; }
        .ses-num { font-size: 1.8rem; font-weight: 900; color: #1e293b; }

        /* ညာဘက်ခြမ်း ဒီဇိုင်း */
        .date-display-box {
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          color: #fff; font-size: 2.2rem; font-weight: 900; padding: 14px; border-radius: 14px; text-align: center; border: 2px solid #fca5a5;
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
        }
        .data-group {
          display: flex; flex-direction: column; gap: 8px;
        }
        .label-badge {
          font-size: 1.2rem; font-weight: 900; padding: 8px 15px; border-radius: 10px; display: inline-block; width: fit-content; color: #fff;
        }
        .gold-bg { background: #b45309; }
        .red-bg { background: #991b1b; }
        .val-display {
          background: #0f172a; font-size: 2.6rem; font-weight: 900; padding: 14px; border-radius: 14px; text-align: center; letter-spacing: 2px; border: 2px solid #334155;
        }
        .gold-text { color: #facc15; border-color: #f59e0b; }
        .red-text { color: #f87171; border-color: #ef4444; }
      `}</style>
    </div>
  );
}
