import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  
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
        <title>2D LIVE MYANMAR</title>
      </Head>

      <button className="admin-toggle-btn" onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? "⚙️ ပြီးပြီ" : "⚙️ နေ့စဉ်ဂဏန်းပြောင်းရန်"}
      </button>

      {showAdmin && (
        <div className="admin-panel">
          <h3>📌 2D ဂဏန်းနှင့် ရက်စွဲပြင်ဆန်ရန်</h3>
          <div className="input-group"><label>ရက်စွဲ:</label><input type="text" value={customDate} onChange={(e) => setCustomDate(e.target.value)} /></div>
          <div className="input-group"><label>ပိတ်သီး:</label><input type="text" value={pitThee} onChange={(e) => setPitThee(e.target.value)} /></div>
          <div className="input-group"><label>မိန်း:</label><input type="text" value={mainNum} onChange={(e) => setMainNum(e.target.value)} /></div>
          <div className="input-group"><label>အရံ:</label><input type="text" value={subNum} onChange={(e) => setSubNum(e.target.value)} /></div>
          <div className="input-group"><label>ဟောထုပ်:</label><input type="text" value={horThout} onChange={(e) => setHorThout(e.target.value)} /></div>
        </div>
      )}

      {/* ဘယ်ဘက်ခြမ်း (အချိန်၊ နေ့စွဲ၊ ဟောထုပ်) */}
      <div className="left-section">
        <div className="time-badge">4:30 PM</div>
        <div className="live-clock">{currentTime}</div>
        <div className="red-banner">တနင်္လာနေ့ ညနေခင်း</div>
        <div className="red-banner">ထွက်ဂဏန်း</div>
        <div className="hor-badge">ဟောထုပ် ➔ {horThout}</div>
      </div>

      {/* အလယ်ဖုန်းစခရင် အကြီး */}
      <div className="phone-box">
        <div className="phone-screen">
          <div className="phone-top-bar">Myanmar 2D</div>
          <div className="big-number">{data?.live?.twod || "57"}</div>
          <div className="market-row">
            <span>12:01 PM: <strong>{result12?.twod || "00"}</strong></span>
            <span>4:30 PM: <strong>{result1630?.twod || "57"}</strong></span>
          </div>
        </div>
      </div>

      {/* ညာဘက်ခြမ်း (ရက်စွဲ၊ ပိတ်သီး၊ မိန်း၊ အရံ) */}
      <div className="right-section">
        <div className="date-badge-big">{customDate}</div>
        <div className="section-title">ယနေ့အတွက်ပိတ်သီး</div>
        <div className="value-box gold-border">{pitThee}</div>
        
        <div className="section-title">မိန်း</div>
        <div className="value-box red-border">{mainNum}</div>
        
        <div className="section-title">အရံ</div>
        <div className="value-box red-border">{subNum}</div>
      </div>

      <style jsx>{`
        .stream-container {
          width: 1920px;
          height: 1080px;
          background: #facc15; /* ပုံပါအတိုင်း တောက်ပသော အဝါရောင်နောက်ခံ */
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 60px;
          position: relative;
          font-family: 'Pyidaungsu', sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }
        .admin-toggle-btn {
          position: fixed; top: 20px; left: 20px; background: #000; color: #facc15; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer; z-index: 99999; font-size: 1rem;
        }
        .admin-panel {
          position: fixed; top: 75px; left: 20px; background: #0f172a; border: 2px solid #facc15; padding: 15px; border-radius: 12px; z-index: 99999; width: 300px; color: #fff;
        }
        .admin-panel h3 { margin: 0 0 10px 0; color: #facc15; font-size: 1rem; }
        .input-group { display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center; }
        .input-group label { color: #cbd5e1; font-weight: bold; }
        .input-group input { background: #1e293b; border: 1px solid #475569; color: #fff; padding: 5px 8px; border-radius: 4px; width: 60%; }

        /* ဘယ်ဘက်ခြမ်း ဒီဇိုင်း */
        .left-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 350px;
        }
        .time-badge { background: #dc2626; color: #fff; font-size: 3rem; font-weight: 900; padding: 10px 20px; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .live-clock { background: #fff; color: #000; font-size: 2rem; font-weight: 900; padding: 8px; border-radius: 10px; text-align: center; border: 3px solid #dc2626; }
        .red-banner { background: #dc2626; color: #fff; font-size: 1.8rem; font-weight: 900; padding: 10px; border-radius: 12px; text-align: center; }
        .hor-badge { background: #1e293b; color: #facc15; font-size: 1.8rem; font-weight: 900; padding: 12px; border-radius: 12px; text-align: center; border: 3px solid #facc15; }

        /* အလယ်ဖုန်းစခရင် အကြီး */
        .phone-box {
          width: 420px;
          background: #000;
          border: 8px solid #334155;
          border-radius: 35px;
          padding: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        .phone-screen {
          background: linear-gradient(180deg, #fff 0%, #f1f5f9 100%);
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          color: #000;
        }
        .phone-top-bar { font-weight: bold; color: #64748b; margin-bottom: 10px; }
        .big-number { font-size: 6rem; font-weight: 900; color: #16a34a; line-height: 1; margin: 20px 0; }
        .market-row { display: flex; justify-content: space-around; background: #e2e8f0; padding: 12px; border-radius: 10px; font-size: 1.1rem; }

        /* ညာဘက်ခြမ်း ဒီဇိုင်း */
        .right-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 450px;
          text-align: center;
        }
        .date-badge-big { background: #dc2626; color: #fff; font-size: 2.5rem; font-weight: 900; padding: 10px; border-radius: 15px; border: 4px solid #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .section-title { background: #7c2d12; color: #fff; font-size: 1.4rem; font-weight: 900; padding: 6px; border-radius: 10px; display: inline-block; width: 60%; margin: 0 auto; }
        .value-box { font-size: 2.8rem; font-weight: 900; padding: 10px; border-radius: 15px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .gold-border { color: #b45309; border: 4px solid #f59e0b; }
        .red-border { color: #dc2626; border: 4px solid #dc2626; }
      `}</style>
    </div>
  );
}
