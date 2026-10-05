import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  
  // နေ့စဉ်ပြောင်းလဲမည့် ဂဏန်းများနှင့် ရက်စွဲ
  const [customDate, setCustomDate] = useState("05.10.2026");
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
    <div className="stream-background">
      <Head>
        <title>2D LIVE MYANMAR - Pro Stream</title>
      </Head>

      {/* Admin Panel (ဖုန်း သို့မဟုတ် ဘရောက်ဆာမှ ဂဏန်းပြောင်းရန်) */}
      <button className="admin-toggle-btn" onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? "⚙️ ပြီးပြီ" : "⚙️ နေ့စဉ်ဂဏန်းပြောင်းရန်"}
      </button>

      {showAdmin && (
        <div className="admin-panel">
          <h3>📌 2D ဂဏန်းနှင့် ရက်စွဲပြင်ဆန်ရန်</h3>
          <div className="input-group">
            <label>ရက်စွဲ:</label>
            <input type="text" value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
          </div>
          <div className="input-group">
            <label>ပိတ်သီး:</label>
            <input type="text" value={pitThee} onChange={(e) => setPitThee(e.target.value)} />
          </div>
          <div className="input-group">
            <label>မိန်း:</label>
            <input type="text" value={mainNum} onChange={(e) => setMainNum(e.target.value)} />
          </div>
          <div className="input-group">
            <label>အရံ:</label>
            <input type="text" value={subNum} onChange={(e) => setSubNum(e.target.value)} />
          </div>
          <div className="input-group">
            <label>ဟောထုပ်:</label>
            <input type="text" value={horThout} onChange={(e) => setHorThout(e.target.value)} />
          </div>
        </div>
      )}

      {/* ဘယ်ဘက်ခြမ်း ပိတ်သီး/မိန်း/အရံ ဘောင် (ပုံပါအတိုင်း) */}
      <div className="side-panel left-panel">
        <div className="panel-header">🎯 ဒီနေ့အတွက်ပိတ်သီး</div>
        <div className="panel-val gold-text">{pitThee}</div>
        <div className="panel-header" style={{marginTop: '15px'}}>🔥 မိန်း</div>
        <div className="panel-val red-text">{mainNum}</div>
      </div>

      {/* အလယ်တည့်တည့်က မိုဘိုင်းဖုန်းစခရင် ပုံစံအဓိက Display */}
      <div className="phone-mockup">
        <div className="phone-screen">
          <div className="top-banner">
            <span className="live-dot">●</span> 2D LIVE MYANMAR
          </div>
          <div className="date-badge">{customDate}</div>
          
          <div className="main-num-box">
            <div className="num-title">⚡ လက်ရှိထွက်ပေါ်နေသော ⚡</div>
            <div className="big-num">{data?.live?.twod || "30"}</div>
          </div>

          <div className="market-row">
            <div>SET: <strong>{data?.live?.set || "1,572.03"}</strong></div>
            <div>VALUE: <strong>{data?.live?.value || "40,150.64"}</strong></div>
          </div>

          <div className="session-box">
            <div>12:01 PM (Open) : <strong>{result12?.twod || "00"}</strong></div>
            <div>4:30 PM (Final) : <strong>{result1630?.twod || "--"}</strong></div>
          </div>
        </div>
      </div>

      {/* ညာဘက်ခြမ်း အရံ/ဟောထုပ် ဘောင် (ပုံပါအတိုင်း) */}
      <div className="side-panel right-panel">
        <div className="panel-header">⭐ အရံ</div>
        <div className="panel-val green-text">{subNum}</div>
        <div className="panel-header" style={{marginTop: '15px'}}>📌 ဟောထုပ်</div>
        <div className="panel-val gold-text">{horThout}</div>
      </div>

      <style jsx>{`
        .stream-background {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%);
          /* နောက်ခံမှာ စတော့ရှယ်ယာဇယားပုံစံ Line များ ထည့်သွင်းထားသည် */
          background-image: radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 40%),
                            radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.15) 0%, transparent 40%);
          font-family: 'Pyidaungsu', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          color: #fff;
        }
        .admin-toggle-btn {
          position: fixed; top: 10px; left: 10px; background: #f59e0b; color: #000; border: none; padding: 8px 14px; font-weight: bold; border-radius: 8px; cursor: pointer; z-index: 10000;
        }
        .admin-panel {
          position: fixed; top: 60px; left: 10px; background: rgba(15, 23, 42, 0.95); border: 2px solid #f59e0b; padding: 15px; border-radius: 12px; z-index: 10000; width: 280px;
        }
        .admin-panel h3 { margin: 0 0 10px 0; color: #facc15; font-size: 0.95rem; }
        .input-group { display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center; }
        .input-group label { color: #cbd5e1; font-size: 0.85rem; font-weight: bold; }
        .input-group input { background: #1e293b; border: 1px solid #475569; color: #fff; padding: 4px 8px; border-radius: 4px; width: 60%; }

        /* ဘေးဘောင်ဒီဇိုင်းများ (သူများတွေလို ပုံစံတူ) */
        .side-panel {
          position: absolute;
          width: 260px;
          background: rgba(15, 23, 42, 0.85);
          border: 3px solid #f59e0b;
          border-radius: 16px;
          padding: 15px;
          text-align: center;
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.3);
        }
        .left-panel { left: 40px; }
        .right-panel { right: 40px; }
        .panel-header { font-size: 1.1rem; font-weight: 900; color: #facc15; margin-bottom: 5px; }
        .panel-val { font-size: 1.6rem; font-weight: 900; letter-spacing: 1px; }
        .gold-text { color: #facc15; }
        .red-text { color: #ef4444; }
        .green-text { color: #4ade80; }

        /* အလယ်ဖုန်းစခရင် */
        .phone-mockup {
          width: 380px;
          background: #000;
          border: 6px solid #334155;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 0 50px rgba(0,0,0,0.9);
        }
        .phone-screen {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          padding: 15px;
          text-align: center;
        }
        .top-banner { background: #dc2626; color: white; font-weight: 900; padding: 6px; border-radius: 8px; font-size: 0.9rem; }
        .live-dot { color: #4ade80; animation: blink 1s infinite alternate; }
        @keyframes blink { 0% { opacity: 0.2; } 100% { opacity: 1; } }
        .date-badge { background: #f59e0b; color: #000; font-weight: 900; display: inline-block; padding: 4px 15px; border-radius: 20px; margin: 10px 0; font-size: 1rem; }
        .main-num-box { background: #fff; color: #000; border-radius: 12px; padding: 10px; margin-bottom: 10px; }
        .num-title { font-size: 0.75rem; font-weight: bold; color: #d97706; }
        .big-num { font-size: 4.5rem; font-weight: 900; color: #dc2626; line-height: 1; }
        .market-row { display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; font-size: 0.8rem; margin-bottom: 10px; }
        .session-box { background: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px; font-size: 0.85rem; text-align: left; }
      `}</style>
    </div>
  );
}
