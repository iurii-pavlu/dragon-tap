"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: "default" | "energy" | "xp"
  }
>(({ className, value, variant = "default", ...props }, ref) => {
  const getBarColor = () => {
    switch (variant) {
      case "energy":
        return "bg-gradient-to-r from-energy to-green-500"
      case "xp":
        return "bg-gradient-to-r from-accent-purple to-purple-500"
      default:
        return "bg-gradient-to-r from-coin to-amber-500"
    }
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-surface border border-border",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-300 ease-out",
          getBarColor()
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }