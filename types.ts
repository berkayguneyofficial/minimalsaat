export enum MarkerStyle {
  None = 'none',
  Quarters = 'quarters',
  All = 'all',
  Minimal = 'minimal', // Just lines
  Dots = 'dots'
}

export enum HandStyle {
  Standard = 'standard',
  Minimal = 'minimal', // Thin uniform lines
  Tapered = 'tapered',
  Round = 'round'
}

export enum Language {
  EN = 'en-US',
  TR = 'tr-TR'
}

export enum BackgroundStyle {
  Solid = 'solid',
  Gradient = 'gradient',
  Mesh = 'mesh',
  Grain = 'grain'
}

export interface ClockTheme {
  name: string;
  backgroundColor: string;
  clockFaceColor: string;
  markerColor: string;
  hourHandColor: string;
  minuteHandColor: string;
  secondHandColor: string;
  textColor: string;
}

export interface ClockConfig {
  showSeconds: boolean;
  showDate: boolean;
  smoothSeconds: boolean;
  markerStyle: MarkerStyle;
  handStyle: HandStyle;
  theme: ClockTheme;
  language: Language;
  backgroundStyle: BackgroundStyle;
  customBackgroundColor: string | null; // Allow overriding theme background
}

// Predefined Themes
export const THEMES: ClockTheme[] = [
  {
    name: 'Midnight Modern',
    backgroundColor: '#0f172a', // slate-900
    clockFaceColor: '#1e293b', // slate-800
    markerColor: '#94a3b8', // slate-400
    hourHandColor: '#e2e8f0', // slate-200
    minuteHandColor: '#cbd5e1', // slate-300
    secondHandColor: '#38bdf8', // sky-400
    textColor: '#f1f5f9',
  },
  {
    name: 'Swiss Clean',
    backgroundColor: '#f1f5f9', // slate-100
    clockFaceColor: '#ffffff', // white
    markerColor: '#0f172a', // slate-900
    hourHandColor: '#000000', // black
    minuteHandColor: '#475569', // slate-600
    secondHandColor: '#ef4444', // red-500
    textColor: '#0f172a',
  },
  {
    name: 'Cyber Dim',
    backgroundColor: '#050505',
    clockFaceColor: '#111111',
    markerColor: '#333333',
    hourHandColor: '#00ff41',
    minuteHandColor: '#00ff41',
    secondHandColor: '#ff003c',
    textColor: '#00ff41',
  },
  {
    name: 'Soft Pastel',
    backgroundColor: '#fff1f2', // rose-50
    clockFaceColor: '#fff',
    markerColor: '#fda4af', // rose-300
    hourHandColor: '#881337', // rose-900
    minuteHandColor: '#be123c', // rose-700
    secondHandColor: '#f43f5e', // rose-500
    textColor: '#881337',
  },
  {
    name: 'Deep Forest',
    backgroundColor: '#022c22', 
    clockFaceColor: '#064e3b', 
    markerColor: '#34d399', 
    hourHandColor: '#d1fae5', 
    minuteHandColor: '#6ee7b7', 
    secondHandColor: '#fbbf24', 
    textColor: '#ecfdf5',
  }
];