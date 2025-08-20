import { Sidebar } from "@/components/sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-serif text-foreground">Tổng quan Dashboard</h1>
            <p className="text-muted-foreground mt-2">Quản lý chatbot Facebook tích hợp ChatGPT</p>
          </div>
          <DashboardOverview />
        </div>
      </main>
    </div>
  )
}
