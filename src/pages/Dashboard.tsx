import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { MetricsCard } from "@/components/dashboard/metrics-card"
import { PatientQueue } from "@/components/dashboard/patient-queue"
import { ChatInterface } from "@/components/chat/chat-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Users, 
  Clock, 
  TrendingUp, 
  Activity,
  Phone,
  Mail,
  Calendar,
  BarChart3
} from "lucide-react"

interface DashboardProps {
  userRole?: "attendant" | "manager"
}

const mockPatient = {
  id: "1",
  name: "Maria Silva", 
  status: "online" as const,
  lastSeen: new Date(),
  channel: "WhatsApp"
}

export default function Dashboard({ userRole = "manager" }: DashboardProps) {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)

  const handleOpenChat = (patientId: string) => {
    setSelectedPatientId(patientId)
    setShowChat(true)
  }

  const handleAssignPatient = (patientId: string) => {
    console.log("Assigning patient:", patientId)
  }

  const handleSendMessage = (content: string) => {
    console.log("Sending message:", content)
  }

  // Métricas do Dashboard
  const metrics = {
    manager: [
      {
        title: "Total de Atendimentos Hoje",
        value: "142",
        subtitle: "+12 desde ontem",
        trend: { value: 8.2, direction: "up" as const, period: "última semana" },
        icon: <MessageSquare className="w-4 h-4" />,
        variant: "success" as const
      },
      {
        title: "Tempo Médio de Resposta", 
        value: "2m 18s",
        subtitle: "Meta: < 3 minutos",
        trend: { value: 15.3, direction: "down" as const, period: "último mês" },
        icon: <Clock className="w-4 h-4" />,
        variant: "default" as const
      },
      {
        title: "Taxa de Conversão",
        value: "68%",
        subtitle: "Consultas agendadas",
        trend: { value: 5.1, direction: "up" as const, period: "última semana" },
        icon: <TrendingUp className="w-4 h-4" />,
        variant: "success" as const
      },
      {
        title: "Atendentes Ativos",
        value: "8/12",
        subtitle: "67% da capacidade",
        icon: <Users className="w-4 h-4" />,
        variant: "warning" as const
      }
    ],
    attendant: [
      {
        title: "Seus Atendimentos Hoje",
        value: "18",
        subtitle: "+3 desde ontem",
        trend: { value: 12.5, direction: "up" as const, period: "média semanal" },
        icon: <MessageSquare className="w-4 h-4" />,
        variant: "success" as const
      },
      {
        title: "Tempo Médio de Resposta",
        value: "1m 45s",
        subtitle: "Sua meta: < 2 minutos",
        trend: { value: 8.7, direction: "down" as const, period: "última semana" },
        icon: <Clock className="w-4 h-4" />,
        variant: "default" as const
      },
      {
        title: "Taxa de Resolução",
        value: "94%", 
        subtitle: "Casos fechados hoje",
        trend: { value: 2.1, direction: "up" as const, period: "última semana" },
        icon: <TrendingUp className="w-4 h-4" />,
        variant: "success" as const
      },
      {
        title: "Na Sua Fila",
        value: "5",
        subtitle: "Aguardando resposta",
        icon: <Users className="w-4 h-4" />,
        variant: "warning" as const
      }
    ]
  }

  const currentMetrics = metrics[userRole]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole={userRole}
        userName={userRole === "manager" ? "Dr. João Silva" : "Ana Santos"}
        unreadNotifications={3}
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Dashboard Principal */}
          <div className={cn(
            "flex-1 p-6 overflow-y-auto",
            showChat ? "hidden lg:block lg:w-1/2" : "w-full"
          )}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {userRole === "manager" ? "Dashboard Gerencial" : "Meus Atendimentos"}
                </h1>
                <p className="text-muted-foreground">
                  {userRole === "manager" 
                    ? "Visão geral do sistema de atendimento" 
                    : "Gerencie seus pacientes e conversas"
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Hoje
                </Button>
                {userRole === "manager" && (
                  <Button className="bg-gradient-primary">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Relatórios
                  </Button>
                )}
              </div>
            </div>

            {/* Métricas Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {currentMetrics.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  subtitle={metric.subtitle}
                  trend={metric.trend}
                  icon={metric.icon}
                  variant={metric.variant}
                  className="animate-fade-in"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Fila de Pacientes */}
              <div className="lg:col-span-2">
                <PatientQueue
                  queue={[]}
                  onAssignPatient={handleAssignPatient}
                  onOpenChat={handleOpenChat}
                  className="animate-fade-in"
                />
              </div>

              {/* Atividade Recente */}
              <div className="space-y-6">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Canais Mais Ativos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>📱</span>
                        <span className="text-sm">WhatsApp</span>
                      </div>
                      <Badge variant="outline">68%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>💬</span>
                        <span className="text-sm">Messenger</span>
                      </div>
                      <Badge variant="outline">18%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>📧</span>
                        <span className="text-sm">Email</span>
                      </div>
                      <Badge variant="outline">14%</Badge>
                    </div>
                  </CardContent>
                </Card>

                {userRole === "manager" && (
                  <Card className="animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Top Atendentes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Ana Santos</span>
                        <Badge className="bg-secondary">24 atend.</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Carlos Lima</span>
                        <Badge className="bg-secondary">22 atend.</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Maria Costa</span>
                        <Badge className="bg-secondary">19 atend.</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          {showChat && (
            <div className="w-full lg:w-1/2 border-l border-border">
              <ChatInterface
                patient={mockPatient}
                messages={[]}
                onSendMessage={handleSendMessage}
                className="h-full"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}