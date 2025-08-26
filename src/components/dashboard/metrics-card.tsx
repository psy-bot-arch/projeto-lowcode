import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    direction: "up" | "down"
    period: string
  }
  icon?: React.ReactNode
  className?: string
  variant?: "default" | "success" | "warning" | "danger"
}

export function MetricsCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  className,
  variant = "default"
}: MetricsCardProps) {
  const variantClasses = {
    default: "bg-gradient-card",
    success: "bg-gradient-secondary border-secondary/20",
    warning: "bg-gradient-to-br from-away/10 to-away/5 border-away/20",
    danger: "bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20"
  }

  return (
    <Card className={cn(
      "relative overflow-hidden border shadow-card hover:shadow-hover transition-all duration-300",
      variantClasses[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <Badge 
              variant={trend.direction === "up" ? "default" : "destructive"}
              className="text-xs"
            >
              {trend.direction === "up" ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {trend.value}%
            </Badge>
            <span className="text-xs text-muted-foreground ml-2">
              vs {trend.period}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}