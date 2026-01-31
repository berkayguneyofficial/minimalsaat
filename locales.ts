import { Language } from './types';

type Translations = {
  [key in Language]: {
    customize: string;
    themes: string;
    display: string;
    style: string;
    background: string;
    showSeconds: string;
    smoothSweep: string;
    showDate: string;
    markers: string;
    hands: string;
    textures: string;
    customColor: string;
    resetColor: string;
    madeWith: string;
  };
};

export const translations: Translations = {
  [Language.EN]: {
    customize: 'Customize',
    themes: 'Themes',
    display: 'Display',
    style: 'Style',
    background: 'Background',
    showSeconds: 'Show Seconds',
    smoothSweep: 'Smooth Sweep',
    showDate: 'Show Date',
    markers: 'Markers',
    hands: 'Hands',
    textures: 'Texture',
    customColor: 'Custom Color',
    resetColor: 'Reset',
    madeWith: 'Made with React & Tailwind',
  },
  [Language.TR]: {
    customize: 'Özelleştir',
    themes: 'Temalar',
    display: 'Görünüm',
    style: 'Stil',
    background: 'Arka Plan',
    showSeconds: 'Saniyeyi Göster',
    smoothSweep: 'Akıcı Saniye',
    showDate: 'Tarihi Göster',
    markers: 'İşaretçiler',
    hands: 'İbreler',
    textures: 'Doku',
    customColor: 'Özel Renk',
    resetColor: 'Sıfırla',
    madeWith: 'React & Tailwind ile yapıldı',
  },
};
