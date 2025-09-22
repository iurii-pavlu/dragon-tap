import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Locale, defaultLocale } from '@/lib/i18n'

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: defaultLocale,
      setLocale: (locale: Locale) => set({ locale }),
    }),
    {
      name: 'dragon-tap-locale',
    }
  )
)