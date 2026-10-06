import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  // Server (API) မှ တန်ဖိုးများကို သေချာခေါ်ယူရန် State များ
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

  // Page Load လုပ်ချိန်တွင် Server API (`/api/settings`) မှ Data များကို ဝင်ဆွဲရန်
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(settings => {
        if (settings && Object.keys(settings).length > 0) {
          setPhoneWidth(settings.phoneWidth || '380');
          setPhoneHeight(settings.phoneHeight || '820');
          setLiveFontSize(settings.liveFontSize || '4.5');
          setResultTextSize(settings.resultTextSize || '1');
          setContentGap(settings.contentGap || '4');
          setSideCardWidth(settings.sideCardWidth || '480');
          setSideFontSize(settings.sideFontSize || '2.8');
          setSideValFontSize(settings.sideValFontSize || '3');
          setSideCardPadding(settings.sideCardPadding || '20');
          setLeftBoxStyle(settings.leftBoxStyle || 'modern');
          setRightBoxStyle(settings.rightBoxStyle || 'modern');
          setSessionTitle(settings.sessionTitle || '4:30 PM');
          setSessionDay(settings.sessionDay || 'ညနေပိုင်း');
          setCustomDate(settings.customDate || '05-10-2026');
          setPitThee(settings.pitThee || '5-3-2');
          setMainNum(settings.mainNum || '53-57-39');
          setSubNum(settings.subNum || '35-23-25');
          setHorThout(settings.horThout || '5-9-8');
        }
      })
      .catch(err => console.error('Failed to load settings:', err));
  }, []);

  // အချက်အလက်များ Server သို့ Save သည့် ဖန်ရှင် (GitHub / Server ပေါ်ရှိ settings.json သို့ တိုက်ရိုက်သိမ်းမည်)
  const handleSaveSettings = async () => {
    const newSettings = {
      phoneWidth, phoneHeight, liveFontSize, resultTextSize, contentGap,
      sideCardWidth, sideFontSize, sideValFontSize, sideCardPadding,
      leftBoxStyle, rightBoxStyle, sessionTitle, sessionDay,
      customDate, pitThee, mainNum, subNum, horThout
    };

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });

      if (response.ok) {
        setSaveMessage(true);
        setTimeout(() => {
          setSaveMessage(false);
          window.location.reload(); // သိမ်းပြီးပါက Viewer အားလုံးအတွက်ပါ အလိုအလျောက် Refresh ဖြစ်မည်
        }, 1000);
      } else {
        alert('သိမ်းဆည်းရန် မအောင်မြင်ပါ');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error connecting to server');
    }
  };

  // မူလအတိုင်း ပြန်လည် Reset လုပ်ရန် ဖန်ရှင်
  const handleResetSettings = () => {
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
            <h3>📌 Viewer အားလုံးအတွက် ချိန်ရန် (Server Save)</h3>
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
