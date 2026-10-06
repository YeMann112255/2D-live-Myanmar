import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);

  const [sessionTitle, setSessionTitle] = useState("4:30 PM");
  const [sessionDay, setSessionDay] = useState("တန်လုံနေ့ ညနေခင်း");
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
        setSessionTitle("12:01 PM");
        setSessionDay("မနက်ပိုင်း");
      } else {
        setSessionTitle("4:30 PM");
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
      if (json) {
        setData(json.data || json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Result များကို ရှာဖွေရာတွင် အချိန်ပုံစံ ကွဲလွဲမှုမရှိစေရန် စစ်ဆေးခြင်း
  const getResult = (timeKey) => {
    if (!data?.result) return null;
    return data.result.find(r => r.open_time && r.open_time.includes(timeKey));
  };

  const result12 = getResult("12:01");
  const result1630 = getResult("16:30");

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
          <div className="input-group"><label>ဟောထိပ်:</label><input type="text" value={horThout} onChange={(e) => setHorThout(e.target.value)} /></div>
        </div>
      )}

      {/* ဘယ်ဘက်ခြမ်း */}
      <div className="side-card left-card">
        <div className="top-red-banner">{sessionTitle}</div>
        <div className="live-clock-box">{currentTime}</div>
        <div className="red-label-box">{sessionDay}</div>
        
        <div className="youtube-subscribe-tag">
          <span className="yt-icon">▶</span>
          <span className="yt-text">SUBSCRIBE</span>
        </div>

        <div className="horthout-box">
          <span className="ht-label">ဟောထိပ်</span>
          <span className="ht-val">{horThout}</span>
        </div>
      </div>

      {/* အလယ် ဖုန်းပုံစံ */}
      <div className="phone-container">
        <div className="phone-screen">
          <div className="phone-status-bar">
            <span className="carrier">7:00</span>
            <div className="dynamic-island"></div>
            <div className="status-icons">📶 🛜 🔋 49</div>
          </div>

          <div className="app-header-bar">
            <span className="app-logo">⭐ 2D live Myanmar</span>
            <div className="app-menu-icons">
              <span className="badge-2d">2D</span>
              <span className="badge-3d">3D</span>
              <span>📅</span>
            </div>
          </div>

          <div className="live-status-pill">
            <span className="pulsing-dot"></span>
            <span>LIVE REAL-TIME UPDATES</span>
          </div>

          {/* ခုန်နေသည့် Animation ပါသော Live ဂဏန်းအကြီး */}
          <div className="live-main-display">
            {data?.live?.twod || "33"}
          </div>

          <div className="update-time-indicator">
            <span>✔ Updated: {data?.live?.update_time || "2026-10-05 16:30:13"}</span>
          </div>

          <div className="cards-group">
            <div className="result-card-red">
              <div className="card-title-top">12:01 PM Result</div>
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

            <div className="result-card-red">
              <div className="card-title-top">4:30 PM Result</div>
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

          <div className="phone-subscribe-footer">
            <span className="sub-icon">👍</span>
            <span className="sub-text">LIKE & SUBSCRIBE</span>
            <span className="sub-bell">🔔</span>
          </div>

        </div>
      </div>

      {/* ညာဘက်ခြမ်း */}
      <div className="side-card right-card">
        <div className="date-display-box">{customDate}</div>
        
        <div className="data-section-group">
          <div className="purple-badge-wrapper">
            <span className="purple-circle-badge">ယနေ့အတွက်ပတ်သီး</span>
          </div>
          <div className="val-display-pro">{pitThee}</div>
        </div>

        <div className="data-section-group">
          <div className="purple-badge-wrapper">
            <span className="purple-circle-badge">မိန်း (Main)</span>
          </div>
          <div className="val-display-pro">{mainNum}</div>
        </div>

        <div className="data-section-group">
          <div className="purple-badge-wrapper">
            <span className="purple-circle-badge">အရံ (Sub)</span>
          </div>
          <div className="val-display-pro">{subNum}</div>
        </div>
      </div>

      <style jsx>{`
        .stream-container {
          width: 1920px;
          height: 1080px;
          background: linear-gradient(135deg, #ffdf40 0%, #ffbb00 100%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 35px;
          position: relative;
          font-family: 'Pyidaungsu', sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }
        .admin-toggle-btn {
          position: fixed; top: 20px; left: 20px; background: #000; color: #ffd700; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer; z-index: 99999; font-size: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
        .admin-panel {
          position: fixed; top: 75px; left: 20px; background: #111; border: 2px solid #ffd700; padding: 15px; border-radius: 12px; z-index: 99999; width: 320px; color: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.8);
        }
        .admin-panel h3 { margin: 0 0 10px 0; color: #ffd700; font-size: 1rem; }
        .input-group { display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center; }
        .input-group label { color: #ccc; font-weight: bold; font-size: 0.85rem; }
        .input-group input { background: #222; border: 1px solid #555; color: #fff; padding: 5px 8px; border-radius: 4px; width: 55%; }

        .side-card {
          width: 510px;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(10px);
          border: 4px solid #ffffff;
          border-radius: 26px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }
        
        .top-red-banner {
          background: linear-gradient(135deg, #e60000 0%, #990000 100%);
          color: #fff; font-size: 3.2rem; font-weight: 900; padding: 14px; border-radius: 16px; text-align: center;
          border: 3px solid #ff6666;
          box-shadow: 0 6px 15px rgba(230, 0, 0, 0.4);
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .live-clock-box {
          background: #fff; color: #111; font-size: 2.5rem; font-weight: 900; padding: 14px; border-radius: 14px; text-align: center; border: 3px solid #e60000;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .red-label-box {
          background: linear-gradient(90deg, #e60000, #b30000); color: #fff; font-size: 2rem; font-weight: 900; padding: 14px; border-radius: 14px; text-align: center;
          border: 2px solid #ff6666;
          box-shadow: 0 4px 10px rgba(230, 0, 0, 0.3);
        }
        .youtube-subscribe-tag {
          background: linear-gradient(90deg, #ff0000, #800000); color: #fff; font-size: 1.6rem; font-weight: 900; padding: 12px; border-radius: 12px; text-align: center;
          display: flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid #ff8080;
          box-shadow: 0 4px 10px rgba(255,0,0,0.3);
        }
        .horthout-box {
          background: #fff; border: 4px solid #e60000; border-radius: 16px; padding: 12px 18px; text-align: center; display: flex; justify-content: space-between; align-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .ht-label { background: #e60000; color: #fff; font-size: 1.6rem; font-weight: 900; padding: 10px 18px; border-radius: 10px; }
        .ht-val { font-size: 3.2rem; font-weight: 900; color: #cc0000; flex: 1; text-align: center; letter-spacing: 4px; }

        .date-display-box {
          background: linear-gradient(135deg, #e60000 0%, #990000 100%);
          color: #fff; font-size: 2.8rem; font-weight: 900; padding: 14px; border-radius: 16px; text-align: center; border: 3px solid #ff6666;
          box-shadow: 0 6px 15px rgba(230, 0, 0, 0.4);
        }

        .data-section-group {
          background: #fff;
          border: 4px solid #e60000;
          border-radius: 18px;
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .purple-badge-wrapper {
          text-align: center;
          margin-top: -32px;
        }
        .purple-circle-badge {
          background: linear-gradient(135deg, #7c3aed 100%, #5b21b6 0%);
          color: #fff;
          font-size: 1.4rem;
          font-weight: 900;
          padding: 8px 28px;
          border-radius: 30px;
          border: 3px solid #fff;
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.4);
          display: inline-block;
        }
        .val-display-pro {
          font-size: 3.4rem;
          font-weight: 900;
          color: #cc0000;
          text-align: center;
          letter-spacing: 5px;
          padding: 6px 0;
        }

        .phone-container {
          width: 420px;
          height: 1020px;
          background: #111827;
          border: 8px solid #1f2937;
          border-radius: 38px;
          padding: 8px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.4);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .phone-screen {
          background: #ffffff;
          border-radius: 30px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          color: #000;
          box-sizing: border-box;
        }
        .phone-status-bar { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: bold; }
        .dynamic-island { width: 100px; height: 18px; background: #000; border-radius: 12px; }
        .app-header-bar { background: #ffcc00; padding: 6px 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-size: 1rem; }
        .app-logo { color: #000; font-weight: 900; }
        .app-menu-icons { display: flex; gap: 6px; align-items: center; font-size: 0.8rem; }
        .badge-2d { background: #16a34a; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; }
        .badge-3d { background: #2563eb; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; }
        
        .live-status-pill {
          background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; font-size: 0.75rem; font-weight: 900; padding: 3px 8px; border-radius: 20px; display: flex; align-items: center; justify-content: center; gap: 6px; width: fit-content; margin: 2px auto;
        }
        .pulsing-dot { width: 8px; height: 8px; background-color: #16a34a; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.6); } 70% { box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); } 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); } }

        /* လိုင်းပေါ်တွင် ဂဏန်းအကြီး ခုန်နေစေရန် (Heartbeat Animation) */
        .live-main-display {
          font-size: 6rem;
          font-weight: 900;
          color: #16a34a;
          text-align: center;
          line-height: 1;
          margin: 2px 0;
          text-shadow: 0 4px 12px rgba(22, 163, 74, 0.25);
          display: inline-block;
          width: 100%;
          animation: heartbeat 1.2s infinite;
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.08); }
          40% { transform: scale(0.95); }
          60% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }

        .update-time-indicator { text-align: center; font-size: 0.75rem; color: #16a34a; font-weight: bold; margin-bottom: 4px; }

        .cards-group { display: flex; flex-direction: column; gap: 8px; }
        .result-card-red { background: linear-gradient(135deg, #ff4d4d 0%, #e60000 100%); border-radius: 12px; padding: 8px 12px; color: #fff; box-shadow: 0 4px 10px rgba(230,0,0,0.3); }
        .card-title-top { text-align: center; font-weight: 900; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 2px; margin-bottom: 4px; }
        .card-sub-grid { display: flex; justify-content: space-between; text-align: center; }
        .sub-col { flex: 1; display: flex; flex-direction: column; }
        .sub-label { font-size: 0.65rem; opacity: 0.9; font-weight: bold; }
        .sub-val { font-size: 1.15rem; font-weight: 900; }
        .highlight-num { font-size: 1.3rem; background: rgba(0,0,0,0.2); border-radius: 6px; padding: 1px 0; }

        .phone-subscribe-footer {
          background: linear-gradient(90deg, #e60000, #990000); color: #fff; border-radius: 10px; padding: 8px; display: flex; justify-content: center; align-items: center; gap: 8px; font-weight: 900; font-size: 0.9rem;
          box-shadow: 0 4px 10px rgba(230,0,0,0.3);
          margin-top: 4px;
        }
        .sub-icon { font-size: 0.9rem; }
        .sub-bell { font-size: 0.9rem; }
      `}</style>
    </div>
  );
}
