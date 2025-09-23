"use client"

import * as React from "react"
import { TabBar } from "@/components/ui/tab-bar"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslations } from "@/hooks/use-translations"

const tabs = [
  {
    id: 'friends',
    label: 'Friends',
    href: '/friends',
    icon: '/assets/icons/friends.svg'
  },
  {
    id: 'tasks',
    label: 'Tasks', 
    href: '/tasks',
    icon: '/assets/icons/tasks.svg'
  },
  {
    id: 'tap',
    label: 'Tap!',
    href: '/tap',
    icon: '/assets/icons/tap.svg'
  },
  {
    id: 'rating',
    label: 'Rating',
    href: '/rating', 
    icon: '/assets/icons/rating.svg'
  },
  {
    id: 'games',
    label: 'Games',
    href: '/games',
    icon: '/assets/icons/games.svg'
  }
]

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, setLocale, t } = useTranslations()

  // Localize tab labels
  const localizedTabs = tabs.map(tab => ({
    ...tab,
    label: t(`navigation.${tab.id}`)
  }))

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-text-primary tracking-tight">
            {process.env.NEXT_PUBLIC_APP_NAME || 'Dragon Tap'}
          </h1>
          <LanguageSwitcher 
            currentLocale={locale}
            onLocaleChange={setLocale}
          />
        </div>
      </header>

      {/* Main content with bottom padding for tab bar */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Tab Navigation */}
      <TabBar tabs={localizedTabs} />
    </div>
  )
}