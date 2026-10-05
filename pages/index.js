import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  // Admin / Custom State
  const [customDate, setCustomDate] = useState("5.10.2026");
  const [liveNum, setLiveNum] = useState("06");
  const [setValue, setSetValue] = useState("1,572.80");
  const [valValue, setValValue] = useState("31,366.90");
  const [result12Num, setResult12Num] = useState("06");
  const [result430Num, setResult430Num] = useState("--");

  useEffect(() => {
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

  return (
    <div className="stream-container">
      <Head>
        <title>2D LIVE MYANMAR - Standard Layout</title>
      </Head>

      <button className="admin-toggle-btn" onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? "⚙️ ပြီးပြီ" : "⚙️ အချက်အလက်ပြင်ရန်"}
      </button>

      {showAdmin && (
        <div className="admin-panel">
          <h3>📌 2D အချက်အလက်များ ပြင်ဆင်ရန်</h3>
          <div className="input-group"><label>ရက်စွဲ:</label><input type="text" value={customDate} onChange={(e) => setCustomDate(e.target.value)} /></div>
          <div className="input-group"><label>Live ဂဏန်း:</label><input type="text" value={liveNum} onChange={(e) => setLiveNum(e.target.value)} /></div>
          <div className="input-group"><label>SET:</label><input type="text" value={setValue} onChange={(e) => setSetValue(e.target.value)} /></div>
          <div className="input-group"><label>VALUE:</label><input type="text" value={valValue} onChange={(e) => setValValue(e.target.value)} /></div>
          <div className="input-group"><label>12:01 2D:</label><input type="text" value={result12Num} onChange={(e) => setResult12Num(e.target.value)} /></div>
          <div className="input-group"><label>4:30 2D:</label><input type="text" value={result430Num} onChange={(e) => setResult430Num(e.target.value)} /></div>
        </div>
      )}

      {/* အဓိက ဖုန်းစခရင် ဒီဇိုင်း (ပုံစံတူ) */}
      <div className="phone-container">
        <div className="phone-screen">
          
          {/* အပေါ်ဆုံး Header (Live, 2D, Pagoda) */}
          <div className="screen-top-header">
            <div className="live-badge-red">🔴 LIVE</div>
            <div className="main-title-2d">2D</div>
            <div className="youtube-badge">▶ YouTube</div>
          </div>

          <div className="sub-title-myanmar">LIVE MYANMAR</div>
          <div className="date-pill">{customDate}</div>

          {/* အလယ်ပိုင်း Live ဂဏန်းအကြီး */}
          <div className="live-display-box">
            <div className="live-dot-text">● LIVE</div>
            <div className="live-big-number">{data?.live?.twod || liveNum}</div>
          </div>

          {/* SET နဲ့ VALUE ဘောက်စ်များ */}
          <div className="set-val-row">
            <div className="box-blue">
              <div className="box-label">SET</div>
              <div className="box-val">{data?.set || setValue}</div>
            </div>
            <div className="box-green">
              <div className="box-label">VALUE</div>
              <div className="box-val">{data?.value || valValue}</div>
            </div>
          </div>

          {/* 2D ရလဒ် အကွက် */}
          <div className="twod-result-row">
            <div className="twod-label-box">2D</div>
            <div className="twod-number-box">{data?.live?.twod || liveNum}</div>
          </div>

          {/* အောက်ဆုံး အချိန်အလိုက် ပွဲစဉ်စာရင်းများ */}
          <div className="schedule-list">
            <div className="schedule-item">
              <div className="time-info">
                <span className="clock-icon">🕒</span>
                <div>
                  <div className="time-text">12:01 PM</div>
                  <div className="time-sub">(Open Result)</div>
                </div>
              </div>
              <div className="result-right">
                <span className="res-label">2D :</span>
                <span className="res-val">{result12Num}</span>
              </div>
            </div>

            <div className="schedule-item">
              <div className="time-info">
                <span className="clock-icon">🕒</span>
                <div>
                  <div className="time-text">4:30 PM</div>
                  <div className="time-sub">(Final Result)</div>
                </div>
              </div>
              <div className="result-right">
                <span className="res-label">2D :</span>
                <span className="res-val">{result430Num}</span>
              </div>
            </div>
          </div>

          {/* အောက်ဆုံး Subscribe ခလုတ် */}
          <div className="subscribe-footer">
            <span>▶ SUBSCRIBE</span>
            <span className="sub-sub">LIKE & SHARE 🔔</span>
          </div>

        </div>
      </div>

      <style jsx>{`
        .stream-container {
          width: 1920px;
          height: 1080px;
          background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
          background-image: radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.4) 0%, transparent 70%);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          font-family: 'Pyidaungsu', sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }
        .admin-toggle-btn {
          position: fixed; top: 20px; left: 20px; background: #f59e0b; color: #000; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer; z-index: 99999; font-size: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
        .admin-panel {
          position: fixed; top: 75px; left: 20px; background: #0f172a; border: 2px solid #f59e0b; padding: 15px; border-radius: 12px; z-index: 99999; width: 300px; color: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.8);
        }
        .admin-panel h3 { margin: 0 0 10px 0; color: #facc15; font-size: 1rem; }
        .input-group { display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center; }
        .input-group label { color: #cbd5e1; font-weight: bold; font-size: 0.85rem; }
        .input-group input { background: #1e293b; border: 1px solid #475569; color: #fff; padding: 5px 8px; border-radius: 4px; width: 55%; }

        /* ဖုန်းစခရင် ပုံစံတူ သပ်ရပ်သော Layout */
        .phone-container {
          width: 520px;
          height: 980px;
          background: #0f172a;
          border: 10px solid #334155;
          border-radius: 40px;
          padding: 10px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.8);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .phone-screen {
          background: linear-gradient(180deg, #1d4ed8 0%, #1e40af 40%, #0284c7 100%);
          border-radius: 30px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          color: #fff;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .screen-top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .live-badge-red {
          background: #dc2626; color: #fff; font-weight: 900; font-size: 0.9rem; padding: 4px 10px; border-radius: 6px;
        }
        .main-title-2d {
          font-size: 2.8rem; font-weight: 900; color: #facc15; text-shadow: 2px 2px 4px rgba(0,0,0,0.4); line-height: 1;
        }
        .youtube-badge {
          background: #ef4444; color: #fff; font-weight: bold; font-size: 0.75rem; padding: 4px 8px; border-radius: 6px;
        }

        .sub-title-myanmar {
          text-align: center; font-size: 1.2rem; font-weight: 900; color: #fff; letter-spacing: 1px; margin-top: -5px;
        }
        .date-pill {
          background: #facc15; color: #000; font-weight: 900; font-size: 1.3rem; text-align: center; padding: 4px; border-radius: 8px; width: 60%; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        /* Live ဂဏန်းအကြီးပြသရန် */
        .live-display-box {
          background: #ffffff;
          border-radius: 16px;
          padding: 8px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .live-dot-text {
          color: #ef4444; font-weight: 900; font-size: 0.9rem; letter-spacing: 1px;
        }
        .live-big-number {
          font-size: 5.5rem; font-weight: 900; color: #dc2626; line-height: 1; margin: 2px 0;
        }

        /* SET နှင့် VALUE */
        .set-val-row {
          display: flex; gap: 10px;
        }
        .box-blue, .box-green {
          flex: 1; border-radius: 10px; padding: 6px 10px; text-align: center; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .box-blue { background: #2563eb; border: 2px solid #93c5fd; }
        .box-green { background: #16a34a; border: 2px solid #86efac; }
        .box-label { font-size: 0.8rem; font-weight: 900; letter-spacing: 1px; }
        .box-val { font-size: 1.35rem; font-weight: 900; }

        /* 2D ရလဒ်တန်း */
        .twod-result-row {
          display: flex; background: #7c3aed; border-radius: 10px; overflow: hidden; border: 2px solid #c4b5fd; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .twod-label-box {
          background: #6d28d9; width: 30%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 900; color: #fff;
        }
        .twod-number-box {
          flex: 1; text-align: center; font-size: 1.8rem; font-weight: 900; color: #facc15; padding: 4px;
        }

        /* အချိန်ဇယားစာရင်းများ */
        .schedule-list {
          display: flex; flex-direction: column; gap: 6px;
        }
        .schedule-item {
          background: #ffffff; color: #000; border-radius: 10px; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .time-info { display: flex; align-items: center; gap: 8px; }
        .clock-icon { font-size: 1.2rem; }
        .time-text { font-weight: 900; font-size: 0.95rem; color: #1e3a8a; }
        .time-sub { font-size: 0.7rem; color: #64748b; font-weight: bold; }
        .result-right { display: flex; align-items: center; gap: 8px; }
        .res-label { font-weight: 900; color: #475569; font-size: 1rem; }
        .res-val { font-weight: 900; color: #dc2626; font-size: 1.3rem; }

        /* အောက်ဆုံး Subscribe ခလုတ် */
        .subscribe-footer {
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          border-radius: 10px; padding: 8px; text-align: center; font-weight: 900; font-size: 1rem; color: #fff; display: flex; justify-content: center; gap: 10px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4); border: 1px solid #fca5a5;
        }
        .sub-sub { font-size: 0.85rem; color: #fef08a; }
      `}</style>
    </div>
  );
}
