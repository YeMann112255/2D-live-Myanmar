import Head from 'next/head';
import { useState, useEffect } from 'react';

// JSONBin.io က သင့်ရဲ့ Bin ID နဲ့ Master Key ကို ဒီမှာ ထည့်ပါ
const BIN_ID = '6ac4a0a1ffd5d1605351b310'; 
const MASTER_KEY = '$2a$10$fYB8HrDgeJuhR/ZHy2JVvuz8qs2ShnIW6ZbqQCVATxhB6dJ8NjODa'; 

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

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

  // JSONBin မှ Settings များကို ဝင်ဆွဲရန်
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

  // Admin က Save လိုက်လျှင် JSONBin သို့ တိုက်ရိုက် တင်မည် (တခြားဖုန်းများပါ တစ်ပြိုင်နက် ပြောင်းသွားမည်)
  const handleSaveSettings = async () => {
    const newSettings = {
      phoneWidth, phoneHeight, liveFontSize, resultTextSize, contentGap,
      sideCardWidth, sideFontSize, sideValFontSize, sideCardPadding,
      leftBoxStyle, rightBoxStyle, sessionTitle, sessionDay,
      customDate, pitThee, mainNum, subNum, horThout
    };

    try {
      const response = await fetch
