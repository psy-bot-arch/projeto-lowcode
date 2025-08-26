import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { Send, Phone, Video, MoreVertical, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "patient" | "agent"
  timestamp: Date
  channel: "whatsapp" | "messenger" | "instagram" | "email" | "phone"
}

interface Patient {
  id: string
  name: string
  status: "online" | "away" | "busy" | "offline"
  lastSeen?: Date
  channel: string
  avatar?: string
}

interface ChatInterfaceProps {
  patient: Patient
  messages: Message[]
  onSendMessage: (content: string) => void
  className?: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Olá! Gostaria de agendar uma consulta com cardiologista",
    sender: "patient", 
    timestamp: new Date(Date.now() - 300000),
    channel: "whatsapp"
  },
  {
    id: "2", 
    content: "Olá! Claro, posso te ajudar com o agendamento. Qual seria sua preferência de data?",
    sender: "agent",
    timestamp: new Date(Date.now() - 240000),
    channel: "whatsapp"
  },
  {
    id: "3",
    content: "Prefiro na próxima semana, se possível pela manhã",
    sender: "patient",
    timestamp: new Date(Date.now() - 180000), 
    channel: "whatsapp"
  }
]

export function ChatInterface({ patient, messages = mockMessages, onSendMessage, className }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage("")
    }
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

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      {/* Header do Chat */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-card">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <StatusIndicator status={patient.status} className="absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{patient.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{getChannelIcon(patient.channel)}</span>
              <span>{patient.channel}</span>
              {patient.lastSeen && (
                <>
                  <Clock className="w-3 h-3" />
                  <span>Visto por último: {patient.lastSeen.toLocaleTimeString()}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Área de Mensagens */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "agent" ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] px-4 py-2 rounded-lg text-sm",
                  message.sender === "agent" 
                    ? "bg-chat-bubble-agent text-card-foreground" 
                    : "bg-chat-bubble-user text-primary-foreground"
                )}
              >
                <p>{message.content}</p>
                <p className={cn(
                  "text-xs mt-1 opacity-70",
                  message.sender === "agent" ? "text-muted-foreground" : "text-primary-foreground/70"
                )}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input de Nova Mensagem */}
      <div className="p-4 border-t bg-chat-input">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" className="bg-gradient-primary">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}