"use client"

// Type definitions for Telegram WebApp
interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      photo_url?: string
    }
    auth_date?: number
    hash?: string
  }
  colorScheme: 'light' | 'dark'
  themeParams: {
    bg_color: string
    text_color: string
    hint_color: string
    link_color: string
    button_color: string
    button_text_color: string
  }
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export class TelegramWebAppSDK {
  private webApp: TelegramWebApp | null = null

  constructor() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.webApp = window.Telegram.WebApp
      this.webApp.ready()
    }
  }

  isAvailable(): boolean {
    return this.webApp !== null
  }

  expand(): void {
    if (this.webApp) {
      this.webApp.expand()
    }
  }

  close(): void {
    if (this.webApp) {
      this.webApp.close()
    }
  }

  getUser() {
    if (this.webApp?.initDataUnsafe?.user) {
      const user = this.webApp.initDataUnsafe.user
      return {
        id: user.id.toString(),
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        languageCode: user.language_code,
        photoUrl: user.photo_url
      }
    }
    return null
  }

  getTheme() {
    if (this.webApp) {
      return {
        colorScheme: this.webApp.colorScheme,
        themeParams: this.webApp.themeParams
      }
    }
    return null
  }

  getInitData(): string {
    return this.webApp?.initData || ''
  }
}

// Singleton instance
export const telegramWebApp = new TelegramWebAppSDK()