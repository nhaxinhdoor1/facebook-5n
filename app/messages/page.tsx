"use client"

import { Sidebar } from "@/components/sidebar"
import { MessagesInterface } from "@/components/messages-interface"

export default function MessagesPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Quản lý Tin nhắn</h1>
            <p className="text-muted-foreground mt-2">
              Tính năng AI trả lời tự động nâng cao với ChatGPT và quản lý hội thoại thông minh
            </p>
          </div>
          <MessagesInterface />
        </div>
      </main>
    </div>
  )
}
