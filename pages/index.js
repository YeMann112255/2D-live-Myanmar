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

      setCurrentTime(`${formattedHours}:${minutes}:${seconds}`);

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
          <div className="input-group"><label>ဟောထိပ်:</label><input type="text" value={horThout} onChange={(e) => setHorThout(e.target.value)} /></div>
        </div>
      )}

      {/* ဘယ်ဘက်ခြမ်း */}
      <div className="side-card left-card">
        <div className="top-red-banner">{sessionTitle}</div>
        <div className="live-clock-box">{currentTime}</div>
        <div className="red-label-box">{sessionDay}</div>
        <div className="red-label-box">ထွက်ဂဏန်း</div>
        
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

          <div className="live-main-display">
            {data?.live?.twod || "57"}
          </div>

          <div className="update-time-indicator">
            <span>✔ Updated: {data?.live?.update_time || "2026-10-05 16:30:13"}</span>
          </div>

          <div className="cards-group">
            <div className="result-card-red">
              <div className="card-title-top">12:01 PM</div>
              <div className="card-sub-grid">
                <div className="sub-col"><span className="sub-label">SET</span><span className="sub-val">{result12?.set || "1,572.80"}</span></div>
                <div className="sub-col"><span className="sub-label">Value</span><span className="sub-val">{result12?.value || "31,350.28"}</span></div>
                <div className="sub-col"><span className="sub-label">2D</span><span className="sub-val highlight-num">{result12?.twod || "00"}</span></div>
              </div>
            </div>

            <div className="result-card-red">
              <div className="card-title-top">4:30 PM</div>
              <div className="card-sub-grid">
                <div className="sub-col"><span className="sub-label">SET</span><span className="sub-val">{result1630?.set || "1,576.45"}</span></div>
                <div className="sub-col"><span className="sub-label">Value</span><span className="sub-val">{result1630?.value || "55,047.95"}</span></div>
                <div className="sub-col"><span className="sub-label">2D</span><span className="sub-val highlight-num">{result1630?.twod || "57"}</span></div>
              </div>
            </div>
          </div>

          <div className="mini-row-grid">
            <div className="mini-box">9:30 AM <br/><b>81</b></div>
            <div className="mini-box">17 <br/><b>48</b></div>
          </div>
          <div className="mini-row-grid">
            <div className="mini-box">2:00 PM <br/><b>44</b></div>
            <div className="mini-box">41 <br/><b>57</b></div>
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
            <span className="purple-circle-badge">မိန်း</span>
          </div>
          <div className="val-display-pro">{mainNum}</div>
        </div>

        <div className="data-section-group">
          <div className="purple-badge-wrapper">
            <span className="purple-circle-badge">အရံ</span>
          </div>
          <div className="val-display-pro">{subNum}</div>
        </div>
      </div>

      <style jsx>{`
        .stream-container {
          width: 1920px;
          height: 1080px;
          background-color: #ffd700;
          background-image: radial-gradient(#ffea61 15%, transparent 16%), radial-gradient(#ffdf2b 15%, transparent 16%);
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 40px;
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
          width: 480px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(8px);
          border: 4px solid #fff;
          border-radius: 24px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        
        .top-red-banner {
          background: linear-gradient(135deg, #ff2a2a 0%, #b30000 100%);
          color: #fff; font-size: 2.8rem; font-weight: 900; padding: 10px; border-radius: 16px; text-align: center;
          border: 3px solid #ff9999;
          box-shadow: 0 6px 15px rgba(255, 0, 0, 0.4);
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .live-clock-box {
          background: #fff; color: #111; font-size: 2.2rem; font-weight: 900; padding: 8px; border-radius: 14px; text-align: center; border: 3px solid #ff3333;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .red-label-box {
          background: linear-gradient(90deg, #ff3333, #cc0000); color: #fff; font-size: 1.8rem; font-weight: 900; padding: 8px; border-radius: 14px; text-align: center;
          border: 2px solid #ff9999;
          box-shadow: 0 4px 10px rgba(255, 0, 0, 0.3);
        }
        .youtube-subscribe-tag {
          background: linear-gradient(90deg, #ff0000, #990000); color: #fff; font-size: 1.4rem; font-weight: 900; padding: 8px; border-radius: 12px; text-align: center;
          display: flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid #ff8080;
        }
        .horthout-box {
          background: #fff; border: 4px solid #ff3333; border-radius: 16px; padding: 10px; text-align: center; display: flex; justify-content: space-between; align-items: center;
        }
        .ht-label { background: #ff3333; color: #fff; font-size: 1.4rem; font-weight: 900; padding: 6px 14px; border-radius: 10px; }
        .ht-val { font-size: 2.6rem; font-weight: 900; color: #cc0000; flex: 1; text-align: center; letter-spacing: 2px; }

        .date-display-box {
          background: linear-gradient(135deg, #ff2a2a 0%, #b30000 100%);
          color: #fff; font-size: 2.5rem; font-weight: 900; padding: 10px; border-radius: 16px; text-align: center; border: 3px solid #ff9999;
          box-shadow: 0 6px 15px rgba(255, 0, 0, 0.4);
        }

        .data-section-group {
          background: #fff;
          border: 4px solid #ff3333;
          border-radius: 18px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .purple-badge-wrapper {
          text-align: center;
          margin-top: -24px;
        }
        .purple-circle-badge {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          color: #fff;
          font-size: 1.25rem;
          font-weight: 900;
          padding: 6px 22px;
          border-radius: 30px;
          border: 3px solid #fff;
          box-shadow: 0 4px 10px rgba(109, 40, 217, 0.4);
          display: inline-block;
        }
        .val-display-pro {
          font-size: 2.8rem;
          font-weight: 900;
          color: #d90429;
          text-align: center;
          letter-spacing: 3px;
          padding: 2px 0;
        }

        .phone-container {
          width: 390px;
          height: 860px;
          background: #111827;
          border: 8px solid #1f2937;
          border-radius: 36px;
          padding: 8px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .phone-screen {
          background: #ffffff;
          border-radius: 28px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          color: #000;
          box-sizing: border-box;
        }
        .phone-status-bar { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: bold; }
        .dynamic-island { width: 90px; height: 16px; background: #000; border-radius: 12px; }
        .app-header-bar { background: #facc15; padding: 5px 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-size: 0.9rem; }
        .app-logo { color: #000; font-weight: 900; }
        .app-menu-icons { display: flex; gap: 4px; align-items: center; font-size: 0.7rem; }
        .badge-2d { background: #16a34a; color: #fff; padding: 1px 4px; border-radius: 4px; font-size: 0.6rem; }
        .badge-3d { background: #2563eb; color: #fff; padding: 1px 4px; border-radius: 4px; font-size: 0.6rem; }
        
        .live-status-pill {
          background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; font-size: 0.65rem; font-weight: 900; padding: 2px 6px; border-radius: 20px; display: flex; align-items: center; justify-content: center; gap: 5px; width: fit-content; margin: 0 auto;
        }
        .pulsing-dot { width: 6px; height: 6px; background-color: #16a34a; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.6); } 70% { box-shadow: 0 0 0 5px rgba(22, 163, 74, 0); } 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); } }

        .live-main-display { font-size: 5rem; font-weight: 900; color: #16a34a; text-align: center; line-height: 1; margin: 0; }
        .update-time-indicator { text-align: center; font-size: 0.7rem; color: #16a34a; font-weight: bold; }

        .cards-group { display: flex; flex-direction: column; gap: 4px; }
        .result-card-red { background: linear-gradient(135deg, #f87171 0%, #ef4444 100%); border-radius: 8px; padding: 4px 10px; color: #fff; }
        .card-title-top { text-align: center; font-weight: 900; font-size: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 1px; margin-bottom: 2px; }
        .card-sub-grid { display: flex; justify-content: space-between; text-align: center; }
        .sub-col { flex: 1; display: flex; flex-direction: column; }
        .sub-label { font-size: 0.55rem; opacity: 0.9; font-weight: bold; }
        .sub-val { font-size: 0.95rem; font-weight: 900; }
        .highlight-num { font-size: 1.1rem; background: rgba(0,0,0,0.2); border-radius: 4px; }

        .mini-row-grid { display: flex; gap: 4px; }
        .mini-box { flex: 1; background: linear-gradient(135deg, #f87171, #ef4444); color: #fff; border-radius: 6px; padding: 3px; text-align: center; font-size: 0.65rem; font-weight: bold; }
        .mini-box b { font-size: 0.9rem; }
      `}</style>
    </div>
  );
}
