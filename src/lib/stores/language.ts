import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { locale } from 'svelte-i18n';

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE = 'en';

function loadInitialLanguage() {
  if (!browser) return DEFAULT_LANGUAGE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function persistLanguage(language: string) {
  if (browser) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (err) {
      console.error('Error saving language to localStorage:', err);
    }
  }
}

export const currentLanguage = writable(loadInitialLanguage());

currentLanguage.subscribe((lang) => {
  persistLanguage(lang);
  locale.set(lang);
});

export function toggleLanguage() {
  currentLanguage.update(lang => lang === 'en' ? 'es' : 'en');
}

export function setLanguage(language: string) {
  if (language === 'en' || language === 'es') {
    currentLanguage.set(language);
  }
}