import Head from 'next/head';
import { useState, useEffect } from 'react';

const BIN_ID = '6ac4a0a1ffd5d1605351b310'; 
const MASTER_KEY = '$2a$10$fYB8HrDgeJuhR/ZHy2JVvuz8qs2ShnIW6ZbqQCVATxhB6dJ8NjODa';
const ADMIN_PASSWORD = "112255"; 

export default function Home() {
  const [data, setData] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  const handleAdminToggle = () => {
    if (!showAdmin) {
      let userPassword = prompt("ကျေးဇူးပြု၍ Admin Password ထည့်ပါ:");
      if (userPassword === null) return;
      if (userPassword === ADMIN_PASSWORD) {
        setShowAdmin(true);
      } else {
        alert("Password မှားယွင်းနေပါသည်။");
      }
    } else {
      setShowAdmin(false);
    }
  };

  const [phoneModel, setPhoneModel] = useState('iphone');
  const [phoneWidth, setPhoneWidth] = useState('420');
  const [phoneHeight, setPhoneHeight] = useState('880');
  
  const [bgType, setBgType] = useState('gradient');
  const [bgColor1, setBgColor1] = useState('#ffdf40');
  const [bgColor2, setBgColor2] = useState('#ffbb00');

  const [headerMarginTop, setHeaderMarginTop] = useState('0');
  const [liveNumMarginTop, setLiveNumMarginTop] = useState('0');
  const [resultCardMarginTop, setResultCardMarginTop] = useState('0');
  
  const [headerScale, setHeaderScale] = useState('1.1');
  const [liveNumScale, setLiveNumScale] = useState('7.0');
  const [resultCardScale, setResultCardScale] = useState('1.1');
  const [elementSpacing, setElementSpacing] = useState('8');
  const [phonePadding, setPhonePadding] = useState('14');

  const [sideCardWidth, setSideCardWidth] = useState('420');
  const [sideFontSize, setSideFontSize] = useState('2.8');
  const [sideValFontSize, setSideValFontSize] = useState('3.2');
  const [sideCardPadding, setSideCardPadding] = useState('20');
  const [sideCardGap, setSideCardGap] = useState('15');
  const [leftBoxStyle, setLeftBoxStyle] = useState('modern');
  const [rightBoxStyle, setRightBoxStyle] = useState('modern');

  const [marqueeText, setMarqueeText] = useState('နေ့စဉ်ကံထူးရှင်များအတွက် လက်မလွှတ်တမ်းစောင့်ကြည့်ပါ - VIP Channel ကို Subscribe လုပ်ထားပါ။');
  const [marqueeSpeed, setMarqueeSpeed] = useState('25');
  const [marqueeBg, setMarqueeBg] = useState('#000000');
  const [marqueeColor, setMarqueeColor] = useState('#ffd700');
  const [marqueeFontSize, setMarqueeFontSize] = useState('1.2');

  const [sessionTitle, setSessionTitle] = useState('4:30 PM');
  const [sessionDay, setSessionDay] = useState('ညနေပိုင်း');
  const [manualSession, setManualSession] = useState(false);
  const [customDate, setCustomDate] = useState('06-10-2026');
  const [pitThee, setPitThee] = useState('5-3-2');
  const [mainNum, setMainNum] = useState('53-57-39');
  const [subNum, setSubNum] = useState('35-23-25');
  const [horThout, setHorThout] = useState('5-9-8');

  // AI Host & Side Text Controls
  const [enableAvatar, setEnableAvatar] = useState(true);
  const [avatarStatusText, setAvatarStatusText] = useState('ယနေ့အတွက် 2D တိုက်ရိုက်အချက်အလက်များကို အချိန်နဲ့တစ်ပြေးညီ တင်ဆက်ပေးနေပါသည်ခင်ဗျာ...');
  const [hostImageSize, setHostImageSize] = useState('150');
  const [hostPosX, setHostPosX] = useState('-120'); // ဘေးဘယ်ညာ ရွှေ့ရန်
  const [hostPosY, setHostPosY] = useState('-50');  // အထက်အောက် ရွှေ့ရန်
  const [hostTextWidth, setHostTextWidth] = useState('160'); // စာသားဘောက်စ် အကျယ်
  const [hostTextFontSize, setHostTextFontSize] = useState('0.85'); // စာသား အရွယ်အစား

  const [customItems, setCustomItems] = useState([
    { 
      id: 1, 
      type: 'banner', 
      title: '', 
      text: 'နေ့စဉ်ကံထူးရှင်များအတွက် လက်မလွှတ်တမ်းစောင့်ကြည့်ပါ', 
      bg: '#7c3aed', 
      color: '#ffffff', 
      fontSize: '0.95', 
      padding: '8', 
      marginTop: '0' 
    }
  ]);

  const [newItemType, setNewItemType] = useState('box');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemSub, setNewItemSub] = useState('');
  const [newItemBg, setNewItemBg] = useState('#2563eb');
  const [newItemColor, setNewItemColor] = useState('#ffffff');
  const [newItemFontSize, setNewItemFontSize] = useState('0.95');
  const [newItemPadding, setNewItemPadding] = useState('8');
  const [newItemMarginTop, setNewItemMarginTop] = useState('0');

  const fetchSettings = async () => {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': MASTER_KEY }
      });
      const response = await res.json();
      const s = response.record;
      if (s) {
        if (s.phoneModel !== undefined) setPhoneModel(s.phoneModel);
        if (s.phoneWidth !== undefined) setPhoneWidth(s.phoneWidth);
        if (s.phoneHeight !== undefined) setPhoneHeight(s.phoneHeight);
        if (s.bgType !== undefined) setBgType(s.bgType);
        if (s.bgColor1 !== undefined) setBgColor1(s.bgColor1);
        if (s.bgColor2 !== undefined) setBgColor2(s.bgColor2);
        if (s.headerMarginTop !== undefined) setHeaderMarginTop(s.headerMarginTop);
        if (s.liveNumMarginTop !== undefined) setLiveNumMarginTop(s.liveNumMarginTop);
        if (s.resultCardMarginTop !== undefined) setResultCardMarginTop(s.resultCardMarginTop);
        if (s.headerScale !== undefined) setHeaderScale(s.headerScale);
        if (s.liveNumScale !== undefined) setLiveNumScale(s.liveNumScale);
        if (s.resultCardScale !== undefined) setResultCardScale(s.resultCardScale);
        if (s.elementSpacing !== undefined) setElementSpacing(s.elementSpacing);
        if (s.phonePadding !== undefined) setPhonePadding(s.phonePadding);
        if (s.sideCardWidth !== undefined) setSideCardWidth(s.sideCardWidth);
        if (s.sideFontSize !== undefined) setSideFontSize(s.sideFontSize);
        if (s.sideValFontSize !== undefined) setSideValFontSize(s.sideValFontSize);
        if (s.sideCardPadding !== undefined) setSideCardPadding(s.sideCardPadding);
        if (s.sideCardGap !== undefined) setSideCardGap(s.sideCardGap);
        if (s.leftBoxStyle !== undefined) setLeftBoxStyle(s.leftBoxStyle);
        if (s.rightBoxStyle !== undefined) setRightBoxStyle(s.rightBoxStyle);
        if (s.marqueeText !== undefined) setMarqueeText(s.marqueeText);
        if (s.marqueeSpeed !== undefined) setMarqueeSpeed(s.marqueeSpeed);
        if (s.marqueeBg !== undefined) setMarqueeBg(s.marqueeBg);
        if (s.marqueeColor !== undefined) setMarqueeColor(s.marqueeColor);
        if (s.marqueeFontSize !== undefined) setMarqueeFontSize(s.marqueeFontSize);
        if (s.sessionTitle !== undefined) setSessionTitle(s.sessionTitle);
        if (s.sessionDay !== undefined) setSessionDay(s.sessionDay);
        if (s.customDate !== undefined) setCustomDate(s.customDate);
        if (s.pitThee !== undefined) setPitThee(s.pitThee);
        if (s.mainNum !== undefined) setMainNum(s.mainNum);
        if (s.subNum !== undefined) setSubNum(s.subNum);
        if (s.horThout !== undefined) setHorThout(s.horThout);
        if (s.customItems !== undefined) setCustomItems(s.customItems);
        if (s.avatarStatusText !== undefined) setAvatarStatusText(s.avatarStatusText);
        if (s.enableAvatar !== undefined) setEnableAvatar(s.enableAvatar);
        if (s.hostImageSize !== undefined) setHostImageSize(s.hostImageSize);
        if (s.hostPosX !== undefined) setHostPosX(s.hostPosX);
        if (s.hostPosY !== undefined) setHostPosY(s.hostPosY);
        if (s.hostTextWidth !== undefined) setHostTextWidth(s.hostTextWidth);
        if (s.hostTextFontSize !== undefined) setHostTextFontSize(s.hostTextFontSize);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
    const syncInterval = setInterval(fetchSettings, 3000);
    return () => clearInterval(syncInterval);
  }, []);

  const handleSaveSettings = async () => {
    const newSettings = {
      phoneModel, phoneWidth, phoneHeight, bgType, bgColor1, bgColor2,
      headerMarginTop, liveNumMarginTop, resultCardMarginTop,
      headerScale, liveNumScale, resultCardScale, elementSpacing, phonePadding,
      sideCardWidth, sideFontSize, sideValFontSize, sideCardPadding, sideCardGap,
      leftBoxStyle, rightBoxStyle, marqueeText, marqueeSpeed, marqueeBg, marqueeColor, marqueeFontSize,
      sessionTitle, sessionDay, customDate, pitThee, mainNum, subNum, horThout, customItems,
      avatarStatusText, enableAvatar, hostImageSize, hostPosX, hostPosY, hostTextWidth, hostTextFontSize
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
        setTimeout(() => setSaveMessage(false), 1500);
      } else {
        alert('သိမ်းဆည်းရန် မအောင်မြင်ပါ');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error connecting to server');
    }
  };

  const handleAddItem = () => {
    if (!newItemTitle && newItemType === 'box') { alert('Box ခေါင်းစဉ် ထည့်ပါ။'); return; }
    if (!newItemTitle && newItemType === 'banner') { alert('Banner စာသား ထည့်ပါ။'); return; }
    const newItem = {
      id: Date.now(),
      type: newItemType,
      title: newItemType === 'box' ? newItemTitle : '',
      text: newItemType === 'banner' ? newItemTitle : '',
      sub: newItemSub,
      bg: newItemBg,
      color: newItemColor,
      fontSize: newItemFontSize,
      padding: newItemPadding,
      marginTop: newItemMarginTop
    };
    setCustomItems([...customItems, newItem]);
    setNewItemTitle('');
    setNewItemSub('');
  };

  const handleDeleteItem = (id) => {
    setCustomItems(customItems.filter(item => item.id !== id));
  };

  const handleUpdateItemProperty = (id, property, value) => {
    setCustomItems(customItems.map(item => item.id === id ? { ...item, [property]: value } : item));
  };

  const fetchData = async () => {
    const apis = [
      'https://api.thaistock2d.com/live',
      'https://api.twodlive.com/live',
      'https://api.2d3dmyanmar.com/live'
    ];

    let fetched = false;
    for (let api of apis) {
      try {
        const res = await fetch(api);
        const json = await res.json();
        if (json) { setData(json); fetched = true; break; }
      } catch (err) { continue; }
    }

    if (!fetched) {
      try {
        const resInternal = await fetch('/api/live');
        const jsonInternal = await resInternal.json();
        setData(jsonInternal);
      } catch (e) { console.error('All live data sources failed:', e); }
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
      hours = hours % 12 || 12;
      setCurrentTime ? setCurrentTime(`${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`) : null;

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

  const [currentTime, setCurrentTime] = useState("");
  const resultsArray = Array.isArray(data) ? data : (data?.result || data?.data?.result || []);
  const getResult = (timeStr) => resultsArray.find(r => r.open_time && r.open_time.includes(timeStr));

  const result12 = getResult("12:01");
  const result1630 = getResult("16:30");

  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const myanmarTime = new Date(utc + (3600000 * 6.5));
  const totalMinutes = myanmarTime.getHours() * 60 + myanmarTime.getMinutes();
  const isPausedTime = totalMinutes >= (12 * 60 + 2) && totalMinutes < (14 * 60);

  let liveTwod = data?.live?.twod || data?.twod || data?.data?.live?.twod || data?.data?.twod || "33";
  let liveSet = data?.live?.set || data?.set || data?.data?.live?.set || data?.data?.set || "1,572.80";
  let liveVal = data?.live?.value || data?.value || data?.data?.live?.value || data?.data?.value || "31,350.28";

  if (isPausedTime && result12) {
    liveTwod = result12.twod || liveTwod;
    liveSet = result12.set || liveSet;
    liveVal = result12.value || liveVal;
  }

  const customBgStyle = {
    background: bgType === 'solid' ? bgColor1 : `linear-gradient(135deg, ${bgColor1} 0%, ${bgColor2} 100%)`
  };

  return (
    <div className="stream-container" style={customBgStyle}>
      <Head>
        <title>2D LIVE MYANMAR - Ultimate Custom Pro with Side AI Host</title>
      </Head>

      <button className="admin-toggle-btn" onClick={(e) => { e.stopPropagation(); handleAdminToggle(); }}>
        {showAdmin ? "❌ Control Panel ပိတ်မည်" : "⚙️ Pro Control Panel ဖွင့်မည်"}
      </button>

      {showAdmin && (
        <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
          <div className="admin-header-fixed">
            <h3>🎛️ Element-by-Element Studio Panel</h3>
            <div className="save-action-box">
              <button className="save-btn" onClick={handleSaveSettings}>💾 သိမ်းဆည်းမည်</button>
              <button className="reset-btn" onClick={() => window.location.reload()}>🔄 ပြန်စရန်</button>
              {saveMessage && <span className="save-alert">✅ အောင်မြင်ပါပြီ!</span>}
            </div>
          </div>

          <div className="admin-scrollable-content">
            <div className="section-title">🤖 AI Host & Side Text ဆက်တင်များ</div>
            <div className="input-group">
              <label>AI Host ပြရန်:</label>
              <input type="checkbox" checked={enableAvatar} onChange={(e) => setEnableAvatar(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#22c55e', cursor: 'pointer' }} />
            </div>
            <div className="input-group">
              <label>AI Host ပုံအရွယ်အစား:</label>
              <input type="range" min="80" max="250" value={hostImageSize} onChange={(e) => setHostImageSize(e.target.value)} /><span>{hostImageSize}px</span>
            </div>
            <div className="input-group">
              <label>ဘေးဘယ်ညာ နေရာ (Pos X):</label>
              <input type="range" min="-250" max="100" value={hostPosX} onChange={(e) => setHostPosX(e.target.value)} /><span>{hostPosX}px</span>
            </div>
            <div className="input-group">
              <label>အထက်အောက် နေရာ (Pos Y):</label>
              <input type="range" min="-150" max="150" value={hostPosY} onChange={(e) => setHostPosY(e.target.value)} /><span>{hostPosY}px</span>
            </div>
            <div className="input-group">
              <label>ဘေးစာသားဘောက်စ် အကျယ်:</label>
              <input type="range" min="100" max="300" value={hostTextWidth} onChange={(e) => setHostTextWidth(e.target.value)} /><span>{hostTextWidth}px</span>
            </div>
            <div className="input-group">
              <label>ဘေးစာသား အရွယ်အစား:</label>
              <input type="range" min="0.6" max="1.4" step="0.05" value={hostTextFontSize} onChange={(e) => setHostTextFontSize(e.target.value)} /><span>{hostTextFontSize}</span>
            </div>
            <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '5px' }}>
              <label>ဘေးတွင်ပြမည့် တင်ဆက်မှု စာသား:</label>
              <textarea 
                value={avatarStatusText} 
                onChange={(e) => setAvatarStatusText(e.target.value)} 
                style={{ width: '100%', height: '70px', background: '#222', color: '#fff', border: '1px solid #555', borderRadius: '4px', padding: '6px' }} 
              />
            </div>

            <div className="section-title">🎨 Background အရောင်များ</div>
            <div className="input-group">
              <label>အရောင်ပုံစံ:</label>
              <select value={bgType} onChange={(e) => setBgType(e.target.value)} className="select-style">
                <option value="gradient">Gradient (နှစ်ရောင်စပ်)</option>
                <option value="solid">Solid Color (တစ်ရောင်တည်း)</option>
              </select>
            </div>
            <div className="input-group">
              <label>အရောင် (၁):</label>
              <input type="color" value={bgColor1} onChange={(e) => setBgColor1(e.target.value)} style={{ width: '45px', height: '26px', border: 'none', background: 'none', cursor: 'pointer' }} />
              <span>{bgColor1}</span>
            </div>
            {bgType === 'gradient' && (
              <div className="input-group">
                <label>အရောင် (၂):</label>
                <input type="color" value={bgColor2} onChange={(e) => setBgColor2(e.target.value)} style={{ width: '45px', height: '26px', border: 'none', background: 'none', cursor: 'pointer' }} />
                <span>{bgColor2}</span>
              </div>
            )}

            <div className="section-title">📦 ဘယ်/ညာ Box များနှင့် စတိုင်လ်များ</div>
            <div className="input-group">
              <label>ဘယ်ဘက်စတိုင်:</label>
              <select value={leftBoxStyle} onChange={(e) => setLeftBoxStyle(e.target.value)} className="select-style">
                <option value="modern">Modern Glass</option>
                <option value="classic">Classic Solid</option>
              </select>
            </div>
            <div className="input-group">
              <label>ညာဘက်စတိုင်:</label>
              <select value={rightBoxStyle} onChange={(e) => setRightBoxStyle(e.target.value)} className="select-style">
                <option value="modern">Modern Glass</option>
                <option value="classic">Classic Solid</option>
              </select>
            </div>
            <div className="input-group"><label>ဘောက်စ် အကျယ်:</label><input type="range" min="300" max="550" value={sideCardWidth} onChange={(e) => setSideCardWidth(e.target.value)} /><span>{sideCardWidth}px</span></div>
            <div className="input-group"><label>ဘောက်စ် Padding:</label><input type="range" min="10" max="40" value={sideCardPadding} onChange={(e) => setSideCardPadding(e.target.value)} /><span>{sideCardPadding}px</span></div>
            <div className="input-group"><label>အတွင်း အကွာအဝေး (Gap):</label><input type="range" min="5" max="35" value={sideCardGap} onChange={(e) => setSideCardGap(e.target.value)} /><span>{sideCardGap}px</span></div>
            <div className="input-group"><label>ခေါင်းစဉ် စာသားအရွယ်:</label><input type="range" min="1.5" max="4.5" step="0.1" value={sideFontSize} onChange={(e) => setSideFontSize(e.target.value)} /><span>{sideFontSize}rem</span></div>
            <div className="input-group"><label>ဂဏန်း/တန်ဖိုး အရွယ်:</label><input type="range" min="2.0" max="5.5" step="0.1" value={sideValFontSize} onChange={(e) => setSideValFontSize(e.target.value)} /><span>{sideValFontSize}rem</span></div>

            <div className="section-title">📱 ဖုန်းဘောင် အထွေထွေ ချိန်ညှိရန်</div>
            <div className="input-group">
              <label>ဖုန်းမော်ဒယ်:</label>
              <select value={phoneModel} onChange={(e) => setPhoneModel(e.target.value)} className="select-style">
                <option value="iphone">iPhone (Dynamic Island)</option>
                <option value="samsung">Samsung (Punch Hole)</option>
                <option value="redmi">Redmi / Xiaomi (Notch)</option>
              </select>
            </div>
            <div className="input-group"><label>ဖုန်းအကျယ်:</label><input type="range" min="350" max="520" value={phoneWidth} onChange={(e) => setPhoneWidth(e.target.value)} /><span>{phoneWidth}px</span></div>
            <div className="input-group"><label>ဖုန်းအမြင့်:</label><input type="range" min="750" max="980" value={phoneHeight} onChange={(e) => setPhoneHeight(e.target.value)} /><span>{phoneHeight}px</span></div>
            <div className="input-group"><label>စခရင် Padding:</label><input type="range" min="6" max="25" value={phonePadding} onChange={(e) => setPhonePadding(e.target.value)} /><span>{phonePadding}px</span></div>

            <div className="section-title">🎯 စခရင်တွင်း Object တစ်ခုချင်း ချိန်ရန်</div>
            <div className="input-group"><label>Header အနေအထား (Top):</label><input type="range" min="-30" max="50" value={headerMarginTop} onChange={(e) => setHeaderMarginTop(e.target.value)} /><span>{headerMarginTop}px</span></div>
            <div className="input-group"><label>Header အချိုး (Scale):</label><input type="range" min="0.8" max="1.6" step="0.1" value={headerScale} onChange={(e) => setHeaderScale(e.target.value)} /><span>{headerScale}x</span></div>
            
            <div className="input-group"><label>Live ဂဏန်း အနေအထား (Top):</label><input type="range" min="-30" max="50" value={liveNumMarginTop} onChange={(e) => setLiveNumMarginTop(e.target.value)} /><span>{liveNumMarginTop}px</span></div>
            <div className="input-group"><label>Live ဂဏန်း အရွယ်:</label><input type="range" min="4.0" max="10.0" step="0.2" value={liveNumScale} onChange={(e) => setLiveNumScale(e.target.value)} /><span>{liveNumScale}rem</span></div>

            <div className="input-group"><label>Result Card အနေအထား (Top):</label><input type="range" min="-30" max="50" value={resultCardMarginTop} onChange={(e) => setResultCardMarginTop(e.target.value)} /><span>{resultCardMarginTop}px</span></div>
            <div className="input-group"><label>Result Card အရွယ်:</label><input type="range" min="0.8" max="1.6" step="0.1" value={resultCardScale} onChange={(e) => setResultCardScale(e.target.value)} /><span>{resultCardScale}x</span></div>

            <div className="section-title">⚡ အောက်ခြေ စာတန်းပြေး (Marquee)</div>
            <div className="input-group"><label>စာသား:</label><input type="text" value={marqueeText} onChange={(e) => setMarqueeText(e.target.value)} style={{ width: '55%' }} /></div>
            <div className="input-group"><label>အမြန်နှုန်း (စက္ကန့်):</label><input type="range" min="5" max="60" value={marqueeSpeed} onChange={(e) => setMarqueeSpeed(e.target.value)} /><span>{marqueeSpeed}s</span></div>
            <div className="input-group"><label>စာသားအရွယ်:</label><input type="range" min="0.8" max="2.2" step="0.1" value={marqueeFontSize} onChange={(e) => setMarqueeFontSize(e.target.value)} /><span>{marqueeFontSize}rem</span></div>
            <div className="input-group"><label>နောက်ခံအရောင်:</label><input type="color" value={marqueeBg} onChange={(e) => setMarqueeBg(e.target.value)} style={{ width: '45px', height: '24px', border: 'none', background: 'none', cursor: 'pointer' }} /></div>
            <div className="input-group"><label>စာသားအရောင်:</label><input type="color" value={marqueeColor} onChange={(e) => setMarqueeColor(e.target.value)} style={{ width: '45px', height: '24px', border: 'none', background: 'none', cursor: 'pointer' }} /></div>

            <div className="section-title">📦 Box / Banner အသစ်ထပ်ထည့်ရန်</div>
            <div className="input-group">
              <label>အမျိုးအစား:</label>
              <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)} className="select-style">
                <option value="box">Result/Info Box</option>
                <option value="banner">Banner Text</option>
              </select>
            </div>
            <div className="input-group"><label>ခေါင်းစဉ်/စာသား:</label><input type="text" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} placeholder="ဥပမာ - VIP အထူးဂဏန်း" /></div>
            <div className="input-group"><label>အသေးစိတ်:</label><input type="text" value={newItemSub} onChange={(e) => setNewItemSub(e.target.value)} placeholder="ဥပမာ - ဆက်သွယ်ရန်" /></div>
            <div className="input-group"><label>နောက်ခံအရောင်:</label><input type="color" value={newItemBg} onChange={(e) => setNewItemBg(e.target.value)} style={{ width: '45px', height: '24px', border: 'none', background: 'none', cursor: 'pointer' }} /></div>
            <div className="input-group"><label>စာသားအရောင်:</label><input type="color" value={newItemColor} onChange={(e) => setNewItemColor(e.target.value)} style={{ width: '45px', height: '24px', border: 'none', background: 'none', cursor: 'pointer' }} /></div>
            <div className="input-group"><label>ဖောင့်အရွယ် (rem):</label><input type="range" min="0.6" max="2.0" step="0.05" value={newItemFontSize} onChange={(e) => setNewItemFontSize(e.target.value)} /><span>{newItemFontSize}</span></div>
            <div className="input-group"><label>Padding:</label><input type="range" min="4" max="25" value={newItemPadding} onChange={(e) => setNewItemPadding(e.target.value)} /><span>{newItemPadding}px</span></div>
            <div className="input-group"><label>အပေါ်အကွာအဝေး (Top):</label><input type="range" min="-20" max="30" value={newItemMarginTop} onChange={(e) => setNewItemMarginTop(e.target.value)} /><span>{newItemMarginTop}px</span></div>
            
            <button className="add-item-btn" onClick={handleAddItem}>+ စခရင်ထဲ ထည့်မည်</button>

            <div className="section-title">⚙️ ထည့်ထားပြီးသား Box/Banner များကို ပြင်ဆင်/ဖျက်ရန်</div>
            {customItems.map((item) => (
              <div key={item.id} className="admin-item-customizer-box">
                <div className="admin-item-row">
                  <span style={{ fontWeight: 'bold', color: '#ffd700' }}>{item.title || item.text}</span>
                  <button onClick={() => handleDeleteItem(item.id)} className="del-btn">ဖျက်ရန်</button>
                </div>
                <div className="input-group"><label>နောက်ခံအရောင်:</label><input type="color" value={item.bg || '#2563eb'} onChange={(e) => handleUpdateItemProperty(item.id, 'bg', e.target.value)} style={{ width: '40px', height: '22px', border: 'none', background: 'none', cursor: 'pointer' }} /></div>
                <div className="input-group"><label>စာသားအရောင်:</label><input type="color" value={item.color || '#ffffff'} onChange={(e) => handleUpdateItemProperty(item.id, 'color', e.target.value)} style={{ width: '40px', height: '22px', border: 'none', background: 'none', cursor: 'pointer' }} /></div>
                <div className="input-group"><label>ဖောင့်အရွယ်:</label><input type="range" min="0.6" max="2.0" step="0.05" value={item.fontSize || '0.95'} onChange={(e) => handleUpdateItemProperty(item.id, 'fontSize', e.target.value)} /><span>{item.fontSize || '0.95'}</span></div>
                <div className="input-group"><label>Padding:</label><input type="range" min="4" max="25" value={item.padding || '8'} onChange={(e) => handleUpdateItemProperty(item.id, 'padding', e.target.value)} /><span>{item.padding || '8'}px</span></div>
                <div className="input-group"><label>အပေါ်အကွာ (Top):</label><input type="range" min="-20" max="30" value={item.marginTop || '0'} onChange={(e) => handleUpdateItemProperty(item.id, 'marginTop', e.target.value)} /><span>{item.marginTop || '0'}px</span></div>
              </div>
            ))}

            <div className="section-title">✍️ အဓိက အချက်အလက်များ</div>
            <div className="input-group"><label>ပွဲစဉ်:</label><input type="text" value={sessionTitle} onChange={(e) => { setSessionTitle(e.target.value); setManualSession(true); }} /></div>
            <div className="input-group"><label>နေ့/အမျိုးအစား:</label><input type="text" value={sessionDay} onChange={(e) => { setSessionDay(e.target.value); setManualSession(true); }} /></div>
            <div className="input-group"><label>ရက်စွဲ:</label><input type="text" value={customDate} onChange={(e) => setCustomDate(e.target.value)} /></div>
            <div className="input-group"><label>ပတ်သီး:</label><input type="text" value={pitThee} onChange={(e) => setPitThee(e.target.value)} /></div>
            <div className="input-group"><label>မိန်း:</label><input type="text" value={mainNum} onChange={(e) => setMainNum(e.target.value)} /></div>
            <div className="input-group"><label>အရံ:</label><input type="text" value={subNum} onChange={(e) => setSubNum(e.target.value)} /></div>
            <div className="input-group"><label>ဟောထိပ်:</label><input type="text" value={horThout} onChange={(e) => setHorThout(e.target.value)} /></div>
          </div>
        </div>
      )}

      {/* ဘယ်ဘက်ခြမ်း */}
      <div className={`side-card left-card style-${leftBoxStyle}`} style={{ width: `${sideCardWidth}px`, padding: `${sideCardPadding}px`, gap: `${sideCardGap}px` }}>
        <div className="top-red-banner" style={{ fontSize: `${sideFontSize}rem` }}>{sessionTitle}</div>
        <div className="live-clock-box" style={{ fontSize: `${sideFontSize * 0.75}rem` }}>{currentTime}</div>
        <div className="red-label-box" style={{ fontSize: `${sideFontSize * 0.65}rem` }}>{sessionDay}</div>
        <div className="youtube-subscribe-tag" style={{ fontSize: `${sideFontSize * 0.5}rem` }}>
          <span>▶ SUBSCRIBE</span>
        </div>
        <div className="horthout-box">
          <span className="ht-label" style={{ fontSize: `${sideFontSize * 0.45}rem` }}>ဟောထိပ်</span>
          <span className="ht-val" style={{ fontSize: `${sideValFontSize}rem` }}>{horThout}</span>
        </div>
      </div>

      {/* အလယ် ဖုန်းပုံစံ နှင့် ဘယ်ဘက်ထောင့်ဆုံးတွင် ဘေးတိုက်ပြမည့် AI Host နှင့် စာသားဘောက်စ် */}
      <div className="center-stream-wrapper">
        {enableAvatar && (
          <div 
            className="side-ai-host-wrapper" 
            style={{ 
              left: `${hostPosX}px`, 
              top: `calc(50% + ${hostPosY}px)` 
            }}
          >
            <div className="side-avatar-circle-frame" style={{ width: `${hostImageSize}px`, height: `${hostImageSize}px` }}>
              <video 
                src="/ai-host.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div className="side-avatar-speech-box" style={{ width: `${hostTextWidth}px` }}>
              <span className="host-title-side">🎙 AI Host:</span>
              <p style={{ fontSize: `${hostTextFontSize}rem` }}>{avatarStatusText}</p>
            </div>
          </div>
        )}

        <div className={`phone-container model-${phoneModel}`} style={{ width: `${phoneWidth}px`, height: `${phoneHeight}px` }}>
          <div className="phone-screen" style={{ gap: `${elementSpacing}px`, padding: `${phonePadding}px` }}>
            
            <div className="top-section-group" style={{ gap: `${elementSpacing}px`, transform: `scale(${headerScale})`, transformOrigin: 'top center', marginTop: `${headerMarginTop}px` }}>
              <div className="phone-status-bar">
                <span className="carrier">7:00</span>
                {phoneModel === 'iphone' && <div className="iphone-dynamic-island"></div>}
                {phoneModel === 'samsung' && <div className="samsung-punch-hole"></div>}
                {phoneModel === 'redmi' && <div className="redmi-notch"></div>}
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
            </div>

            <div className="live-main-display-wrapper" style={{ marginTop: `${liveNumMarginTop}px` }}>
              <div className="live-main-display live-bounce-effect" style={{ fontSize: `${liveNumScale}rem` }}>
                {liveTwod}
              </div>

              <div className="update-time-indicator-large">
                <span>SET: <strong>{liveSet}</strong></span>
                <span className="separator">|</span>
                <span>Value: <strong>{liveVal}</strong></span>
              </div>
            </div>

            <div className="bottom-section-group" style={{ gap: `${elementSpacing}px`, transform: `scale(${resultCardScale})`, transformOrigin: 'center center', marginTop: `${resultCardMarginTop}px` }}>
              <div className="cards-group" style={{ gap: `${elementSpacing}px` }}>
                <div className="result-card-dynamic">
                  <div className="card-title-top">12:01 PM Result</div>
                  <div className="card-sub-grid">
                    <div className="sub-col"><span className="sub-label">SET</span><span className="sub-val">{result12?.set || "--"}</span></div>
                    <div className="sub-col"><span className="sub-label">Value</span><span className="sub-val">{result12?.value || "--"}</span></div>
                    <div className="sub-col"><span className="sub-label">2D</span><span className="sub-val highlight-num">{result12?.twod || "--"}</span></div>
                  </div>
                </div>

                <div className="result-card-dynamic">
                  <div className="card-title-top">4:30 PM Result</div>
                  <div className="card-sub-grid">
                    <div className="sub-col"><span className="sub-label">SET</span><span className="sub-val">{result1630?.set || "--"}</span></div>
                    <div className="sub-col"><span className="sub-label">Value</span><span className="sub-val">{result1630?.value || "--"}</span></div>
                    <div className="sub-col"><span className="sub-label">2D</span><span className="sub-val highlight-num">{result1630?.twod || "--"}</span></div>
                  </div>
                </div>
              </div>

              {customItems.map((item) => (
                <div 
                  key={item.id} 
                  className={item.type === 'box' ? "result-card-dynamic" : "winner-promo-banner"} 
                  style={{ 
                    background: item.bg || (item.type === 'box' ? '#2563eb' : '#7c3aed'), 
                    color: item.color || '#fff',
                    fontSize: `${item.fontSize || 0.95}rem`,
                    padding: `${item.padding || 8}px 10px`,
                    marginTop: `${item.marginTop || 0}px`
                  }}
                >
                  {item.type === 'box' && <div className="card-title-top" style={{ fontSize: `${(item.fontSize || 0.95) * 0.95}rem` }}>{item.title}</div>}
                  <div style={{ textAlign: 'center' }}>{item.type === 'banner' ? item.text : item.sub}</div>
                </div>
              ))}

              <div className="phone-subscribe-footer">
                <span>🔔 LIKE & SUBSCRIBE 🔔</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ညာဘက်ခြမ်း */}
      <div className={`side-card right-card style-${rightBoxStyle}`} style={{ width: `${sideCardWidth}px`, padding: `${sideCardPadding}px`, gap: `${sideCardGap}px` }}>
        <div className="date-display-box" style={{ fontSize: `${sideFontSize}rem` }}>{customDate}</div>
        <div className="data-section-group">
          <div className="purple-badge-wrapper"><span className="purple-circle-badge" style={{ fontSize: `${sideFontSize * 0.38}rem` }}>ယနေ့အတွက်ပတ်သီး</span></div>
          <div className="val-display-pro" style={{ fontSize: `${sideValFontSize}rem` }}>{pitThee}</div>
        </div>
        <div className="data-section-group">
          <div className="purple-badge-wrapper"><span className="purple-circle-badge" style={{ fontSize: `${sideFontSize * 0.38}rem` }}>မိန်း (Main)</span></div>
          <div className="val-display-pro" style={{ fontSize: `${sideValFontSize}rem` }}>{mainNum}</div>
        </div>
        <div className="data-section-group">
          <div className="purple-badge-wrapper"><span className="purple-circle-badge" style={{ fontSize: `${sideFontSize * 0.38}rem` }}>အရံ (Sub)</span></div>
          <div className="val-display-pro" style={{ fontSize: `${sideValFontSize}rem` }}>{subNum}</div>
        </div>
      </div>

      {/* Custom Marquee Ticker */}
      <div className="marquee-container" style={{ background: marqueeBg, borderTop: `2px solid ${marqueeColor}` }}>
        <div className="marquee-text" style={{ animationDuration: `${marqueeSpeed}s`, color: marqueeColor, fontSize: `${marqueeFontSize}rem` }}>
          {marqueeText}
        </div>
      </div>

      <style jsx>{`
        .stream-container {
          width: 1920px; height: 1080px; 
          display: flex; justify-content: space-between; align-items: center; padding: 20px 35px 55px 35px;
          position: relative; font-family: 'Pyidaungsu', sans-serif; box-sizing: border-box; overflow: hidden;
        }

        .admin-toggle-btn { position: fixed; top: 20px; left: 20px; background: #000; color: #ffd700; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer; z-index: 99999; font-size: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
        .admin-panel { position: fixed; top: 75px; left: 20px; background: #111; border: 2px solid #ffd700; border-radius: 12px; z-index: 99999; width: 440px; color: #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.8); height: 82vh; display: flex; flex-direction: column; overflow: hidden; }
        .admin-header-fixed { padding: 15px; background: #111; border-bottom: 1px solid #333; flex-shrink: 0; }
        .admin-header-fixed h3 { margin: 0 0 8px 0; color: #ffd700; font-size: 1rem; }
        .admin-scrollable-content { padding: 10px 15px 15px 15px; overflow-y: auto; flex-grow: 1; }

        .save-action-box { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; background: #222; padding: 6px 10px; border-radius: 8px; border: 1px dashed #555; }
        .save-btn { background: #16a34a; color: #fff; border: none; padding: 6px 12px; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
        .reset-btn { background: #dc2626; color: #fff; border: none; padding: 6px 10px; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .save-alert { color: #4ade80; font-size: 0.8rem; font-weight: bold; width: 100%; text-align: center; }

        .section-title { font-size: 0.85rem; color: #60a5fa; font-weight: bold; margin: 14px 0 6px 0; border-bottom: 1px dashed #444; padding-bottom: 3px; }
        .input-group { display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center; font-size: 0.85rem; }
        .input-group label { color: #ccc; font-weight: bold; }
        .input-group input[type="text"] { background: #222; border: 1px solid #555; color: #fff; padding: 4px 8px; border-radius: 4px; width: 50%; }
        .input-group input[type="range"] { width: 38%; accent-color: #ffd700; }
        .input-group span { color: #ffd700; font-weight: bold; font-size: 0.8rem; width: 45px; text-align: right; }
        .select-style { background: #222; border: 1px solid #555; color: #ffd700; padding: 4px 8px; border-radius: 4px; width: 50%; font-weight: bold; }

        .add-item-btn { background: #2563eb; color: #fff; border: none; padding: 8px; width: 100%; font-weight: bold; border-radius: 6px; cursor: pointer; margin-top: 5px; }
        .admin-item-customizer-box { background: #1c1c1c; border: 1px solid #444; border-radius: 8px; padding: 8px 10px; margin-bottom: 8px; }
        .admin-item-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid #333; padding-bottom: 4px; font-size: 0.8rem; }
        .del-btn { background: #dc2626; color: #fff; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.75rem; }

        .center-stream-wrapper { display: flex; align-items: center; gap: 20px; justify-content: center; position: relative; z-index: 50; }
        
        /* ဘယ်ဘက်ထောင့်ဆုံးတွင် ဘေးတိုက်ပြမည့် AI Host နှင့် စာသားဘောက်စ် */
        .side-ai-host-wrapper { 
          display: flex; align-items: center; gap: 10px; 
          background: rgba(255, 255, 255, 0.96); padding: 12px; border-radius: 16px; 
          border: 3px solid #16a34a; box-shadow: 0 15px 35px rgba(0,0,0,0.4); 
          position: absolute; transform: translateY(-50%); z-index: 100; 
        }
        .side-avatar-circle-frame { border-radius: 50%; overflow: hidden; border: 3px solid #16a34a; background: #fff; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .side-avatar-speech-box { display: flex; flex-direction: column; gap: 2px; }
        .host-title-side { font-size: 0.75rem; font-weight: 900; color: #15803d; }
        .side-avatar-speech-box p { margin: 0; color: #1f2937; font-weight: bold; line-height: 1.3; }

        .phone-container { background: #111; display: flex; flex-direction: column; box-sizing: border-box; transition: width 0.2s, height 0.2s; box-shadow: 0 25px 50px rgba(0,0,0,0.5); z-index: 20; }
        .model-iphone { border: 10px solid #1f2937; border-radius: 40px; }
        .model-samsung { border: 6px solid #374151; border-radius: 24px; }
        .model-redmi { border: 4px solid #4b5563; border-radius: 12px; }

        .phone-screen { background: #fff; color: #000; border-radius: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box; overflow: hidden; }

        .phone-status-bar { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: bold; height: 20px; }
        .iphone-dynamic-island { width: 80px; height: 14px; background: #000; border-radius: 10px; }
        .samsung-punch-hole { width: 12px; height: 12px; background: #000; border-radius: 50%; }
        .redmi-notch { width: 60px; height: 10px; background: #000; border-radius: 0 0 8px 8px; }

        .app-header-bar { padding: 6px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; font-size: 0.9rem; background: #ffcc00; }
        .app-logo { font-weight: 900; }
        .app-menu-icons { display: flex; gap: 4px; align-items: center; font-size: 0.75rem; }
        .badge-2d { background: #16a34a; color: #fff; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }
        .badge-3d { background: #2563eb; color: #fff; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }
        
        .live-status-pill { background: rgba(22, 163, 74, 0.1); border: 1px solid #bbf7d0; color: #16a34a; font-size: 0.75rem; font-weight: 900; padding: 3px 10px; border-radius: 15px; display: flex; align-items: center; justify-content: center; gap: 5px; width: fit-content; margin: 0 auto; }
        .pulsing-dot { width: 6px; height: 6px; background-color: #16a34a; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.6); } 70% { box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); } 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); } }

        .live-bounce-effect {
          font-weight: 900;
          color: #16a34a;
          text-align: center;
          line-height: 1;
          margin: 4px 0;
          display: inline-block;
          width: 100%;
          animation: liveBounce 0.8s ease-in-out infinite alternate;
        }
        @keyframes liveBounce {
          0% { transform: scale(1); text-shadow: 0 2px 4px rgba(22, 163, 74, 0.2); }
          100% { transform: scale(1.06); text-shadow: 0 8px 16px rgba(22, 163, 74, 0.4); }
        }

        .update-time-indicator-large { text-align: center; font-size: 0.9rem; font-weight: 700; background: #f0fdf4; border: 1px solid #dcfce7; padding: 6px 10px; border-radius: 6px; color: #15803d; }
        .separator { margin: 0 6px; opacity: 0.6; }

        .cards-group { display: flex; flex-direction: column; }
        .result-card-dynamic { border-radius: 8px; padding: 6px 10px; background: linear-gradient(135deg, #ff4d4d 0%, #e60000 100%); color: #fff; }
        .card-title-top { text-align: center; font-weight: 900; font-size: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.4); padding-bottom: 2px; margin-bottom: 3px; }
        .card-sub-grid { display: flex; justify-content: space-between; text-align: center; }
        .sub-col { flex: 1; display: flex; flex-direction: column; }
        .sub-label { font-size: 0.65rem; opacity: 0.9; font-weight: bold; }
        .sub-val { font-weight: 900; font-size: 1rem; }
        .highlight-num { background: rgba(0,0,0,0.25); border-radius: 4px; padding: 2px 0; }

        .winner-promo-banner { color: #fff; font-weight: 900; border-radius: 6px; text-align: center; }
        .phone-subscribe-footer { background: linear-gradient(90deg, #e60000, #990000); color: #fff; border-radius: 6px; padding: 6px; text-align: center; font-weight: 900; font-size: 0.8rem; }

        .side-card { display: flex; flex-direction: column; box-shadow: 0 25px 50px rgba(0,0,0,0.2); box-sizing: border-box; z-index: 10; }
        
        .style-modern { background: rgba(255, 255, 255, 0.55); backdrop-filter: blur(12px); border: 4px solid #ffffff; border-radius: 26px; }
        .style-modern .top-red-banner, .style-modern .date-display-box { background: linear-gradient(135deg, #e60000 0%, #990000 100%); color: #fff; border: 3px solid #ff6666; border-radius: 16px; text-align: center; font-weight: 900; padding: 14px; }
        .style-modern .live-clock-box, .style-modern .horthout-box, .style-modern .data-section-group { background: #fff; border: 3px solid #e60000; border-radius: 16px; }

        .style-classic { background: #ffffff; border: 4px solid #e60000; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .style-classic .top-red-banner, .style-classic .date-display-box { background: #e60000; color: #fff; border-radius: 10px; text-align: center; font-weight: 900; padding: 12px; }
        .style-classic .live-clock-box, .style-classic .horthout-box, .style-classic .data-section-group { background: #fff9f9; border: 2px solid #ffcccc; border-radius: 10px; }

        .top-red-banner { font-weight: 900; padding: 12px; text-align: center; }
        .live-clock-box { font-weight: 900; padding: 12px; text-align: center; }
        .red-label-box { background: linear-gradient(90deg, #e60000, #b30000); color: #fff; font-weight: 900; padding: 10px; border-radius: 12px; text-align: center; }
        .youtube-subscribe-tag { background: linear-gradient(90deg, #ff0000, #800000); color: #fff; font-weight: 900; padding: 10px; border-radius: 10px; text-align: center; }
        .horthout-box { padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; }
        .ht-label { background: #e60000; color: #fff; font-weight: 900; padding: 8px 14px; border-radius: 8px; font-size: 1rem; }
        .ht-val { font-weight: 900; color: #cc0000; flex: 1; text-align: center; }

        .date-display-box { font-weight: 900; padding: 12px; text-align: center; }
        .data-section-group { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
        .purple-badge-wrapper { text-align: center; margin-top: -30px; }
        .purple-circle-badge { background: linear-gradient(135deg, #7c3aed 100%, #5b21b6 0%); color: #fff; font-weight: 900; padding: 6px 18px; border-radius: 20px; border: 2px solid #fff; display: inline-block; }
        .val-display-pro { font-weight: 900; color: #cc0000; text-align: center; letter-spacing: 3px; }

        .marquee-container { position: absolute; bottom: 0; left: 0; width: 100%; padding: 10px 0; overflow: hidden; white-space: nowrap; box-sizing: border-box; z-index: 10; font-weight: bold; }
        .marquee-text { display: inline-block; padding-left: 100%; animation: marquee linear infinite; }
        @keyframes marquee { 0% { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
      `}</style>
    </div>
  );
}
