import React from 'react';
import { ClockConfig, THEMES, MarkerStyle, HandStyle, Language, BackgroundStyle } from '../types';
import { Palette, Clock as ClockIcon, Calendar, Activity, X, Globe, Layers, Droplet } from 'lucide-react';
import { translations } from '../locales';

interface ControlPanelProps {
  config: ClockConfig;
  setConfig: React.Dispatch<React.SetStateAction<ClockConfig>>;
  isOpen: boolean;
  onClose: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ config, setConfig, isOpen, onClose }) => {
  if (!isOpen) return null;

  const t = translations[config.language];

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, customBackgroundColor: e.target.value });
  };

  const clearCustomColor = () => {
     setConfig({ ...config, customBackgroundColor: null });
  };

  return (
    // Changed bg-white/10 to bg-slate-950/80 (dark glass) to ensure visibility on light backgrounds
    <div className="absolute top-4 right-4 z-50 w-80 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-sm overflow-hidden text-slate-100 animate-fade-in-down">
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
        <h2 className="font-semibold text-lg flex items-center gap-2">
           <Palette size={18} className="text-blue-400" /> {t.customize}
        </h2>
        <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button 
                onClick={() => setConfig({...config, language: config.language === Language.EN ? Language.TR : Language.EN})}
                className="px-2 py-1 text-xs rounded border border-white/20 hover:bg-white/10 transition-colors uppercase font-bold"
            >
                {config.language === Language.EN ? 'TR' : 'EN'}
            </button>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={18} />
            </button>
        </div>
      </div>

      <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
        
        {/* Themes */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider font-bold opacity-60 text-blue-200">{t.themes}</label>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.name}
                onClick={() => setConfig({ ...config, theme })}
                className={`p-2 rounded-lg text-left text-xs transition-all border ${
                  config.theme.name === theme.name 
                  ? 'border-blue-500 bg-blue-500/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                  : 'border-transparent hover:bg-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: theme.backgroundColor }}></div>
                    {theme.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Background Settings */}
        <div className="space-y-3">
             <label className="text-xs uppercase tracking-wider font-bold opacity-60 text-blue-200">{t.background}</label>
             
             {/* Texture/Style Selector */}
             <div className="space-y-1">
                <span className="text-xs opacity-70 flex items-center gap-1 mb-1"><Layers size={10} /> {t.textures}</span>
                <div className="flex bg-black/30 p-1 rounded-lg">
                    {[BackgroundStyle.Solid, BackgroundStyle.Gradient, BackgroundStyle.Mesh, BackgroundStyle.Grain].map((style) => (
                        <button
                            key={style}
                            onClick={() => setConfig({...config, backgroundStyle: style})}
                            className={`flex-1 py-1 px-1 text-[10px] rounded-md capitalize transition-colors ${
                                config.backgroundStyle === style ? 'bg-white/20 text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Color Picker */}
            <div className="flex items-center gap-3 bg-black/30 p-2 rounded-lg">
                 <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 cursor-pointer group">
                    <input 
                        type="color" 
                        value={config.customBackgroundColor || config.theme.backgroundColor}
                        onChange={handleCustomColorChange}
                        className="absolute -top-2 -left-2 w-16 h-16 p-0 cursor-pointer opacity-0"
                    />
                    <div 
                        className="w-full h-full pointer-events-none" 
                        style={{backgroundColor: config.customBackgroundColor || config.theme.backgroundColor}} 
                    />
                    <Droplet size={12} className="absolute inset-0 m-auto text-white/50 group-hover:text-white pointer-events-none mix-blend-difference" />
                 </div>
                 <div className="flex-1 text-xs">
                    <span className="block opacity-80">{t.customColor}</span>
                    <span className="text-[10px] opacity-50 font-mono">{config.customBackgroundColor || config.theme.backgroundColor}</span>
                 </div>
                 {config.customBackgroundColor && (
                     <button onClick={clearCustomColor} className="text-[10px] underline opacity-50 hover:opacity-100 hover:text-red-400">
                         {t.resetColor}
                     </button>
                 )}
            </div>
        </div>

        {/* Display Options */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider font-bold opacity-60 text-blue-200">{t.display}</label>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
              <span className="flex items-center gap-2 group-hover:text-white transition-colors text-slate-300"><ClockIcon size={14} /> {t.showSeconds}</span>
              <input 
                type="checkbox" 
                checked={config.showSeconds} 
                onChange={(e) => setConfig({...config, showSeconds: e.target.checked})}
                className="accent-blue-500"
              />
            </label>
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
              <span className="flex items-center gap-2 group-hover:text-white transition-colors text-slate-300"><Activity size={14} /> {t.smoothSweep}</span>
              <input 
                type="checkbox" 
                checked={config.smoothSeconds} 
                onChange={(e) => setConfig({...config, smoothSeconds: e.target.checked})}
                className="accent-blue-500"
              />
            </label>
             <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
              <span className="flex items-center gap-2 group-hover:text-white transition-colors text-slate-300"><Calendar size={14} /> {t.showDate}</span>
              <input 
                type="checkbox" 
                checked={config.showDate} 
                onChange={(e) => setConfig({...config, showDate: e.target.checked})}
                className="accent-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Style Options */}
        <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider font-bold opacity-60 text-blue-200">{t.style}</label>
            
            <div className="space-y-1">
                <span className="text-xs opacity-70 block mb-1">{t.markers}</span>
                <div className="flex bg-black/30 p-1 rounded-lg">
                    {[MarkerStyle.None, MarkerStyle.Quarters, MarkerStyle.All, MarkerStyle.Dots].map((style) => (
                        <button
                            key={style}
                            onClick={() => setConfig({...config, markerStyle: style})}
                            className={`flex-1 py-1 px-2 text-xs rounded-md capitalize transition-colors ${
                                config.markerStyle === style ? 'bg-white/20 text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-1">
                <span className="text-xs opacity-70 block mb-1">{t.hands}</span>
                <div className="flex bg-black/30 p-1 rounded-lg">
                    {[HandStyle.Standard, HandStyle.Minimal, HandStyle.Tapered, HandStyle.Round].map((style) => (
                        <button
                            key={style}
                            onClick={() => setConfig({...config, handStyle: style})}
                            className={`flex-1 py-1 px-2 text-xs rounded-md capitalize transition-colors ${
                                config.handStyle === style ? 'bg-white/20 text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;