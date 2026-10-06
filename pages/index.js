import Head from 'next/head';
import { useState, useEffect } from 'react';

const BIN_ID = '6ac4a0a1ffd5d1605351b310'; 
const MASTER_KEY = '$2a$10$fYB8HrDgeJuhR/ZHy2JVvuz8qs2ShnIW6ZbqQCVATxhB6dJ8NjODa';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  // Layout & Settings States
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
  
  // New Pro Features: Phone Screen Layout Style & Background Theme
  const [phoneScreenStyle, setPhoneScreenStyle] = useState('classic'); // classic, neon, minimalist
  const [streamBgTheme, setStreamBgTheme] = useState('gold'); // gold, dark, cyberpunk

  const [sessionTitle, setSessionTitle] = useState('4:30 PM');
  const [sessionDay, setSessionDay] = useState('ညနေပိုင်း');
  const [manualSession, setManualSession] = useState(false);

  const [customDate, setCustomDate] = useState('06-10-2026');
  const [pitThee, setPitThee] = useState('5-3-2');
  const [mainNum, setMainNum] = useState('53-57-39');
  const [subNum, setSubNum] = useState('35-23-25');
  const [horThout, setHorThout] = useState('5-9-8');
  const [marqueeText, setMarqueeText] = useState(' နေ့စဉ်ကံထူးရှင်များအတွက် လက်မလွှတ်တမ်းစောင့်ကြည့်ပါ - VIP Channel ကို Subscribe လုပ်ထားပါ။');

  const [customItems, setCustomItems] = useState([
    { id: 1, type: 'banner', text: ' နေ့စဉ်ကံထူးရှင်များအတွက် လက်မလွှတ်တမ်းစောင့်ကြည့်ပါ', bg: 'purple' },
    { id: 2, type: 'box', title: ' အချက်အလက်အမြန်ဆုံးကြည့်ရန်', sub: 'Channel ကို Subscribe လုပ်ပါ' }
  ]);

  const [newItemType, setNewItemType] = useState('box');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemSub, setNewItemSub] = useState('');

  useEffect(() => {
    fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': MASTER_KEY }
    })
      .then(res => res.json())
      .then(response => {
        const settings = response.record;
        if (settings) {
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
          setPhoneScreenStyle(settings.phoneScreenStyle || 'classic');
          setStreamBgTheme(settings.streamBgTheme || 'gold');
          setSessionTitle(settings.sessionTitle || '4:30 PM');
          setSessionDay(settings.sessionDay || 'ညနေပိုင်း');
          setCustomDate(settings.customDate || '06-10-2026');
          setPitThee(settings.pitThee || '5-3-2');
          setMainNum(settings.mainNum || '53-57-39');
          setSubNum(settings.subNum || '35-23-25');
          setHorThout(settings.horThout || '5-9-8');
          setMarqueeText(settings.marqueeText || ' နေ့စဉ်ကံထူးရှင်များအတွက် လက်မလွှတ်တမ်းစောင့်ကြည့်ပါ');
          if (settings.customItems) setCustomItems(settings.customItems);
        }
      })
      .catch(err => console.error('Failed to load settings:', err));
  }, []);

  const handleSaveSettings = async () => {
    const newSettings = {
      phoneWidth, phoneHeight, liveFontSize, resultTextSize, contentGap,
      sideCardWidth, sideFontSize, sideValFontSize, sideCardPadding,
      leftBoxStyle, rightBoxStyle, phoneScreenStyle, streamBgTheme,
      sessionTitle, sessionDay, customDate, pitThee, mainNum, subNum, horThout, marqueeText, customItems
    };

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': MASTER_KEY,
        },
        body: JSON.stringify(newSettings),
      });

      if (response.ok) {
        setSaveMessage(true);
        setTimeout(() => {
          setSaveMessage(false);
          window.location.reload(); 
        }, 1000);
      } else {
        alert('သိမ်းဆည်းရန် မအောင်မြင်ပါ');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error connecting to server');
    }
  };

  const handleAddItem = () => {
    if (!newItemTitle) {
      alert('ခေါင်းစဉ် သို့မဟုတ် စာသား ထည့်ပါ။');
      return;
    }
    const newItem = {
      id: Date.now(),
      type: newItemType,
      title: newItemTitle,
      sub: newItemSub
    };
    setCustomItems([...customItems, newItem]);
    setNewItemTitle('');
    setNewItemSub('');
  };

  const handleDeleteItem = (id) => {
    setCustomItems(customItems.filter(item => item.id !== id));
  };

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
    <div className={`stream-container theme-${streamBgTheme}`}>
      <Head>
        <title>2D LIVE MYANMAR - Pro Stream</title>
      </Head>

      <button className="admin-toggle-btn" onClick={() => setShowAdmin(!showAdmin)}>
        {showAdmin ? " ပိတ်မည်" : "⚙️ အရာရာကို စိတ်ကြိုက် ချိန်ရန် & ထည့်ရန်"}
      </button>

      {showAdmin && (
        <div className="admin-panel">
          <div className="admin-header-fixed">
            <h3>🎛️ Viewer အားလုံးအတွက် ချိန်ရန် (Cloud Sync)</h3>
            <div className="save-action-box">
              <button className="save-btn" onClick={handleSaveSettings}>💾 သိမ်းဆည်းမည် (Save)</button>
              <button className="reset-btn" onClick={handleResetSettings}>🔄 မူလ</button>
              {saveMessage && <span className="save-alert">✅ သိမ်းဆည်းပြီးပါပြီ!</span>}
            </div>
          </div>

          <div className="admin-scrollable-content">
            <div className="section-title">🎨 Stream နောက်ခံ Theme များ</div>
            <div className="input-group">
              <label>Background:</label>
              <select value={streamBgTheme} onChange={(e) => setStreamBgTheme(e.target.value)} className="select-style">
                <option value="gold">Gold Luxury (ရွှေရောင်)</option>
                <option value="dark">Dark Studio (အမည်းရောင် Pro)</option>
                <option value="cyberpunk">Cyberpunk Neon (နီယွန်စတိုင်)</option>
              </select>
            </div>

            <div className="section-title">📱 ဖုန်းစခရင် Layout ပုံစံများ</div>
            <div className="input-group">
              <label>Screen Theme:</label>
              <select value={phoneScreenStyle} onChange={(e) => setPhoneScreenStyle(e.target.value)} className="select-style">
                <option value="classic">Classic Red (အနီရောင်စတိုင်)</option>
                <option value="neon">Neon Blue (အပြာနီယွန်)</option>
                <option value="minimalist">Minimalist Clean (သန့်ရှင်းသောစတိုင်)</option>
              </select>
            </div>

            <div className="section-title">📦 Box / Banner အသစ်ထပ်ထည့်ရန်</div>
            <div className="input-group">
              <label>အမျိုးအစား:</label>
              <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)} className="select-style">
                <option value="box">Result/Info Box (ဘောက်စ်)</option>
                <option value="banner">Banner / Text (ကြေငြာစာသား)</option>
                <option value="image">Image / Photo (ပုံ)</option>
              </select>
            </div>
            <div className="input-group"><label>ခေါင်းစဉ် / စာသား:</label><input type="text" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} placeholder="ဥပမာ - အထူးအစီအစဉ်" /></div>
            <div className="input-group"><label>အသေးစိတ်/လင့်ခ်:</label><input type="text" value={newItemSub} onChange={(e) => setNewItemSub(e.target.value)} placeholder="ဥပမာ - နှုန်းထား သို့မဟုတ် ပုံလင့်ခ် URL" /></div>
            <button className="add-item-btn" onClick={handleAddItem}>+ ဖုန်းစခရင်ထဲသို့ ထည့်မည်</button>

            <div className="section-title">🗑️ ထည့်ထားပြီးသားများကို ဖျက်ရန်</div>
            {customItems.map((item) => (
              <div key={item.id} className="admin-item-row">
                <span>{item.title || item.text}</span>
                <button onClick={() => handleDeleteItem(item.id)}>ဖျက်ရန်</button>
              </div>
            ))}

            <div className="section-title">📐 ဖုန်းအရွယ်အစား ချိန်ရန်</div>
            <div className="input-group"><label>ဖုန်းအကျယ်:</label><input type="range" min="320" max="500" value={phoneWidth} onChange={(e) => setPhoneWidth(e.target.value)} /><span>{phoneWidth}px</span></div>
            <div className="input-group"><label>ဖုန်းအမြင့်:</label><input type="range" min="700" max="950" value={phoneHeight} onChange={(e) => setPhoneHeight(e.target.value)} /><span>{phoneHeight}px</span></div>
            <div className="input-group"><label>အကွာအဝေး:</label><input type="range" min="1" max="15" value={contentGap} onChange={(e) => setContentGap(e.target.value)} /><span>{contentGap}px</span></div>
            <div className="input-group"><label>Live ဂဏန်းအရွယ်:</label><input type="range" min="3" max="6" step="0.2" value={liveFontSize} onChange={(e) => setLiveFontSize(e.target.value)} /><span>{liveFontSize}rem</span></div>

            <div className="section-title">🎨 ဘေးဘက် Box ပုံစံများ (Styles)</div>
            <div className="input-group">
              <label>ဘယ်ဘက် Box:</label>
              <select value={leftBoxStyle} onChange={(e) => setLeftBoxStyle(e.target.value)} className="select-style">
                <option value="modern">Modern 3D (ကြွေရောင်)</option>
                <option value="classic">Classic (အနီရောင်)</option>
                <option value="neon">Neon (မီးလင်း)</option>
                <option value="dark">Dark Pro (အမည်း)</option>
              </select>
            </div>
            <div className="input-group">
              <label>ညာဘက် Box:</label>
              <select value={rightBoxStyle} onChange={(e) => setRightBoxStyle(e.target.value)} className="select-style">
                <option value="modern">Modern 3D (ကြွေရောင်)</option>
                <option value="classic">Classic (အနီရောင်)</option>
                <option value="neon">Neon (မီးလင်း)</option>
                <option value="dark">Dark Pro (အမည်း)</option>
              </select>
            </div>

            <div className="section-title">✍️ အဓိက စာသားများ ချိန်ရန်</div>
            <div className="input-group"><label> ပွဲစဉ်:</label><input type="text" value={sessionTitle} onChange={(e) => { setSessionTitle(e.target.value); setManualSession(true); }} /></div>
            <div className="input-group"><label> နေ့/အမျိုးအစား:</label><input type="text" value={sessionDay} onChange={(e) => { setSessionDay(e.target.value); setManualSession(true); }} /></div>
            <div className="input-group"><label>ရက်စွဲ:</label><input type="text" value={customDate} onChange={(e) => setCustomDate(e.target.value)} /></div>
            <div className="input-group"><label>ပိတ်သီး:</label><input type="text" value={pitThee} onChange={(e) => setPitThee(e.target.value)} /></div>
            <div className="input-group"><label>မိန်း:</label><input type="text" value={mainNum} onChange={(e) => setMainNum(e.target.value)} /></div>
            <div className="input-group"><label>အရံ:</label><input type="text" value={subNum} onChange={(e) => setSubNum(e.target.value)} /></div>
            <div className="input-group"><label>ဟောထိပ်:</label><input type="text" value={horThout} onChange={(e) => setHorThout(e.target.value)} /></div>
            <div className="input-group"><label>အောက်ခြေစာတမ်းပြေး:</label><input type="text" value={marqueeText} onChange={(e) => setMarqueeText(e.target.value)} /></div>
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
        <div className={`phone-screen screen-${phoneScreenStyle}`} style={{ gap: `${contentGap}px` }}>
          
          <div className="top-section-group" style={{ gap: `${contentGap}px` }}>
            <div className="phone-status-bar">
              <span className="carrier">7:00</span>
              <div className="dynamic-island"></div>
              <div className="status-icons">📶 🔋</div>
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
              <div className="result-card-dynamic">
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

              <div className="result-card-dynamic">
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

            {/* Render Dynamic Custom Added Items */}
            {customItems.map((item) => {
              if (item.type === 'box') {
                return (
                  <div key={item.id} className="result-card-dynamic" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}>
                    <div className="card-title-top">{item.title}</div>
                    <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 0' }}>{item.sub}</div>
                  </div>
                );
              } else if (item.type === 'image') {
                return (
                  <div key={item.id} style={{ textAlign: 'center', margin: '2px 0' }}>
                    <img src={item.sub || item.title} alt="Custom" style={{ maxWidth: '100%', maxHeight: '80px', borderRadius: '6px' }} />
                  </div>
                );
              } else {
                return (
                  <div key={item.id} className="winner-promo-banner">
                    <span className="promo-icon">📢</span>
                    <span className="promo-text">{item.title || item.text}</span>
                  </div>
                );
              }
            })}

            <div className="phone-subscribe-footer">
              <span className="sub-icon">🔔</span>
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

      {/* Bottom Marquee Ticker */}
      <div className="marquee-container">
        <div className="marquee-text">{marqueeText}</div>
      </div>

      <style jsx>{`
        .stream-container {
          width: 1920px; height: 1080px; 
          display: flex; justify-content: space-between; align-items: center; padding: 20px 35px 50px 35px;
          position: relative; font-family: 'Pyidaungsu', sans-serif; box-sizing: border-box; overflow: hidden;
        }
        .theme-gold { background: linear-gradient(135deg, #ffdf40 0%, #ffbb00 100%); }
        .theme-dark { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); }
        .theme-cyberpunk { background: linear-gradient(135deg, #3b0764 0%, #701a75 100%); }

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

        .add-item-btn { background: #2563eb; color: #fff; border: none; padding: 8px; width: 100%; font-weight: bold; border-radius: 6px; cursor: pointer; margin-top: 5px; }
        .admin-item-row { display: flex; justify-content: space-between; align-items: center; background: #222; padding: 5px 10px; border-radius: 4px; margin-bottom: 5px; font-size: 0.8rem; }
        .admin-item-row button { background: #dc2626; color: #fff; border: none; padding: 2px 6px; border-radius: 4px; cursor: pointer; }

        .side-card { display: flex; flex-direction: column; gap: 14px; box-shadow: 0 25px 50px rgba(0,0,0,0.2); transition: all 0.2s ease; box-sizing: border-box; }
        
        .style-modern { background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(12px); border: 4px solid #ffffff; border-radius: 26px; }
        .style-modern .top-red-banner, .style-modern .date-display-box { background: linear-gradient(135deg, #e60000 0%, #990000 100%); color: #fff; border: 3px solid #ff6666; border-radius: 16px; text-align: center; font-weight: 900; padding: 12px; }
        .style-modern .live-clock-box, .style-modern .horthout-box, .style-modern .data-section-group { background: #fff; border: 3px solid #e60000; border-radius: 16px; }
        
        .style-classic { background: #b91c1c; border: 6px solid #fef08a; border-radius: 12px; }
        .style-classic .top-red-banner, .style-classic .date-display-box { background: #7f1d1d; color: #fef08a; border: 3px solid #fef08a; border-radius: 8px; text-align: center; font-weight: 900; padding: 12px; }
        .style-classic .live-clock-box, .style-classic .horthout-box, .style-classic .data-section-group { background: #fef2f2; border: 3px solid #7f1d1d; border-radius: 8px; color: #7f1d1d; }

        .style-neon { background: rgba(15, 23, 42, 0.85); border: 3px solid #38bdf8; border-radius: 20px; box-shadow: 0 0 25px rgba(56, 189, 248, 0.4); }
        .style-neon .top-red-banner, .style-neon .date-display-box { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #e0f2fe; border: 2px solid #38bdf8; border-radius: 12px; text-align: center; font-weight: 900; padding: 12px; }
        .style-neon .live-clock-box, .style-neon .horthout-box, .style-neon .data-section-group { background: #1e293b; border: 2px solid #38bdf8; border-radius: 12px; color: #f8fafc; }
        .style-neon .val-display-pro, .style-neon .ht-val { color: #38bdf8 !important; }

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
        .phone-screen { border-radius: 28px; padding: 8px 12px; display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box; overflow: hidden; }
        
        /* Phone Screen Theme Styles */
        .screen-classic { background: #ffffff; color: #000; }
        .screen-classic .result-card-dynamic { background: linear-gradient(135deg, #ff4d4d 0%, #e60000 100%); color: #fff; border: 1px solid #ff8080; }
        
        .screen-neon { background: #090d16; color: #f8fafc; border: 2px solid #0ea5e9; }
        .screen-neon .app-header-bar { background: #0ea5e9 !important; color: #fff !important; }
        .screen-neon .result-card-dynamic { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #e0f2fe; border: 1px solid #38bdf8; }
        .screen-neon .live-main-display { color: #38bdf8 !important; text-shadow: 0 0 15px rgba(56,189,248,0.5); }
        .screen-neon .update-time-indicator-large { background: #1e293b !important; color: #38bdf8 !important; border: 1px solid #0ea5e9 !important; }

        .screen-minimalist { background: #f8fafc; color: #1e293b; border: 2px solid #cbd5e1; }
        .screen-minimalist .app-header-bar { background: #334155 !important; color: #fff !important; }
        .screen-minimalist .result-card-dynamic { background: #334155 !important; color: #fff !important; border: 1px solid #475569 !important; }
        .screen-minimalist .live-main-display { color: #0f172a !important; }

        .top-section-group { display: flex; flex-direction: column; }
        .bottom-section-group { display: flex; flex-direction: column; }

        .phone-status-bar { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: bold; }
        .dynamic-island { width: 80px; height: 14px; background: #000; border-radius: 10px; }
        .app-header-bar { padding: 4px 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-size: 0.9rem; background: #ffcc00; }
        .app-logo { font-weight: 900; }
        .app-menu-icons { display: flex; gap: 4px; align-items: center; font-size: 0.75rem; }
        .badge-2d { background: #16a34a; color: #fff; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }
        .badge-3d { background: #2563eb; color: #fff; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }
        
        .live-status-pill { background: rgba(22, 163, 74, 0.1); border: 1px solid #bbf7d0; color: #16a34a; font-size: 0.75rem; font-weight: 900; padding: 2px 8px; border-radius: 15px; display: flex; align-items: center; justify-content: center; gap: 5px; width: fit-content; margin: 0 auto; }
        .pulsing-dot { width: 6px; height: 6px; background-color: #16a34a; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.6); } 70% { box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); } 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); } }

        .live-main-display { font-weight: 900; color: #16a34a; text-align: center; line-height: 1; margin: 2px 0; display: inline-block; width: 100%; }

        .update-time-indicator-large { text-align: center; font-size: 0.85rem; font-weight: 700; background: #f0fdf4; border: 1px solid #dcfce7; padding: 4px 8px; border-radius: 6px; color: #15803d; }
        .separator { margin: 0 6px; opacity: 0.6; }

        .cards-group { display: flex; flex-direction: column; }
        .result-card-dynamic { border-radius: 8px; padding: 4px 8px; }
        .card-title-top { text-align: center; font-weight: 900; font-size: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.4); padding-bottom: 1px; margin-bottom: 2px; }
        .card-sub-grid { display: flex; justify-content: space-between; text-align: center; }
        .sub-col { flex: 1; display: flex; flex-direction: column; }
        .sub-label { font-size: 0.6rem; opacity: 0.9; font-weight: bold; }
        .sub-val { font-weight: 900; }
        .highlight-num { background: rgba(0,0,0,0.25); border-radius: 4px; padding: 1px 0; }

        .winner-promo-banner { background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%); color: #ffdf40; font-weight: 900; padding: 4px 8px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between; }
        .promo-text { color: #fff; font-size: 0.62rem; text-align: center; flex: 1; }
        
        .phone-subscribe-footer { background: linear-gradient(90deg, #e60000, #990000); color: #fff; border-radius: 6px; padding: 5px; display: flex; justify-content: center; align-items: center; gap: 6px; font-weight: 900; font-size: 0.75rem; }

        /* Marquee Bottom Ticker */
        .marquee-container { position: absolute; bottom: 0; left: 0; width: 100%; background: #000; color: #ffd700; padding: 8px 0; overflow: hidden; white-space: nowrap; box-sizing: border-box; border-top: 2px solid #ffd700; z-index: 10; font-weight: bold; font-size: 0.95rem; }
        .marquee-text { display: inline-block; padding-left: 100%; animation: marquee 25s linear infinite; }
        @keyframes marquee { 0% { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
      `}</style>
    </div>
  );
}
