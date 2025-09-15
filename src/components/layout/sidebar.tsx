import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  Bell,
  LogOut,
  User,
  Calendar,
  Activity,
  Clock,
  Home
} from "lucide-react"

interface SidebarProps {
  userRole: "attendant" | "manager"
  userName: string
  unreadNotifications?: number
  className?: string
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Sidebar({ 
  userRole, 
  userName, 
  unreadNotifications = 0, 
  className,
  activeTab = "dashboard",
  onTabChange 
}: SidebarProps) {

  const navigation = {
    attendant: [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "chat", label: "Chat", icon: MessageSquare, badge: 5 },
      { id: "schedule", label: "Agenda", icon: Calendar },
      { id: "patients", label: "Pacientes", icon: Users },
    ],
    manager: [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "chat", label: "Chat", icon: MessageSquare, badge: 5 },
      { id: "analytics", label: "Relatórios", icon: BarChart3 },
      { id: "team", label: "Equipe", icon: Users },
      { id: "schedule", label: "Agenda", icon: Calendar },
      { id: "performance", label: "Performance", icon: Activity },
    ]
  }

  const currentNavigation = navigation[userRole]

  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar border-r border-sidebar-border w-64",
      className
    )}>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">MediChat</h2>
            <p className="text-xs text-sidebar-foreground/70">Sistema Omnichannel</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-sidebar-accent-foreground" />
            </div>
            <StatusIndicator status="online" className="absolute -bottom-1 -right-1" size="sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">
              {userRole === "attendant" ? "Atendente" : "Gerente"}
            </p>
          </div>
          {unreadNotifications > 0 && (
            <Badge className="bg-destructive text-destructive-foreground text-xs">
              {unreadNotifications}
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {currentNavigation.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                activeTab === item.id && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              onClick={() => onTabChange?.(item.id)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge className="bg-primary text-primary-foreground text-xs ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <Separator className="my-6 bg-sidebar-border" />

        {/* Quick Stats para Gerentes */}
        {userRole === "manager" && (
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              Status Atual
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sidebar-foreground/70">Atendentes Online</span>
                <span className="text-sidebar-foreground font-medium">8/12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sidebar-foreground/70">Tempo Médio</span>
                <span className="text-sidebar-foreground font-medium">2m 30s</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sidebar-foreground/70">Na Fila</span>
                <span className="text-sidebar-foreground font-medium">14</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Bell className="w-4 h-4 mr-3" />
          Notificações
          {unreadNotifications > 0 && (
            <Badge className="bg-destructive text-destructive-foreground text-xs ml-auto">
              {unreadNotifications}
            </Badge>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings className="w-4 h-4 mr-3" />
          Configurações
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sair
        </Button>
      </div>
    </div>
  )
}