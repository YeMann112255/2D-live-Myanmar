import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  // ဆက်တင်တန်ဖိုးများအတွက် State များ
  const [phoneWidth, setPhoneWidth] = useState('380');
  const [phoneHeight, setPhoneHeight] = useState('820');
  const [liveFontSize, setLiveFontSize] = useState('4.5');
  const [resultTextSize, setResultTextSize] = useState('1');
  const [contentGap, setContentGap] = useState('4');

  const [sideCardWidth, setSideCardWidth] = useState('480');
  const [sideFontSize, setSideFontSize] = useState('2.8');
  const [sideValFontSize, setSideValFontSize] = useState('3');
  const [sideCardPadding, setSideCardPadding] = useState('20');
  
  const [leftBoxStyle, setLeftBoxStyle] = useState('modern');
  const [rightBoxStyle, setRightBoxStyle] = useState('modern');

  const [sessionTitle, setSessionTitle] = useState('4:30 PM');
  const [sessionDay, setSessionDay] = useState('ညနေပိုင်း');
  const [manualSession, setManualSession] = useState(false);

  const [customDate, setCustomDate] = useState('05-10-2026');
  const [pitThee, setPitThee] = useState('5-3-2');
  const [mainNum, setMainNum] = useState('53-57-39');
  const [subNum, setSubNum] = useState('35-23-25');
  const [horThout, setHorThout] = useState('5-9-8');

  // Server (API) ထံမှ ဆက်တင်များကို ဝင်ဆွဲရန် ဖန်ရှင်
  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const settings = await res.json();
        if (settings && Object.keys(settings).length > 0) {
          if (settings.phoneWidth) setPhoneWidth(settings.phoneWidth);
          if (settings.phoneHeight) setPhoneHeight(settings.phoneHeight);
          if (settings.liveFontSize) setLiveFontSize(settings.liveFontSize);
          if (settings.resultTextSize) setResultTextSize(settings.resultTextSize);
          if (settings.contentGap) setContentGap(settings.contentGap);
          if (settings.sideCardWidth) setSideCardWidth(settings.sideCardWidth);
          if (settings.sideFontSize) setSideFontSize(settings.sideFontSize);
          if (settings.sideValFontSize) setSideValFontSize(settings.sideValFontSize);
          if (settings.sideCardPadding) setSideCardPadding(settings.sideCardPadding);
          if (settings.leftBoxStyle) setLeftBoxStyle(settings.leftBoxStyle);
          if (settings.rightBoxStyle) setRightBoxStyle(settings.rightBoxStyle);
          if (settings.sessionTitle) setSessionTitle(settings.sessionTitle);
          if (settings.sessionDay) setSessionDay(settings.sessionDay);
          if (settings.customDate) setCustomDate(settings.customDate);
          if (settings.pitThee) setPitThee(settings.pitThee);
          if (settings.mainNum) setMainNum(settings.mainNum);
          if (settings.subNum) setSubNum(settings.subNum);
          if (settings.horThout) setHorThout(settings.horThout);
        }
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    }
  };

  // Page Load လုပ်ချိန်တွင် ဆက်တင်များနှင့် Live Data များကို ဆွဲထုတ်ရန်
  useEffect(() => {
    fetchSettings();
    const settingsInterval = setInterval(fetchSettings, 5000); // 5 စက္ကန့်တစ်ကြိမ် Server ဆက်တင်အသစ် ရှိမရှိ စစ်မည်
    return () => clearInterval(settingsInterval);
  }, []);

  // အချက်အလက်များ Save သည့် ဖန်ရှင် (Server အထိ လှမ်းသိမ်းမည်)
  const handleSaveSettings = async () => {
    const settingsData = {
      phoneWidth, phoneHeight, liveFontSize, resultTextSize, contentGap,
      sideCardWidth, sideFontSize, sideValFontSize, sideCardPadding,
      leftBoxStyle, rightBoxStyle, sessionTitle, sessionDay,
      customDate, pitThee, mainNum, subNum, horThout
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData)
      });

      if (res.ok) {
        setSaveMessage(true);
        setTimeout(() => {
          setSaveMessage(false);
          window.location.reload();
        }, 1000);
      } else {
        alert('သိမ်းဆည်းရန် မအောင်မြင်ပါ။');
      }
    } catch (err) {
      console.error(err);
      alert('Network Error ဖြစ်ပွားနေပါသည်။');
    }
  };

  // မူလအတိုင်း ပြန်လည် Reset လုပ်ရန်
  const handleResetSettings = async () => {
    const defaultData = {
      phoneWidth: '380', phoneHeight: '820', liveFontSize: '4.5', resultTextSize: '1', contentGap: '4',
      sideCardWidth: '480', sideFontSize: '2.8', sideValFontSize: '3', sideCardPadding: '20',
      leftBoxStyle: 'modern', rightBoxStyle: 'modern', sessionTitle: '4:30 PM', sessionDay: 'ညနေပိုင်း',
      customDate: '05-10-2026', pitThee: '5-3-2', mainNum: '53-57-39', subNum: '35-23-25', horThout: '5-9-8'
    };

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultData)
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
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

      setCurrentTime(`${formattedHours}:${minutes}:${seconds}${ampm}`);

      if (!manualSession) {
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
            <h3>📌 Manual ချိန်ညှိရန် (Server သို့ သိမ်းမည်)</h3>
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

            <div className="section-title">✏️️ စာသားများ ချိန်ရန်</div>
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

          <div className="bottom-section-group" style={{ gap: `${
