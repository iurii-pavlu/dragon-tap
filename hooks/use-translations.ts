"use client"

import * as React from "react"
import { getTranslations, t as translate, type Locale } from "@/lib/i18n"

export function useTranslations() {
  const [locale, setLocale] = React.useState<Locale>('en')

  React.useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && ['en', 'vi'].includes(savedLocale)) {
      setLocale(savedLocale)
    }
  }, [])

  const handleSetLocale = React.useCallback((newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }, [])

  const t = React.useCallback((key: string, params?: Record<string, any>) => {
    return translate(locale, key, params)
  }, [locale])

  const translations = React.useMemo(() => {
    return getTranslations(locale)
  }, [locale])

  return {
    locale,
    setLocale: handleSetLocale,
    t,
    translations
  }
}