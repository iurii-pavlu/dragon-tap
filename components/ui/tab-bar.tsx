"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface TabItem {
  id: string
  label: string
  href: string
  icon: string
}

interface TabBarProps {
  tabs: TabItem[]
}

export function TabBar({ tabs }: TabBarProps) {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 tab-bar mobile-safe-area">
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1 transition-all duration-200",
                "tap-feedback"
              )}
            >
              <div className={cn(
                "w-6 h-6 mb-1 transition-all duration-200",
                isActive ? "text-coin" : "text-text-secondary"
              )}>
                <Image 
                  src={tab.icon} 
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="w-full h-full"
                />
              </div>
              <span className={cn(
                "text-xs font-medium tracking-tight",
                isActive ? "text-coin" : "text-text-secondary"
              )}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}