import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { Clock, MessageSquare, Phone, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatientInQueue {
  id: string
  name: string
  channel: "whatsapp" | "messenger" | "instagram" | "email" | "phone"
  priority: "low" | "medium" | "high" | "urgent"
  waitTime: number // em minutos
  lastMessage: string
  unreadCount: number
  assignedTo?: string
}

interface PatientQueueProps {
  queue: PatientInQueue[]
  onAssignPatient: (patientId: string) => void
  onOpenChat: (patientId: string) => void
  className?: string
}

const mockQueue: PatientInQueue[] = [
  {
    id: "1",
    name: "Maria Silva",
    channel: "whatsapp",
    priority: "urgent",
    waitTime: 15,
    lastMessage: "Estou com muita dor no peito",
    unreadCount: 3,
    assignedTo: "Dr. João"
  },
  {
    id: "2", 
    name: "Pedro Santos",
    channel: "messenger",
    priority: "high",
    waitTime: 8,
    lastMessage: "Preciso reagendar minha consulta",
    unreadCount: 1
  },
  {
    id: "3",
    name: "Ana Costa",
    channel: "instagram", 
    priority: "medium",
    waitTime: 3,
    lastMessage: "Gostaria de informações sobre exames",
    unreadCount: 2
  },
  {
    id: "4",
    name: "Carlos Lima",
    channel: "email",
    priority: "low", 
    waitTime: 25,
    lastMessage: "Solicitação de segunda via de receita",
    unreadCount: 0
  }
]

export function PatientQueue({ 
  queue = mockQueue, 
  onAssignPatient, 
  onOpenChat, 
  className 
}: PatientQueueProps) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: "destructive",
      high: "away",
      medium: "secondary",
      low: "muted"
    }
    return colors[priority as keyof typeof colors] || "muted"
  }

  const getChannelIcon = (channel: string) => {
    const icons = {
      whatsapp: "📱",
      messenger: "💬",
      instagram: "📷", 
      email: "📧",
      phone: "📞"
    }
    return icons[channel as keyof typeof icons] || "💬"
  }

  const formatWaitTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Fila de Atendimento</span>
          <Badge variant="outline">{queue.length} pacientes</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-3">
            {queue.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-gradient-card hover:shadow-card transition-all cursor-pointer"
                onClick={() => onOpenChat(patient.id)}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <StatusIndicator status="online" className="absolute -bottom-1 -right-1" size="sm" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm truncate">{patient.name}</h4>
                      <span className="text-xs">{getChannelIcon(patient.channel)}</span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          patient.priority === "urgent" && "border-destructive text-destructive",
                          patient.priority === "high" && "border-away text-away",
                          patient.priority === "medium" && "border-secondary text-secondary"
                        )}
                      >
                        {patient.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {patient.lastMessage}
                    </p>
                    
                    <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatWaitTime(patient.waitTime)}</span>
                      </div>
                      
                      {patient.assignedTo && (
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{patient.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {patient.unreadCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      {patient.unreadCount}
                    </Badge>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAssignPatient(patient.id)
                    }}
                    className="text-xs"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Atender
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}