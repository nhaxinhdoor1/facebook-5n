import { Sidebar } from "@/components/sidebar"
import { ChatbotManagement } from "@/components/chatbot-management"

export default function ChatbotPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-serif text-foreground">Quản lý Chatbot</h1>
            <p className="text-muted-foreground mt-2">Tạo và chỉnh sửa kịch bản hội thoại tự động kết hợp AI</p>
          </div>
          <ChatbotManagement />
        </div>
      </main>
    </div>
  )
}
