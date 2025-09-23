"use client"

import * as React from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { Locale } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
  className?: string
}

export function LanguageSwitcher({ 
  currentLocale, 
  onLocaleChange, 
  className 
}: LanguageSwitcherProps) {
  return (
    <div className={cn("flex rounded-lg bg-surface border border-border p-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLocaleChange('en')}
        className={cn(
          "px-3 py-1 text-xs font-semibold tracking-tight transition-all",
          currentLocale === 'en' 
            ? "bg-coin text-background" 
            : "text-text-secondary hover:text-text-primary"
        )}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLocaleChange('vi')}
        className={cn(
          "px-3 py-1 text-xs font-semibold tracking-tight transition-all",
          currentLocale === 'vi' 
            ? "bg-coin text-background" 
            : "text-text-secondary hover:text-text-primary"
        )}
      >
        VI
      </Button>
    </div>
  )
}