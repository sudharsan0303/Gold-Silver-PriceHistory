import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  AreaChart, Area, ComposedChart, Line, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer
} from 'recharts';

// ─── HISTORICAL DATA ───────────────────────────────────────
const goldHistory = [
  {date:"07 Feb",open:16276.57,high:16276.69,low:16276.57,close:16276.57},
  {date:"08 Feb",open:16276.57,high:16276.57,low:16276.57,close:16276.57},
  {date:"09 Feb",open:16276.57,high:16592.13,low:16276.57,close:16475.57},
  {date:"10 Feb",open:16484.96,high:16510.81,low:16305.49,close:16318.77},
  {date:"11 Feb",open:16280.77,high:16676.30,low:16280.77,close:16535.53},
  {date:"12 Feb",open:16519.50,high:16519.50,low:15906.50,close:15986.47},
  {date:"13 Feb",open:15986.47,high:16308.14,low:15942.56,close:16304.36},
  {date:"14 Feb",open:16343.29,high:16407.95,low:16343.29,close:16386.50},
  {date:"15 Feb",open:16386.50,high:16386.60,low:16386.50,close:16386.60},
  {date:"16 Feb",open:16225.10,high:16284.95,low:16113.96,close:16194.14},
  {date:"17 Feb",open:16217.24,high:16217.24,low:15854.29,close:15872.68},
  {date:"18 Feb",open:15918.96,high:16279.65,low:15918.96,close:16243.18},
  {date:"19 Feb",open:16243.18,high:16369.23,low:16147.26,close:16181.48},
  {date:"20 Feb",open:16181.48,high:16439.21,low:16175.76,close:16402.95},
  {date:"21 Feb",open:16423.27,high:16545.03,low:16410.91,close:16523.77},
  {date:"22 Feb",open:16523.77,high:16523.77,low:16523.77,close:16523.77},
  {date:"23 Feb",open:16523.77,high:16884.47,low:16452.99,close:16884.47},
  {date:"24 Feb",open:16844.49,high:16865.49,low:16563.91,close:16671.99},
  {date:"25 Feb",open:16682.18,high:16806.66,low:16663.32,close:16770.87},
  {date:"26 Feb",open:16773.93,high:16784.44,low:16554.64,close:16652.31},
  {date:"27 Feb",open:16678.51,high:16909.12,low:16678.51,close:16906.56},
  {date:"28 Feb",open:16895.87,high:17919.75,low:16895.87,close:17919.54},
  {date:"01 Mar",open:17919.54,high:17919.75,low:17919.54,close:17919.75},
  {date:"02 Mar",open:17919.75,high:18070.76,low:17346.39,close:17346.39},
  {date:"03 Mar",open:17369.92,high:17657.19,low:16676.70,close:16851.68},
  {date:"04 Mar",open:16857.71,high:17140.05,low:16764.62,close:16938.42},
  {date:"05 Mar",open:16948.66,high:17071.93,low:16678.95,close:16705.20},
  {date:"06 Mar",open:16723.06,high:16947.27,low:16646.28,close:16890.30},
  {date:"07 Mar",open:16895.91,high:16961.67,low:16877.03,close:16933.89},
  {date:"08 Mar",open:16933.80,high:16936.56,low:16933.80,close:16936.56},
  {date:"09 Mar",open:16936.34,high:16936.56,low:16689.37,close:16717.55},
];

const silverHistory = [
  {date:"07 Feb",open:275.72,high:275.72,low:275.72,close:275.72},
  {date:"08 Feb",open:275.72,high:275.72,low:275.72,close:275.72},
  {date:"09 Feb",open:275.72,high:289.25,low:273.19,close:283.67},
  {date:"10 Feb",open:284.08,high:284.08,low:270.23,close:271.80},
  {date:"11 Feb",open:271.72,high:289.29,low:271.72,close:282.41},
  {date:"12 Feb",open:283.51,high:283.51,low:262.69,close:264.63},
  {date:"13 Feb",open:264.68,high:268.83,low:260.77,close:265.78},
  {date:"14 Feb",open:265.80,high:267.51,low:265.32,close:267.51},
  {date:"15 Feb",open:267.51,high:267.51,low:267.51,close:267.51},
  {date:"16 Feb",open:258.37,high:260.65,low:257.25,close:259.84},
  {date:"17 Feb",open:260.20,high:260.20,low:246.43,close:249.21},
  {date:"18 Feb",open:250.47,high:263.78,low:250.47,close:262.78},
  {date:"19 Feb",open:261.81,high:267.17,low:258.66,close:259.79},
  {date:"20 Feb",open:259.94,high:272.58,low:259.94,close:272.34},
  {date:"21 Feb",open:271.63,high:273.70,low:271.63,close:273.70},
  {date:"22 Feb",open:273.70,high:273.70,low:273.70,close:273.70},
  {date:"23 Feb",open:273.70,high:294.72,low:271.64,close:285.41},
  {date:"24 Feb",open:284.93,high:286.75,low:273.63,close:281.81},
  {date:"25 Feb",open:280.28,high:289.08,low:280.28,close:288.44},
  {date:"26 Feb",open:288.59,high:288.59,low:276.48,close:279.67},
  {date:"27 Feb",open:280.20,high:295.98,low:280.20,close:295.33},
  {date:"28 Feb",open:294.39,high:319.10,low:294.39,close:319.10},
  {date:"01 Mar",open:319.10,high:319.10,low:319.10,close:319.10},
  {date:"02 Mar",open:319.10,high:337.89,low:294.92,close:294.92},
  {date:"03 Mar",open:297.98,high:300.04,low:277.13,close:284.18},
  {date:"04 Mar",open:284.96,high:294.62,low:283.41,close:283.41},
  {date:"05 Mar",open:284.28,high:289.28,low:278.79,close:280.29},
  {date:"06 Mar",open:280.35,high:288.79,low:280.29,close:287.12},
  {date:"07 Mar",open:287.25,high:289.02,low:286.96,close:289.02},
  {date:"08 Mar",open:289.02,high:289.02,low:289.02,close:289.02},
  {date:"09 Mar",open:289.02,high:289.02,low:280.03,close:283.79},
];

// ─── HELPERS ────────────────────────────────────────────────
const fmt = (n, dec = 2) =>
  n.toLocaleString('en-IN', { maximumFractionDigits: dec, minimumFractionDigits: dec });

const toBuyingPrice = (usdOz, rate) => {
  const base = (usdOz * rate) / 31.1035;
  const withDuty = base * 1.15;
  return withDuty * 1.02;
};

const BULL = '#a8edea';
const BEAR = '#ff6b9d';

// ─── MAIN COMPONENT ────────────────────────────────────────
export default function AuraMetals() {
  const [activeMetal, setActiveMetal] = useState('gold');
  const [activeTab, setActiveTab] = useState('trend');
  const [goldSpotUsd, setGoldSpotUsd] = useState(null);
  const [silverSpotUsd, setSilverSpotUsd] = useState(null);
  const [usdInr, setUsdInr] = useState(86.5);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [animKey, setAnimKey] = useState(0);
  const countdownRef = useRef(null);

  // ─── FETCH ───────────────────────
  const fetchPrices = useCallback(async () => {
    setFetchStatus('loading');
    let gotMetals = false;
    let gotFx = false;

    // Fetch metals spot price — try primary, then Swissquote backup
    try {
      const res = await fetch('https://api.metals.live/v1/spot');
      const data = await res.json();
      if (data[0]?.gold) { setGoldSpotUsd(data[0].gold); gotMetals = true; }
      if (data[0]?.silver) { setSilverSpotUsd(data[0].silver); gotMetals = true; }
    } catch {
      // Primary failed — try Swissquote (free, no key required)
      try {
        const [goldRes, silverRes] = await Promise.all([
          fetch('https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD'),
          fetch('https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAG/USD'),
        ]);
        const goldData = await goldRes.json();
        const silverData = await silverRes.json();
        const gp = goldData[0]?.spreadProfilePrices?.[0];
        const sp = silverData[0]?.spreadProfilePrices?.[0];
        if (gp) { setGoldSpotUsd((gp.bid + gp.ask) / 2); gotMetals = true; }
        if (sp) { setSilverSpotUsd((sp.bid + sp.ask) / 2); gotMetals = true; }
      } catch {
        // Both failed — keep existing values or fallback
      }
    }

    // Fetch USD/INR rate
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR');
      const data = await res.json();
      if (data?.rates?.INR) { setUsdInr(data.rates.INR); gotFx = true; }
    } catch {
      // Keep existing rate or fallback 86.5
    }

    if (gotMetals || gotFx) {
      setLastUpdated(new Date());
      setFetchStatus('live');
      setAnimKey(k => k + 1);
    } else {
      setFetchStatus(prev => prev === 'live' ? 'delayed' : 'error');
    }
  }, []);

  useEffect(() => { fetchPrices(); }, [fetchPrices]);

  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { fetchPrices(); return 60; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(countdownRef.current);
  }, [fetchPrices]);

  // ─── COMPUTED VALUES ─────────────
  const goldBuyingPrice = useMemo(() =>
    goldSpotUsd ? toBuyingPrice(goldSpotUsd, usdInr) : 16717.55,
    [goldSpotUsd, usdInr]);

  const silverBuyingPrice = useMemo(() =>
    silverSpotUsd ? toBuyingPrice(silverSpotUsd, usdInr) : 283.79,
    [silverSpotUsd, usdInr]);

  const isGold = activeMetal === 'gold';
  const metalColor = isGold ? '#f5c842' : '#c8c8ff';
  const metalColorAlt = isGold ? '#ffaa00' : '#a8edea';
  const metalEmoji = isGold ? '🥇' : '🥈';
  const metalLabel = isGold ? 'GOLD 24K' : 'SILVER 999';
  const bigUnit = isGold ? '/10g' : '/kg';
  const bigMult = isGold ? 10 : 1000;
  const currentLivePrice = isGold ? goldBuyingPrice : silverBuyingPrice;
  const baseHistory = isGold ? goldHistory : silverHistory;

  // Build chart data: history + today's live point
  const chartData = useMemo(() => {
    const last = baseHistory[baseHistory.length - 1];
    const todayEntry = {
      date: 'Today',
      open: last.close,
      high: Math.max(currentLivePrice, last.close),
      low: Math.min(currentLivePrice, last.close),
      close: currentLivePrice,
    };
    return [...baseHistory, todayEntry];
  }, [baseHistory, currentLivePrice]);

  const yesterdayClose = baseHistory[baseHistory.length - 1].close;
  const changePercent = ((currentLivePrice - yesterdayClose) / yesterdayClose * 100).toFixed(2);
  const isUp = parseFloat(changePercent) >= 0;

  // ─── STATS ───────────────────────
  const stats = useMemo(() => {
    const closes = chartData.map(d => d.close);
    const highs = chartData.map(d => d.high);
    const lows = chartData.map(d => d.low);
    const firstOpen = chartData[0].open;
    const latestClose = closes[closes.length - 1];
    const periodReturn = ((latestClose - firstOpen) / firstOpen * 100).toFixed(2);
    const maxHigh = Math.max(...highs);
    const minLow = Math.min(...lows);
    const maxHighDate = chartData[highs.indexOf(maxHigh)].date;
    const minLowDate = chartData[lows.indexOf(minLow)].date;
    const bullDays = chartData.filter((d, i) => i > 0 && d.close >= chartData[i - 1].close).length;
    const totalDays = chartData.length - 1;
    const avgClose = closes.reduce((a, b) => a + b, 0) / closes.length;
    return { periodReturn, maxHigh, minLow, maxHighDate, minLowDate, bullDays, totalDays, avgClose };
  }, [chartData]);

  // ─── KEY EVENTS ──────────────────
  const keyEvents = useMemo(() => {
    let biggestSurge = 0, biggestSurgeDate = '';
    let biggestDrop = 0, biggestDropDate = '';
    for (let i = 1; i < chartData.length; i++) {
      const pct = ((chartData[i].close - chartData[i - 1].close) / chartData[i - 1].close) * 100;
      if (pct > biggestSurge) { biggestSurge = pct; biggestSurgeDate = chartData[i].date; }
      if (pct < biggestDrop) { biggestDrop = pct; biggestDropDate = chartData[i].date; }
    }
    return [
      { icon: '🏆', label: 'ALL-TIME HIGH', value: `₹${fmt(stats.maxHigh)}/g`, sub: stats.maxHighDate, color: BULL },
      { icon: '📉', label: 'PERIOD LOW', value: `₹${fmt(stats.minLow)}/g`, sub: stats.minLowDate, color: BEAR },
      { icon: '⚡', label: 'BIGGEST SURGE', value: `+${biggestSurge.toFixed(2)}%`, sub: biggestSurgeDate, color: BULL },
      { icon: '💥', label: 'BIGGEST DROP', value: `${biggestDrop.toFixed(2)}%`, sub: biggestDropDate, color: BEAR },
      { icon: '📅', label: 'DAYS TRACKED', value: `${chartData.length} days`, sub: '07 Feb → Today', color: metalColor },
    ];
  }, [chartData, stats, metalColor]);

  // ─── DERIVED CHART DATA ──────────
  const volatilityData = useMemo(() =>
    chartData.map(d => ({ date: d.date, range: +(d.high - d.low).toFixed(2) })),
    [chartData]);

  const changeData = useMemo(() =>
    chartData.map((d, i) => {
      if (i === 0) return { date: d.date, change: 0 };
      return { date: d.date, change: +((d.close - chartData[i - 1].close) / chartData[i - 1].close * 100).toFixed(2) };
    }),
    [chartData]);

  // ─── MILESTONES ──────────────────
  const milestones = isGold ? [
    { date: '07 Feb', price: '₹16,276/g', label: 'START', color: '#666' },
    { date: '17 Feb', price: '₹15,854/g', label: 'PERIOD LOW', color: BEAR },
    { date: '23 Feb', price: '₹16,884/g', label: 'BREAKOUT', color: '#ffcc44' },
    { date: '28 Feb', price: '₹17,919/g', label: 'SURGE', color: BULL },
    { date: '02 Mar', price: '₹18,070/g', label: '🏆 ATH', color: BULL },
    { date: 'Today', price: `₹${fmt(currentLivePrice, 0)}/g`, label: 'TODAY', color: metalColor },
  ] : [
    { date: '07 Feb', price: '₹275.72/g', label: 'START', color: '#666' },
    { date: '17 Feb', price: '₹246.43/g', label: 'PERIOD LOW', color: BEAR },
    { date: '23 Feb', price: '₹285.41/g', label: 'BREAKOUT', color: '#ffcc44' },
    { date: '28 Feb', price: '₹319.10/g', label: 'SURGE', color: BULL },
    { date: '02 Mar', price: '₹337.89/g', label: '🏆 ATH', color: BULL },
    { date: 'Today', price: `₹${fmt(currentLivePrice)}/g`, label: 'TODAY', color: metalColor },
  ];

  // ─── STATUS BADGE ────────────────
  const statusBadge = (() => {
    if (fetchStatus === 'live') return { text: 'LIVE', color: '#00ff88', dot: true };
    if (fetchStatus === 'delayed') return { text: 'DELAYED', color: '#ffcc00', dot: false };
    if (fetchStatus === 'error') return { text: 'ERROR', color: '#ff4444', dot: false };
    return { text: 'LOADING', color: '#888', dot: false };
  })();

  const lastUpdatedStr = lastUpdated
    ? lastUpdated.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
    : '—';

  // Gold change for ticker
  const goldYestClose = goldHistory[goldHistory.length - 1].close;
  const goldChange = ((goldBuyingPrice - goldYestClose) / goldYestClose * 100).toFixed(2);
  const silverYestClose = silverHistory[silverHistory.length - 1].close;
  const silverChange = ((silverBuyingPrice - silverYestClose) / silverYestClose * 100).toFixed(2);

  // ─── CHART TABS ──────────────────
  const tabs = [
    { id: 'trend', icon: '📈', label: 'TREND' },
    { id: 'ohlc', icon: '🕯', label: 'OHLC' },
    { id: 'volatility', icon: '⚡', label: 'VOLATILITY' },
    { id: 'change', icon: '%', label: 'CHANGE' },
    { id: 'table', icon: '📋', label: 'TABLE' },
  ];

  // ─── TOOLTIP STYLE ───────────────
  const tooltipStyle = {
    backgroundColor: '#08090fee',
    border: `1px solid ${metalColor}55`,
    borderRadius: '8px',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    color: '#ddd',
    padding: '8px 12px',
  };

  // ─── Y-AXIS DOMAIN ───────────────
  const yDomain = useMemo(() => {
    const allVals = chartData.flatMap(d => [d.high, d.low]);
    const mn = Math.min(...allVals);
    const mx = Math.max(...allVals);
    return [mn * 0.98, mx * 1.02];
  }, [chartData]);

  const firstClose = chartData[0].close;

  // ─── CUSTOM TOOLTIP ──────────────
  const TrendTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div style={tooltipStyle}>
        <div style={{ color: metalColor, fontWeight: 700, marginBottom: 4 }}>{d.date}</div>
        <div>Price: ₹{fmt(d.close)}/g</div>
        <div style={{ color: '#888', fontSize: 10 }}>₹{fmt(d.close * bigMult)}{bigUnit}</div>
      </div>
    );
  };

  const OHLCTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div style={tooltipStyle}>
        <div style={{ color: metalColor, fontWeight: 700, marginBottom: 4 }}>{d.date}</div>
        <div>Open: ₹{fmt(d.open)}</div>
        <div>High: ₹{fmt(d.high)}</div>
        <div>Low: ₹{fmt(d.low)}</div>
        <div>Close: ₹{fmt(d.close)}</div>
      </div>
    );
  };

  const VolTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div style={tooltipStyle}>
        <div style={{ color: metalColor, fontWeight: 700, marginBottom: 4 }}>{d.date}</div>
        <div>Range: ₹{fmt(d.range)}</div>
      </div>
    );
  };

  const ChangeTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    const up = d.change >= 0;
    return (
      <div style={{ ...tooltipStyle, borderColor: up ? BULL : BEAR }}>
        <div style={{ color: metalColor, fontWeight: 700, marginBottom: 4 }}>{d.date}</div>
        <div style={{ color: up ? BULL : BEAR }}>{up ? '▲' : '▼'} {d.change}%</div>
      </div>
    );
  };

  // ─── RENDER ──────────────────────
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      background: 'linear-gradient(160deg, #08090f, #0c0d18, #090a14)',
      minHeight: '100vh',
      color: '#ddd',
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes priceFlash {
          0% { border-color: ${metalColor}; box-shadow: 0 0 20px ${metalColor}44; }
          100% { border-color: rgba(200,200,255,0.08); box-shadow: none; }
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .aura-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(200,200,255,0.08);
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .aura-card:hover {
          border-color: ${metalColor}30;
          box-shadow: 0 0 15px ${metalColor}20;
        }
        .metal-transition {
          animation: fadeInUp 0.25s ease;
        }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${metalColor}30; border-radius: 4px; }
        .recharts-cartesian-grid-horizontal line { stroke: rgba(255,255,255,0.03); }
        .recharts-cartesian-grid-vertical line { stroke: transparent; }
      `}</style>

      {/* ═══ HEADER ═══ */}
      <header style={{ padding: '20px 24px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '2px', background: `linear-gradient(135deg, ${metalColor}, ${metalColorAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🥇🥈 AURA METALS
        </div>
        <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888', marginTop: 4 }}>
          India Gold & Silver Buying Price Tracker
        </div>

        {/* Ticker */}
        <div style={{ overflow: 'hidden', marginTop: 12, borderTop: '1px solid rgba(200,200,255,0.06)', borderBottom: '1px solid rgba(200,200,255,0.06)', padding: '6px 0' }}>
          <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: 'tickerScroll 30s linear infinite' }}>
            {[0, 1].map(i => (
              <span key={i} style={{ fontSize: '10px', letterSpacing: '1px', color: '#888' }}>
                &nbsp;&nbsp;🥇 GOLD 24K&nbsp;&nbsp;₹{fmt(goldBuyingPrice)}/g&nbsp;&nbsp;
                <span style={{ color: parseFloat(goldChange) >= 0 ? BULL : BEAR }}>{parseFloat(goldChange) >= 0 ? '▲' : '▼'}{goldChange}%</span>
                &nbsp;&nbsp;·&nbsp;&nbsp;🥈 SILVER 999&nbsp;&nbsp;₹{fmt(silverBuyingPrice)}/g&nbsp;&nbsp;
                <span style={{ color: parseFloat(silverChange) >= 0 ? BULL : BEAR }}>{parseFloat(silverChange) >= 0 ? '▲' : '▼'}{silverChange}%</span>
                &nbsp;&nbsp;·&nbsp;&nbsp;🟢 LIVE&nbsp;&nbsp;·&nbsp;&nbsp;Updated: {lastUpdatedStr}&nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px 16px 40px' }}>

        {/* ═══ METAL TOGGLE ═══ */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
          {['gold', 'silver'].map(m => {
            const active = activeMetal === m;
            const c = m === 'gold' ? '#f5c842' : '#c8c8ff';
            return (
              <button
                key={m}
                onClick={() => setActiveMetal(m)}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  padding: '10px 28px',
                  borderRadius: 999,
                  border: `1px solid ${active ? c : 'rgba(200,200,255,0.1)'}`,
                  background: active ? c : 'transparent',
                  color: active ? '#08090f' : '#888',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {m === 'gold' ? '🥇 GOLD 24K' : '🥈 SILVER 999'}
              </button>
            );
          })}
        </div>

        <div key={activeMetal} className="metal-transition">

          {/* ═══ LIVE PRICE CARD ═══ */}
          <div
            key={`price-${animKey}`}
            className="aura-card"
            style={{
              padding: '24px',
              marginBottom: 16,
              borderColor: `${metalColor}30`,
              animation: animKey > 0 ? 'priceFlash 1.5s ease-out' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', color: metalColor }}>
                {metalEmoji} {metalLabel} BUYING PRICE
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '10px', fontWeight: 600, letterSpacing: '1px' }}>
                {statusBadge.dot && (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusBadge.color, display: 'inline-block', animation: 'livePulse 1.5s ease infinite' }} />
                )}
                {!statusBadge.dot && (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusBadge.color, display: 'inline-block' }} />
                )}
                <span style={{ color: statusBadge.color }}>{statusBadge.text}</span>
              </span>
            </div>

            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              ₹ {fmt(currentLivePrice)}
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#888', marginLeft: 8 }}>/gram</span>
            </div>

            <div style={{ display: 'flex', gap: 24, fontSize: '13px', color: '#aaa', marginBottom: 12, flexWrap: 'wrap' }}>
              <span>₹ {fmt(currentLivePrice * bigMult)} {bigUnit}</span>
              <span>₹ {fmt(currentLivePrice * (isGold ? 100 : 10))} {isGold ? '/100g' : '/10g'}</span>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 600, color: isUp ? BULL : BEAR, marginBottom: 16 }}>
              {isUp ? '▲' : '▼'} {isUp ? '+' : ''}{changePercent}% from yesterday
            </div>

            <div style={{ fontSize: '10px', color: '#666', marginBottom: 8 }}>
              Last updated: {lastUpdatedStr}
            </div>

            {/* Countdown bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  width: `${(countdown / 60) * 100}%`,
                  height: '100%',
                  background: `${metalColor}80`,
                  borderRadius: 2,
                  transition: 'width 1s linear',
                }} />
              </div>
              <span style={{ fontSize: '10px', color: '#666', minWidth: 90 }}>Next refresh: {countdown}s</span>
              <button
                onClick={() => { fetchPrices(); setCountdown(60); }}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px',
                  padding: '4px 10px',
                  background: 'transparent',
                  border: `1px solid ${metalColor}40`,
                  borderRadius: 6,
                  color: metalColor,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                🔄 Refresh Now
              </button>
            </div>

            <div style={{ fontSize: '9px', color: '#555', marginTop: 8 }}>
              ⚠ Indicative buying price. Actual price may vary by jeweller/platform.
            </div>
          </div>

          {/* ═══ STATS ROW ═══ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, marginBottom: 16 }}>
            {[
              {
                label: 'PERIOD RETURN',
                value: `${parseFloat(stats.periodReturn) >= 0 ? '+' : ''}${stats.periodReturn}%`,
                sub: '07 Feb → Today',
                color: parseFloat(stats.periodReturn) >= 0 ? BULL : BEAR,
              },
              { label: 'PERIOD HIGH', value: `₹${fmt(stats.maxHigh)}`, sub: stats.maxHighDate, color: BULL },
              { label: 'PERIOD LOW', value: `₹${fmt(stats.minLow)}`, sub: stats.minLowDate, color: BEAR },
              {
                label: 'BULL SESSIONS',
                value: `${stats.bullDays}/${stats.totalDays}`,
                sub: `${((stats.bullDays / stats.totalDays) * 100).toFixed(0)}% positive`,
                color: metalColor,
              },
              {
                label: 'AVG BUYING PRICE',
                value: `₹${fmt(stats.avgClose)}`,
                sub: `₹${fmt(stats.avgClose * bigMult)}${bigUnit}`,
                color: '#aaa',
              },
            ].map((s, i) => (
              <div key={i} className="aura-card" style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#666', marginBottom: 6 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: s.color, marginBottom: 4 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '9px', color: '#555' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ═══ KEY EVENTS ═══ */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 16 }}>
            {keyEvents.map((e, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${metalColor}25`,
                borderRadius: 8,
                padding: '9px 13px',
                minWidth: 'fit-content',
                display: 'inline-flex',
                flexDirection: 'column',
                gap: 2,
                flexShrink: 0,
              }}>
                <div style={{ fontSize: '9px', letterSpacing: '1px', color: '#666', textTransform: 'uppercase' }}>
                  {e.icon} {e.label}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: e.color }}>{e.value}</div>
                <div style={{ fontSize: '9px', color: '#555' }}>{e.sub}</div>
              </div>
            ))}
          </div>

          {/* ═══ CHART PANEL ═══ */}
          <div className="aura-card" style={{ padding: '16px', marginBottom: 16 }}>
            {/* Chart Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
              {tabs.map(t => {
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      padding: '7px 14px',
                      borderRadius: 999,
                      border: `1px solid ${active ? metalColor : 'rgba(200,200,255,0.08)'}`,
                      background: active ? metalColor : 'transparent',
                      color: active ? '#08090f' : '#888',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {t.icon} {t.label}
                  </button>
                );
              })}
            </div>

            {/* ── TREND CHART ── */}
            {activeTab === 'trend' && (
              <ResponsiveContainer width="100%" height={360}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={metalColor} stopOpacity={0.18} />
                      <stop offset="100%" stopColor={metalColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#444' }} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={yDomain}
                    tick={{ fontSize: 9, fill: '#444' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `₹${fmt(v, 0)}`}
                    width={70}
                  />
                  <Tooltip content={<TrendTooltip />} />
                  <ReferenceLine y={firstClose} stroke="#666" strokeDasharray="4 4" label={{ value: 'Start', fill: '#666', fontSize: 9, position: 'right' }} />
                  <ReferenceLine y={stats.maxHigh} stroke={BULL} strokeDasharray="4 4" label={{ value: 'ATH', fill: BULL, fontSize: 9, position: 'right' }} />
                  <Area type="monotone" dataKey="close" stroke={metalColor} strokeWidth={2} fill="url(#trendFill)" dot={false} activeDot={{ r: 4, fill: metalColor }} />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {/* ── OHLC CHART ── */}
            {activeTab === 'ohlc' && (
              <ResponsiveContainer width="100%" height={360}>
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#444' }} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={yDomain}
                    tick={{ fontSize: 9, fill: '#444' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `₹${fmt(v, 0)}`}
                    width={70}
                  />
                  <Tooltip content={<OHLCTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: '#888' }} />
                  <Line type="monotone" dataKey="high" stroke={BULL} dot={false} strokeWidth={1.5} name="High" />
                  <Line type="monotone" dataKey="low" stroke={BEAR} dot={false} strokeWidth={1.5} name="Low" />
                  <Line type="monotone" dataKey="close" stroke={metalColor} dot={false} strokeWidth={2} name="Close" />
                  <Line type="monotone" dataKey="open" stroke="#888" strokeDasharray="4 4" dot={false} strokeWidth={1} name="Open" />
                </ComposedChart>
              </ResponsiveContainer>
            )}

            {/* ── VOLATILITY CHART ── */}
            {activeTab === 'volatility' && (
              <ResponsiveContainer width="100%" height={360}>
                <ComposedChart data={volatilityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#444' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 9, fill: '#444' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `₹${fmt(v, 0)}`}
                    width={60}
                  />
                  <Tooltip content={<VolTooltip />} />
                  <Bar dataKey="range" fill={`${metalColor}80`} radius={[3, 3, 0, 0]} name="Range" />
                  <Line type="monotone" dataKey="range" stroke={metalColorAlt} dot={false} strokeWidth={1.5} name="Trend" />
                </ComposedChart>
              </ResponsiveContainer>
            )}

            {/* ── % CHANGE CHART ── */}
            {activeTab === 'change' && (
              <ResponsiveContainer width="100%" height={360}>
                <ComposedChart data={changeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#444' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 9, fill: '#444' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `${v}%`}
                    width={50}
                  />
                  <Tooltip content={<ChangeTooltip />} />
                  <ReferenceLine y={0} stroke="#444" />
                  <Bar
                    dataKey="change"
                    radius={[3, 3, 0, 0]}
                    name="Change %"
                  >
                    {changeData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.change >= 0 ? BULL : BEAR} />
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            )}

            {/* ── TABLE ── */}
            {activeTab === 'table' && (
              <div style={{ overflowX: 'auto', maxHeight: 400 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(200,200,255,0.08)' }}>
                      {['DATE', 'BUYING PRICE', 'HIGH', 'LOW', 'CHANGE %', 'RANGE', isGold ? 'PER 10g' : 'PER Kg'].map(h => (
                        <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', color: '#666', textTransform: 'uppercase' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...chartData].reverse().map((d, i) => {
                      const idx = chartData.length - 1 - i;
                      const prevClose = idx > 0 ? chartData[idx - 1].close : d.open;
                      const chg = ((d.close - prevClose) / prevClose * 100).toFixed(2);
                      const up = parseFloat(chg) >= 0;
                      return (
                        <tr
                          key={i}
                          style={{
                            borderBottom: '1px solid rgba(200,200,255,0.04)',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = `${metalColor}08`}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '7px 10px', color: metalColor, fontWeight: 600 }}>{d.date}</td>
                          <td style={{ padding: '7px 10px', fontWeight: 700 }}>₹{fmt(d.close)}</td>
                          <td style={{ padding: '7px 10px', color: BULL }}>₹{fmt(d.high)}</td>
                          <td style={{ padding: '7px 10px', color: BEAR }}>₹{fmt(d.low)}</td>
                          <td style={{ padding: '7px 10px', color: up ? BULL : BEAR, fontWeight: 600 }}>
                            {up ? '▲' : '▼'} {chg}%
                          </td>
                          <td style={{ padding: '7px 10px', color: '#888' }}>₹{fmt(d.high - d.low)}</td>
                          <td style={{ padding: '7px 10px', color: '#aaa' }}>₹{fmt(d.close * bigMult)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ═══ MILESTONES TIMELINE ═══ */}
          <div className="aura-card" style={{ padding: '20px 16px', marginBottom: 16, overflowX: 'auto' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>
              PRICE MILESTONES
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', minWidth: 'fit-content' }}>
              {/* Connecting line */}
              <div style={{
                position: 'absolute',
                top: 6,
                left: 12,
                right: 12,
                height: 1,
                background: 'rgba(200,200,255,0.08)',
              }} />
              {milestones.map((m, i) => (
                <div key={i} style={{ flex: '1 0 120px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', textAlign: 'center' }}>
                  <div style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: m.color,
                    boxShadow: `0 0 8px ${m.color}`,
                    marginBottom: 8,
                    zIndex: 1,
                  }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, color: m.color, marginBottom: 2 }}>{m.price}</div>
                  <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '1px', color: '#888', textTransform: 'uppercase', marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: '9px', color: '#555' }}>{m.date}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ textAlign: 'center', padding: '24px 16px 32px', borderTop: '1px solid rgba(200,200,255,0.06)' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: metalColor, marginBottom: 6 }}>
          AURA METALS TRACKER
        </div>
        <div style={{ fontSize: '10px', color: '#666', lineHeight: 1.8 }}>
          India Gold & Silver Buying Price · Live + Historical<br />
          Data: Aura Digital Metals Platform<br />
          ⚠ Prices are indicative. Actual buying price may vary by jeweller, city, and platform. Not financial advice.<br />
          © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
