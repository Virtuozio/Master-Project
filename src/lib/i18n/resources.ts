import ar from '@/translations/ar.json';
import en from '@/translations/en.json';
import ua from '@/translations/ua.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  ua: {
    translation: ua,
  },
};

export type Language = keyof typeof resources;
