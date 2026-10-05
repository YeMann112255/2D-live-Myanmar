import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);

  const [sessionTitle, setSessionTitle] = useState("4:30 PM LIVE");
  const [sessionDay, setSessionDay] = useState("ညနေပိုင်း");
  const [customDate, setCustomDate] = useState("05-10-2026");
  const [pitThee, setPitThee] = useState("5-3-2");
  const [mainNum, setMainNum] = useState("53-57-39");
  const [subNum, setSubNum] = useState("35-23-25");
  const [horThout, setHorThout] = useState("5-9-8");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const myanmarTime = new Date(utc + (3600000 * 6.5));

      let hours = myanmarTime.getHours();
      const minutes = String(myanmarTime.getMinutes()).padStart(2, '0');
      const seconds = String(myanmarTime.getSeconds()).padStart(2, '0');
      
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = String(hours).padStart(2, '0');

      setCurrentTime(`${formattedHours}:${minutes}:${seconds} ${ampm}`);

      if (myanmarTime.getHours() < 13) {
        setSessionTitle("12:01 PM LIVE");
        setSessionDay("မနက်ပိုင်း");
      } else {
        setSessionTitle("4:30 PM LIVE");
        setSessionDay("ညနေပိုင်း");
      }
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

      {/* ဘယ်ဘက်ခြမ်း */}
      <div className="side-card left-card">
        <div className="card-header-red">{sessionTitle}</div>
        <div className="live-clock-box">{currentTime}</div>
        <div className="info-pill-dark">{sessionDay}</div>
        <div className="hor-box">
          <span className="hor-label">📌 ဟောထုပ်</span>
          <span className="hor-val">{horThout}</span>
        </div>
      </div>

      {/* အလယ် ဖုန်းပုံစံ */}
      <div className="phone-container">
        <div className="phone-screen">
          {/* ဖုန်းအပေါ်ပိုင်း Status Bar & Dynamic Island */}
          <div className="phone-status-bar">
            <span className="carrier">6:28</span>
            <div className="dynamic-island"></div>
            <div className="status-icons">📶 🛜 🔋 87</div>
          </div>

          {/* အက်ပ်ခေါင်းစဉ် */}
          <div className="app-header-bar">
            <span className="app-logo">⭐ 2D live Myanmar</span>
            <div className="app-menu-icons">
              <span className="badge-2d">2D</span>
              <span className="badge-3d">3D</span>
              <span>📅</span>
            </div>
          </div>

          {/* ပင်မ Live ဂဏန်းအကြီး */}
          <div className="live-main-display">
            {data?.live?.twod || "57"}
          </div>

          <div className="update-time-indicator">
            <span>✔ Updated: {data?.live?.update_time || "2026-10-05 16:30:13"}</span>
          </div>

          {/* ပွဲစဉ်ကတ်များအုပ်စု */}
          <div className="cards-group">
            {/* 12:01 PM ပွဲစဉ်အကွက် */}
            <div className="result-card-red">
              <div className="card-title-top">12:01 PM</div>
              <div className="card-sub-grid">
                <div className="sub-col">
                  <span className="sub-label">SET</span>
                  <span className="sub-val">{result12?.set || "1,572.80"}</span>
                </div>
                <div className="sub-col">
                  <span className="sub-label">Value</span>
                  <span className="sub-val">{result12?.value || "31,350.28"}</span>
                </div>
                <div className="sub-col">
                  <span className="sub-label">2D</span>
                  <span className="sub-val highlight-num">{result12?.twod || "00"}</span>
                </div>
              </div>
            </div>

            {/* 4:30 PM ပွဲစဉ်အကွက် */}
            <div className="result-card-red">
              <div className="card-title-top">4:30 PM</div>
              <div className="card-sub-grid">
                <div className="sub-col">
                  <span className="sub-label">SET</span>
                  <span className="sub-val">{result1630?.set || "1,576.45"}</span>
                </div>
                <div className="sub-col">
                  <span className="sub-label">Value</span>
                  <span className="sub-val">{result1630?.value || "55,047.95"}</span>
                </div>
                <div className="sub-col">
                  <span className="sub-label">2D</span>
                  <span className="sub-val highlight-num">{result1630?.twod || "57"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ညာဘက်ခြမ်း */}
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
          padding: 30px 50px;
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

        .side-card {
          width: 400px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 3px solid rgba(245, 158, 11, 0.4);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        }
        .card-header-red {
          background: linear-gradient(90deg, #dc2626, #991b1b);
          color: #fff; font-size: 1.8rem; font-weight: 900; padding: 10px; border-radius: 12px; text-align: center;
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
        }
        .live-clock-box {
          background: #000; color: #38bdf8; font-size: 1.7rem; font-weight: 900; padding: 10px; border-radius: 10px; text-align: center; border: 2px solid #38bdf8; letter-spacing: 1px;
        }
        .info-pill-dark {
          background: #1e293b; color: #f8fafc; font-size: 1.4rem; font-weight: 900; padding: 12px; border-radius: 10px; text-align: center; border: 1px solid #475569;
        }
        .hor-box {
          background: #0f172a; border: 2px solid #f59e0b; padding: 12px 16px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; margin-top: 5px;
        }
        .hor-label { font-size: 1.3rem; font-weight: bold; color: #f59e0b; }
        .hor-val { font-size: 1.8rem; font-weight: 900; color: #fff; letter-spacing: 1px; }

        /* ဖုန်းဆိုဒ်နှင့် အတွင်းပိုင်း စာသားများ ကွာဝေးမှုမရှိစေရန် အချိုးကျညှိထားသော ပုံစံ */
        .phone-container {
          width: 480px;
          height: 980px;
          background: #111827;
          border: 10px solid #1f2937;
          border-radius: 44px;
          padding: 10px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.95), inset 0 0 20px rgba(255,255,255,0.15);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .phone-screen {
          background: #ffffff;
          border-radius: 34px;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          color: #000;
          box-sizing: border-box;
        }
        .phone-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          font-weight: bold;
          color: #000;
          padding: 0 4px;
        }
        .dynamic-island {
          width: 100px;
          height: 20px;
          background: #000;
          border-radius: 16px;
        }
        .app-header-bar {
          background: #facc15;
          padding: 6px 12px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
          font-size: 0.95rem;
          box-shadow: 0 4px 10px rgba(250, 204, 21, 0.3);
        }
        .app-logo { color: #000; font-weight: 900; }
        .app-menu-icons { display: flex; gap: 6px; align-items: center; font-size: 0.8rem; }
        .badge-2d { background: #16a34a; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; }
        .badge-3d { background: #2563eb; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; }
        
        .live-main-display {
          font-size: 6.2rem;
          font-weight: 900;
          color: #16a34a;
          text-align: center;
          line-height: 1;
          margin: 0;
          text-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);
        }
        .update-time-indicator {
          text-align: center;
          font-size: 0.8rem;
          color: #16a34a;
          font-weight: bold;
          margin-bottom: 2px;
        }

        .cards-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .result-card-red {
          background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
          border-radius: 12px;
          padding: 8px 14px;
          color: #fff;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.35);
        }
        .card-title-top {
          text-align: center;
          font-weight: 900;
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 3px;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }
        .card-sub-grid {
          display: flex;
          justify-content: space-between;
          text-align: center;
        }
        .sub-col {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .sub-label {
          font-size: 0.65rem;
          opacity: 0.9;
          font-weight: bold;
        }
        .sub-val {
          font-size: 1.15rem;
          font-weight: 900;
        }
        .highlight-num {
          font-size: 1.3rem;
          background: rgba(0,0,0,0.18);
          border-radius: 6px;
          padding: 1px 0;
        }

        .date-display-box {
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          color: #fff; font-size: 2rem; font-weight: 900; padding: 12px; border-radius: 12px; text-align: center; border: 2px solid #fca5a5;
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.4);
        }
        .data-group {
          display: flex; flex-direction: column; gap: 6px;
        }
        .label-badge {
          font-size: 1.1rem; font-weight: 900; padding: 6px 12px; border-radius: 8px; display: inline-block; width: fit-content; color: #fff;
        }
        .gold-bg { background: #b45309; }
        .red-bg { background: #991b1b; }
        .val-display {
          background: #0f172a; font-size: 2.3rem; font-weight: 900; padding: 12px; border-radius: 12px; text-align: center; letter-spacing: 2px; border: 2px solid #334155;
        }
        .gold-text { color: #facc15; border-color: #f59e0b; }
        .red-text { color: #f87171; border-color: #ef4444; }
      `}</style>
    </div>
  );
}
