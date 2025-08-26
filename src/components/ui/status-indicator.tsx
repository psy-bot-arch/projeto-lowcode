import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: "online" | "away" | "busy" | "offline"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StatusIndicator({ status, size = "md", className }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3", 
    lg: "w-4 h-4"
  }

  const statusClasses = {
    online: "bg-online",
    away: "bg-away",
    busy: "bg-busy",
    offline: "bg-offline"
  }

  return (
    <div
      className={cn(
        "rounded-full border-2 border-background",
        sizeClasses[size],
        statusClasses[status],
        status === "online" && "animate-pulse-slow",
        className
      )}
    />
  )
}