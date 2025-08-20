"use client"

import { cn } from "@/lib/utils"
import { BarChart3, Bot, Users, Settings, FileText, Zap, MessageSquare, Shield } from "lucide-react"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Tổng quan", href: "/", icon: BarChart3 },
  { name: "Quản lý Chatbot", href: "/chatbot", icon: Bot },
  { name: "Khách hàng", href: "/customers", icon: Users },
  { name: "Tin nhắn", href: "/messages", icon: MessageSquare },
  { name: "Báo cáo", href: "/reports", icon: FileText },
  { name: "Tích hợp", href: "/integrations", icon: Zap },
  { name: "Phân quyền", href: "/permissions", icon: Shield },
  { name: "Cài đặt", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border bg-white">
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-serif text-sidebar-foreground">ChatBot Admin</span>
        </div>
      </div>

      <nav className="mt-6 px-3 bg-white">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isCurrent = pathname === item.href

            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isCurrent
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
