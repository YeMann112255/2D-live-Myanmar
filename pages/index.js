import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  // Manual Control States (LocalStorage မှ အရင်ယူမည်၊ မရှိလျှင် Default သုံးမည်)
  const [phoneWidth, setPhoneWidth] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('phoneWidth') || 380 : 380);
  const [phoneHeight, setPhoneHeight] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('phoneHeight') || 820 : 820);
  const [liveFontSize, setLiveFontSize] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('liveFontSize') || 4.5 : 4.5);
  const [resultTextSize, setResultTextSize] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('resultTextSize') || 1 : 1);
  const [contentGap, setContentGap] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('contentGap') || 4 : 4);

  // ဘေးဘက် Card များနှင့် Box Style များ
  const [sideCardWidth, setSideCardWidth] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('sideCardWidth') || 480 : 480);
  const [sideFontSize, setSideFontSize] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('sideFontSize') || 2.8 : 2.8);
  const [sideValFontSize, setSideValFontSize] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('sideValFontSize') || 3 : 3);
  const [sideCardPadding, setSideCardPadding] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('sideCardPadding') || 20 : 20);
  
  const [leftBoxStyle, setLeftBoxStyle] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('leftBoxStyle') || 'modern' : 'modern');
  const [rightBoxStyle, setRightBoxStyle] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('rightBoxStyle') || 'modern' : 'modern');

  // စာသားများနှင့် ပွဲစဉ်များ
  const [sessionTitle, setSessionTitle] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('sessionTitle') || '4:30 PM' : '4:30 PM');
  const [sessionDay, setSessionDay] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('sessionDay') || 'ညနေပိုင်း' : 'ညနေပိုင်း');
  const [manualSession, setManualSession] = useState(false);

  const [customDate, setCustomDate] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('customDate') || '05-10-2026' : '05-10-2026');
  const [pitThee, setPitThee] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('pitThee') || '5-3-2' : '5-3-2');
  const [mainNum, setMainNum] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('mainNum') || '53-57-39' : '53-57-39');
  const [subNum, setSubNum] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('subNum') || '35-23-25' : '35-23-25');
  const [horThout, setHorThout] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('horThout') || '5-9-8' : '5-9-8');

  // အချက်အလက်များ Save သည့် ဖန်ရှင်
  const handleSaveSettings = () => {
    localStorage.setItem('phoneWidth', phoneWidth);
    localStorage.setItem('phoneHeight', phoneHeight);
    localStorage.setItem('liveFontSize', liveFontSize);
    localStorage.setItem('resultTextSize', resultTextSize);
    localStorage.setItem('contentGap', contentGap);
    localStorage.setItem('sideCardWidth', sideCardWidth);
    localStorage.setItem('sideFontSize', sideFontSize);
    localStorage.setItem('sideValFontSize', sideValFontSize);
    localStorage.setItem('sideCardPadding', sideCardPadding);
    localStorage.setItem('leftBoxStyle', leftBoxStyle);
    localStorage.setItem('rightBoxStyle', rightBoxStyle);
    localStorage.setItem('sessionTitle', sessionTitle);
    localStorage.setItem('sessionDay', sessionDay);
    localStorage.setItem('customDate', customDate);
    localStorage.setItem('pitThee', pitThee);
    localStorage.setItem('mainNum', mainNum);
    localStorage.setItem('subNum', subNum);
    localStorage.setItem('horThout', horThout);

    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 2000);
  };

  // မူလအတိုင်း ပြန်လည် Reset လုပ်ရန် ဖန်ရှင်
  const handleResetSettings = () => {
    localStorage.clear();
    window.location.reload();
  };

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

      if (!manualSession && !localStorage.getItem('sessionTitle')) {
        if (myanmarTime.getHours() < 13) {
          setSessionTitle("12:01 PM");
          setSessionDay("မနက်ပိုင်း");
        } else {
          setSessionTitle("4:30 PM");
          setSessionDay("ညနေပိုင်း");
        }
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
  }, [manualSession]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/live');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resultsArray = Array.isArray(data) ? data : (data?.result || data?.data?.result || []);
  const getResult = (timeStr) => resultsArray.find(r => r.open_time && r.open_time.includes(timeStr));

  const result12 = getResult("12:01");
  const result1630 = getResult("16:30");

  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const myanmarTime = new Date(utc + (3600000 * 6.5));
  const totalMinutes = myanmarTime.getHours() * 60 + myanmarTime.getMinutes();
  const isPausedTime = totalMinutes >= (12 * 60 + 2) && totalMinutes < (14 * 60);

  let liveTwod = data?.live?.twod || data?.data?.live?.twod || "33";
  let liveSet = data?.live?.set || data?.data?.live?.set || "1,572.80";
  let liveVal = data?.live?.value || data?.data?.live?.value || "31,350.28";

  if (isPausedTime && result12) {
    liveTwod = result12.twod || liveTwod;
    liveSet = result12.set || liveSet;
    liveVal = result12.value || liveVal;
  }

  return (
    <div className="stream-container">
      <Head>
        <title>2D LIVE MYANMAR - Pro Stream</title>
      </Head>

      <button className="admin-toggle-btn" onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? "⚙️ ပြီးပြီ" : "⚙️ စခရင်၊ ဘေးဘတ်များနှင့် Box Style ချိန်ရန်"}
      </button>

      {showAdmin && (
        <div className="admin-panel">
          <div className="admin-header-fixed">
            <h3>📌 Manual ချိန်ညှိရန် (Save လုပ်နိုင်သည်)</h3>
            <div className="save-action-box">
              <button className="save-btn" onClick={handleSaveSettings}>💾 သိမ်းဆည်းမည် (Save)</button>
              <button className="reset-btn" onClick={handleResetSettings}>🔄 မူလ</button>
              {saveMessage && <span className="save-alert">✅ သိမ်းဆည်းပြီးပါပြီ!</span>}
            </div>
          </div>

          <div className="admin-scrollable-content">
            <div className="section-title">📱 ဖုန်းအရွယ်အစား ချိန်ရန်</div>
            <div className="input-group"><label>ဖုန်းအကျယ် (Width):</label><input type="range" min="320" max="500" value={phoneWidth} onChange={(e) => setPhoneWidth(e.target.value)} /><span>{phoneWidth}px</span></div>
            <div className="input-group"><label>ဖုန်းအမြင့် (Height):</label><input type="range" min="700" max="950" value={phoneHeight} onChange={(e) => setPhoneHeight(e.target.value)} /><span>{phoneHeight}px</span></div>
            <div className="input-group"><label>Box များအကွာအဝေး:</label><input type="range" min="1" max="15" value={contentGap} onChange={(e) => setContentGap(e.target.value)} /><span>{contentGap}px</span></div>
            <div className="input-group"><label>Live ဂဏန်းအရွယ်:</label><input type="range" min="3" max="6" step="0.2" value={liveFontSize} onChange={(e) => setLiveFontSize(e.target.value)} /><span>{liveFontSize}rem</span></div>

            <div className="section-title">🎨 ဘေးဘက် Box ပုံစံများ (Styles)</div>
            <div className="input-group">
              <label>ဘယ်ဘက် Box ပုံစံ:</label>
              <select value={leftBoxStyle} onChange={(e) => setLeftBoxStyle(e.target.value)} className="select-style">
                <option value="modern">Modern (ကြွေရောင်/မှန်ပြواف)</option>
                <option value="classic">Classic (အနီရောင်စစ်စစ်)</option>
                <option value="neon">Neon (အလင်းရောင်စိမ့်)</option>
                <option value="dark">Dark Pro (အမည်းရောင်ဇိမ်ခံ)</option>
              </select>
            </div>
            <div className="input-group">
              <label>ညာဘက် Box ပုံစံ:</label>
              <select value={rightBoxStyle} onChange={(e) => setRightBoxStyle(e.target.value)} className="select-style">
                <option value="modern">Modern (ကြွေရောင်/မှန်ပြواف)</option>
                <option value="classic">Classic (အနီရောင်စစ်စစ်)</option>
                <option value="neon">Neon (အလင်းရောင်စိမ့်)</option>
                <option value="dark">Dark Pro (အမည်းရောင်ဇိမ်ခံ)</option>
              </select>
            </div>

            <div className="section-title">🎛️ ဘေး Card အရွယ်အစားများ</div>
            <div className="input-group"><label>ဘေး Card အကျယ်:</label><input type="range" min="350" max="650" value={sideCardWidth} onChange={(e) => setSideCardWidth(e.target.value)} /><span>{sideCardWidth}px</span></div>
            <div className="input-group"><label>ဘေး Card Padding:</label><input type="range" min="10" max="35" value={sideCardPadding} onChange={(e) => setSideCardPadding(e.target.value)} /><span>{sideCardPadding}px</span></div>
            <div className="input-group"><label>ခေါင်းစဉ် Font အရွယ်:</label><input type="range" min="1.5" max="4" step="0.1" value={sideFontSize} onChange={(e) => setSideFontSize(e.target.value)} /><span>{sideFontSize}rem</span></div>
            <div className="input-group"><label>တန်ဖိုး/ဂဏန်း Font:</label><input type="range" min="2" max="4.5" step="0.1" value={sideValFontSize} onChange={(e) => setSideValFontSize(e.target.value)} /><span>{sideValFontSize}rem</span></div>

            <div className="section-title">✏️ စာသားများ ချိန်ရန်</div>
            <div className="input-group"><label>⏰ ပွဲစဉ်:</label><input type="text" value={sessionTitle} onChange={(e) => { setSessionTitle(e.target.value); setManualSession(true); }} /></div>
            <div className="input-group"><label>📅 နေ့/အမျိုးအစား:</label><input type="text" value={sessionDay} onChange={(e) => { setSessionDay(e.target.value); setManualSession(true); }} /></div>
            <div className="input-group"><label>ရက်စွဲ:</label><input type="text" value={customDate} onChange={(e) => setCustomDate(e.target.value)} /></div>
            <div className="input-group"><label>ပိတ်သီး:</label><input type="text" value={pitThee} onChange={(e) => setPitThee(e.target.value)} /></div>
            <div className="input-group"><label>မိန်း:</label><input type="text" value={mainNum} onChange={(e) => setMainNum(e.target.value)} /></div>
            <div className="input-group"><label>အရံ:</label><input type="text" value={subNum} onChange={(e) => setSubNum(e.target.value)} /></div>
            <div className="input-group"><label>ဟောထိပ်:</label><input type="text" value={horThout} onChange={(e) => setHorThout(e.target.value)} /></div>
          </div>
        </div>
      )}

      {/* ဘယ်ဘက်ခြမ်း */}
      <div className={`side-card left-card style-${leftBoxStyle}`} style={{ width: `${sideCardWidth}px`, padding: `${sideCardPadding}px` }}>
        <div className="top-red-banner" style={{ fontSize: `${sideFontSize}rem` }}>{sessionTitle}</div>
        <div className="live-clock-box" style={{ fontSize: `${sideFontSize * 0.75}rem` }}>{currentTime}</div>
        <div className="red-label-box" style={{ fontSize: `${sideFontSize * 0.65}rem` }}>{sessionDay}</div>
        
        <div className="youtube-subscribe-tag" style={{ fontSize: `${sideFontSize * 0.5}rem` }}>
          <span className="yt-icon">▶</span>
          <span className="yt-text">SUBSCRIBE</span>
        </div>

        <div className="horthout-box">
          <span className="ht-label" style={{ fontSize: `${sideFontSize * 0.5}rem` }}>ဟောထိပ်</span>
          <span className="ht-val" style={{ fontSize: `${sideValFontSize}rem` }}>{horThout}</span>
        </div>
      </div>

      {/* အလယ် ဖုန်းပုံစံ */}
      <div className="phone-container" style={{ width: `${phoneWidth}px`, height: `${phoneHeight}px` }}>
        <div className="phone-screen" style={{ gap: `${contentGap}px` }}>
          
          <div className="top-section-group" style={{ gap: `${contentGap}px` }}>
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
              </div>
            </div>

            <div className="live-status-pill">
              <span className="pulsing-dot"></span>
              <span>{isPausedTime ? "12:01 PM CLOSED (PAUSED)" : "LIVE REAL-TIME UPDATES"}</span>
            </div>

            <div className="live-main-display" style={{ fontSize: `${liveFontSize}rem` }}>
              {liveTwod}
            </div>

            <div className="update-time-indicator-large">
              <span>SET: <strong>{liveSet}</strong></span>
              <span className="separator">|</span>
              <span>Value: <strong>{liveVal}</strong></span>
            </div>
          </div>

          <div className="bottom-section-group" style={{ gap: `${contentGap}px` }}>
            <div className="cards-group" style={{ gap: `${contentGap}px` }}>
              <div className="result-card-red">
                <div className="card-title-top">12:01 PM Result</div>
                <div className="card-sub-grid">
                  <div className="sub-col">
                    <span className="sub-label">SET</span>
                    <span className="sub-val" style={{ fontSize: `${resultTextSize}rem` }}>{result12?.set || "--"}</span>
                  </div>
                  <div className="sub-col">
                    <span className="sub-label">Value</span>
                    <span className="sub-val" style={{ fontSize: `${resultTextSize}rem` }}>{result12?.value || "--"}</span>
                  </div>
                  <div className="sub-col">
                    <span className="sub-label">2D</span>
                    <span className="sub-val highlight-num" style={{ fontSize: `${resultTextSize * 1.15}rem` }}>{result12?.twod || "--"}</span>
                  </div>
                </div>
              </div>

              <div className="result-card-red">
                <div className="card-title-top">4:30 PM Result</div>
                <div className="card-sub-grid">
                  <div className="sub-col">
                    <span className="sub-label">SET</span>
                    <span className="sub-val" style={{ fontSize: `${resultTextSize}rem` }}>{result1630?.set || "--"}</span>
                  </div>
                  <div className="sub-col">
                    <span className="sub-label">Value</span>
                    <span className="sub-val" style={{ fontSize: `${resultTextSize}rem` }}>{result1630?.value || "--"}</span>
                  </div>
                  <div className="sub-col">
                    <span className="sub-label">2D</span>
                    <span className="sub-val highlight-num" style={{ fontSize: `${resultTextSize * 1.15}rem` }}>{result1630?.twod || "--"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="winner-promo-banner">
              <span className="promo-icon">🎉</span>
              <span className="promo-text">နေ့စဉ်ကံထူးရှင်များအတွက် လက်မလွှတ်တမ်းစောင့်ကြည့်ပါ</span>
              <span className="promo-badge">WIN</span>
            </div>

            <div className="tip-card-box">
              <span>💡 အချက်အလက်အမြန်ဆုံးကြည့်ရန် Channel ကို Subscribe လုပ်ပါ</span>
            </div>

            <div className="phone-subscribe-footer">
              <span className="sub-icon">👍</span>
              <span className="sub-text">LIKE & SUBSCRIBE</span>
              <span className="sub-bell">🔔</span>
            </div>
          </div>

        </div>
      </div>

      {/* ညာဘက်ခြမ်း */}
      <div className={`side-card right-card style-${rightBoxStyle}`} style={{ width: `${sideCardWidth}px`, padding: `${sideCardPadding}px` }}>
        <div className="date-display-box" style={{ fontSize: `${sideFontSize}rem` }}>{customDate}</div>
        
        <div className="data-section-group">
          <div className="purple-badge-wrapper">
            <span className="purple-circle-badge" style={{ fontSize: `${sideFontSize * 0.4}rem` }}>ယနေ့အတွက်ပတ်သီး</span>
          </div>
          <div className="val-display-pro" style={{ fontSize: `${sideValFontSize}rem` }}>{pitThee}</div>
        </div>

        <div className="data-section-group">
          <div className="purple-badge-wrapper">
            <span className="purple-circle-badge" style={{ fontSize: `${sideFontSize * 0.4}rem` }}>မိန်း (Main)</span>
          </div>
          <div className="val-display-pro" style={{ fontSize: `${sideValFontSize}rem` }}>{mainNum}</div>
        </div>

        <div className="data-section-group">
          <div className="purple-badge-wrapper">
            <span className="purple-circle-badge" style={{ fontSize: `${sideFontSize * 0.4}rem` }}>အရံ (Sub)</span>
          </div>
          <div className="val-display-pro" style={{ fontSize: `${sideValFontSize}rem` }}>{subNum}</div>
        </div>
      </div>

      <style jsx>{`
        .stream-container {
          width: 1920px; height: 1080px; background: linear-gradient(135deg, #ffdf40 0%, #ffbb00 100%);
          display: flex; justify-content: space-between; align-items: center; padding: 20px 35px;
          position: relative; font-family: 'Pyidaungsu', sans-serif; box-sizing: border-box; overflow: hidden;
        }
        .admin-toggle-btn { position: fixed; top: 20px; left: 20px; background: #000; color: #ffd700; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer; z-index: 99999; font-size: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
        
        .admin-panel { position: fixed; top: 75px; left: 20px; background: #111; border: 2px solid #ffd700; border-radius: 12px; z-index: 99999; width: 380px; color: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.8); height: 82vh; display: flex; flex-direction: column; overflow: hidden; }
        .admin-header-fixed { padding: 15px 15px 10px 15px; background: #111; border-bottom: 1px solid #333; flex-shrink: 0; }
        .admin-header-fixed h3 { margin: 0 0 8px 0; color: #ffd700; font-size: 1rem; }
        .admin-scrollable-content { padding: 10px 15px 15px 15px; overflow-y: auto; flex-grow: 1; }

        .save-action-box { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; background: #222; padding: 6px 10px; border-radius: 8px; border: 1px dashed #555; }
        .save-btn { background: #16a34a; color: #fff; border: none; padding: 6px 12px; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
        .reset-btn { background: #dc2626; color: #fff; border: none; padding: 6px 10px; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .save-alert { color: #4ade80; font-size: 0.8rem; font-weight: bold; width: 100%; text-align: center; }

        .section-title { font-size: 0.85rem; color: #60a5fa; font-weight: bold; margin: 12px 0 6px 0; border-bottom: 1px dashed #444; padding-bottom: 3px; }
        .input-group { display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center; font-size: 0.85rem; }
        .input-group label { color: #ccc; font-weight: bold; }
        .input-group input[type="text"] { background: #222; border: 1px solid #555; color: #fff; padding: 4px 8px; border-radius: 4px; width: 48%; }
        .input-group input[type="range"] { width: 38%; accent-color: #ffd700; }
        .input-group span { color: #ffd700; font-weight: bold; font-size: 0.8rem; width: 45px; text-align: right; }
        .select-style { background: #222; border: 1px solid #555; color: #ffd700; padding: 4px 8px; border-radius: 4px; width: 50%; font-weight: bold; }

        /* Box Style Presets */
        .side-card { display: flex; flex-direction: column; gap: 14px; box-shadow: 0 25px 50px rgba(0,0,0,0.2); transition: all 0.2s ease; box-sizing: border-box; }
        
        .style-modern { background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(12px); border: 4px solid #ffffff; border-radius: 26px; }
        .style-modern .top-red-banner, .style-modern .date-display-box { background: linear-gradient(135deg, #e60000 0%, #990000 100%); color: #fff; border: 3px solid #ff6666; border-radius: 16px; text-align: center; font-weight: 900; padding: 12px; }
        .style-modern .live-clock-box, .style-modern .horthout-box, .style-modern .data-section-group { background: #fff; border: 3px solid #e60000; border-radius: 16px; }
        
        .style-classic { background: #b91c1c; border: 6px solid #fef08a; border-radius: 12px; }
        .style-classic .top-red-banner, .style-classic .date-display-box { background: #7f1d1d; color: #fef08a; border: 3px solid #fef08a; border-radius: 8px; text-align: center; font-weight: 900; padding: 12px; }
        .style-classic .live-clock-box, .style-classic .horthout-box, .style-classic .data-section-group { background: #fef2f2; border: 3px solid #7f1d1d; border-radius: 8px; color: #7f1d1d; }

        .style-neon { background: rgba(15, 23, 42, 0.85); border: 3px solid #38bdf8; border-radius: 20px; box-shadow: 0 0 25px rgba(56, 189, 248, 0.4); }
        .style-neon .top-red-banner, .style-neon .date-display-box { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #e0f2fe; border: 2px solid #38bdf8; border-radius: 12px; text-align: center; font-weight: 900; padding: 12px; text-shadow: 0 0 8px rgba(56,189,248,0.6); }
        .style-neon .live-clock-box, .style-neon .horthout-box, .style-neon .data-section-group { background: #1e293b; border: 2px solid #38bdf8; border-radius: 12px; color: #f8fafc; }
        .style-neon .val-display-pro, .style-neon .ht-val { color: #38bdf8 !important; text-shadow: 0 0 10px rgba(56,189,248,0.5); }

        .style-dark { background: #111827; border: 4px solid #4b5563; border-radius: 24px; }
        .style-dark .top-red-banner, .style-dark .date-display-box { background: #374151; color: #f3f4f6; border: 2px solid #6b7280; border-radius: 14px; text-align: center; font-weight: 900; padding: 12px; }
        .style-dark .live-clock-box, .style-dark .horthout-box, .style-dark .data-section-group { background: #1f2937; border: 2px solid #4b5563; border-radius: 14px; color: #fff; }
        .style-dark .val-display-pro, .style-dark .ht-val { color: #facc15 !important; }

        .top-red-banner { font-weight: 900; padding: 12px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .live-clock-box { font-weight: 900; padding: 12px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .red-label-box { background: linear-gradient(90deg, #e60000, #b30000); color: #fff; font-weight: 900; padding: 12px; border-radius: 12px; text-align: center; border: 2px solid #ff6666; }
        .youtube-subscribe-tag { background: linear-gradient(90deg, #ff0000, #800000); color: #fff; font-weight: 900; padding: 10px; border-radius: 10px; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid #ff8080; }
        .horthout-box { padding: 10px 16px; text-align: center; display: flex; justify-content: space-between; align-items: center; }
        .ht-label { background: #e60000; color: #fff; font-weight: 900; padding: 8px 14px; border-radius: 8px; }
        .ht-val { font-weight: 900; color: #cc0000; flex: 1; text-align: center; letter-spacing: 3px; }

        .date-display-box { font-weight: 900; padding: 12px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .data-section-group { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .purple-badge-wrapper { text-align: center; margin-top: -28px; }
        .purple-circle-badge { background: linear-gradient(135deg, #7c3aed 100%, #5b21b6 0%); color: #fff; font-weight: 900; padding: 6px 20px; border-radius: 20px; border: 2px solid #fff; box-shadow: 0 3px 8px rgba(124, 58, 237, 0.4); display: inline-block; }
        .val-display-pro { font-weight: 900; color: #cc0000; text-align: center; letter-spacing: 4px; padding: 4px 0; }

        .phone-container { background: #111827; border: 8px solid #1f2937; border-radius: 36px; padding: 6px; box-shadow: 0 25px 50px rgba(0,0,0,0.4); display: flex; flex-direction: column; box-sizing: border-box; transition: width 0.2s ease, height 0.2s ease; }
        .phone-screen { background: #ffffff; border-radius: 28px; padding: 8px 12px; display: flex; flex-direction: column; justify-content: space-between; height: 100%; color: #000; box-sizing: border-box; overflow: hidden; }
        .top-section-group { display: flex; flex-direction: column; }
        .bottom-section-group { display: flex; flex-direction: column; }

        .phone-status-bar { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: bold; }
        .dynamic-island { width: 80px; height: 14px; background: #000; border-radius: 10px; }
        .app-header-bar { background: #ffcc00; padding: 4px 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-size: 0.9rem; }
        .app-logo { color: #000; font-weight: 900; }
        .app-menu-icons { display: flex; gap: 4px; align-items: center; font-size: 0.75rem; }
        .badge-2d { background: #16a34a; color: #fff; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }
        .badge-3d { background: #2563eb; color: #fff; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }
        
        .live-status-pill { background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; font-size: 0.75rem; font-weight: 900; padding: 2px 8px; border-radius: 15px; display: flex; align-items: center; justify-content: center; gap: 5px; width: fit-content; margin: 0 auto; }
        .pulsing-dot { width: 6px; height: 6px; background-color: #16a34a; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.6); } 70% { box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); } 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); } }

        .live-main-display { font-weight: 900; color: #16a34a; text-align: center; line-height: 1; margin: 2px 0; text-shadow: 0 4px 15px rgba(22, 163, 74, 0.3); display: inline-block; width: 100%; }

        .update-time-indicator-large { text-align: center; font-size: 0.85rem; color: #15803d; font-weight: 700; background: #f0fdf4; border: 1px solid #dcfce7; padding: 4px 8px; border-radius: 6px; }
        .update-time-indicator-large strong { color: #166534; }
        .separator { margin: 0 6px; color: #86efac; }

        .cards-group { display: flex; flex-direction: column; }
        .result-card-red { background: linear-gradient(135deg, #ff4d4d 0%, #e60000 100%); border-radius: 8px; padding: 4px 8px; color: #fff; border: 1px solid #ff8080; }
        .card-title-top { text-align: center; font-weight: 900; font-size: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.4); padding-bottom: 1px; margin-bottom: 2px; }
        .card-sub-grid { display: flex; justify-content: space-between; text-align: center; }
        .sub-col { flex: 1; display: flex; flex-direction: column; }
        .sub-label { font-size: 0.6rem; opacity: 0.9; font-weight: bold; }
        .sub-val { font-weight: 900; }
        .highlight-num { background: rgba(0,0,0,0.25); border-radius: 4px; padding: 1px 0; }

        .winner-promo-banner { background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%); color: #ffdf40; font-weight: 900; padding: 4px 8px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between; }
        .promo-text { color: #fff; font-size: 0.62rem; text-align: center; flex: 1; }
        .promo-badge { background: #ffdf40; color: #4c1d95; padding: 1px 5px; border-radius: 3px; font-size: 0.55rem; }

        .tip-card-box { background: #fef3c7; border: 1px solid #fde68a; color: #92400e; font-size: 0.62rem; font-weight: bold; text-align: center; padding: 3px 6px; border-radius: 6px; }
        .phone-subscribe-footer { background: linear-gradient(90deg, #e60000, #990000); color: #fff; border-radius: 6px; padding: 5px; display: flex; justify-content: center; align-items: center; gap: 6px; font-weight: 900; font-size: 0.75rem; }
      `}</style>
    </div>
  );
}
