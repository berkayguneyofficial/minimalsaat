import React, { useState } from 'react';
import Clock from './components/Clock';
import ControlPanel from './components/ControlPanel';
import { ClockConfig, THEMES, MarkerStyle, HandStyle, Language, BackgroundStyle } from './types';
import { Settings2, Github, Maximize2 } from 'lucide-react';
import { translations } from './locales';

const App: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Default Configuration
  const [config, setConfig] = useState<ClockConfig>({
    showSeconds: true,
    showDate: true,
    smoothSeconds: true,
    markerStyle: MarkerStyle.All,
    handStyle: HandStyle.Tapered,
    theme: THEMES[0],
    language: Language.TR, // Defaulting to TR as requested
    backgroundStyle: BackgroundStyle.Mesh, // Modern default
    customBackgroundColor: null,
  });

  const t = translations[config.language];

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Background Logic
  const bgColor = config.customBackgroundColor || config.theme.backgroundColor;
  
  const getBackgroundStyle = () => {
    switch (config.backgroundStyle) {
      case BackgroundStyle.Gradient:
        return {
          backgroundImage: `linear-gradient(135deg, ${bgColor} 0%, ${adjustBrightness(bgColor, -20)} 100%)`
        };
      case BackgroundStyle.Mesh:
        return {
          backgroundColor: bgColor,
          backgroundImage: `
            radial-gradient(at 0% 0%, hsla(253,16%,7%,0.2) 0, transparent 50%), 
            radial-gradient(at 50% 0%, hsla(225,39%,30%,0.2) 0, transparent 50%), 
            radial-gradient(at 100% 0%, hsla(339,49%,30%,0.2) 0, transparent 50%)
          `
        };
      case BackgroundStyle.Grain:
         // Using a simple svg data uri for grain noise
         const noise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;
         return {
            backgroundColor: bgColor,
            backgroundImage: noise
         };
      case BackgroundStyle.Solid:
      default:
        return { backgroundColor: bgColor };
    }
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ease-in-out"
      style={{ 
        ...getBackgroundStyle(),
        color: config.theme.textColor 
      }}
    >
      {/* Background Ambience / Mesh Overlay specifically for Mesh mode to add depth */}
      {config.backgroundStyle === BackgroundStyle.Mesh && (
         <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
      )}

      {/* Main Clock Area */}
      <main className="z-10 w-full max-w-2xl flex flex-col items-center">
        <Clock config={config} />
        
        <div className="mt-8 text-center opacity-60 font-light tracking-widest text-sm uppercase">
            {config.theme.name}
        </div>
      </main>

      {/* Floating Controls Button */}
      {!isPanelOpen && (
        <div className="absolute top-4 right-4 z-40 flex gap-2">
           <button 
            onClick={toggleFullScreen}
            className="p-3 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-current backdrop-blur-sm shadow-lg transition-all border border-white/5"
            title="Toggle Fullscreen"
          >
            <Maximize2 size={20} />
          </button>
          <button 
            onClick={() => setIsPanelOpen(true)}
            className="p-3 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-current backdrop-blur-sm shadow-lg transition-all border border-white/5"
            title={t.customize}
          >
            <Settings2 size={20} />
          </button>
        </div>
      )}

      {/* Settings Panel */}
      <ControlPanel 
        config={config} 
        setConfig={setConfig} 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
      
      {/* Footer / Branding */}
      <footer className="absolute bottom-4 text-xs opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2">
        <span>{t.madeWith}</span>
        <a href="#" className="hover:text-blue-400"><Github size={12} /></a>
      </footer>
    </div>
  );
};

// Helper to darken/lighten hex color for gradients
function adjustBrightness(col: string, amt: number) {
    let usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    const num = parseInt(col,16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    let g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

export default App;