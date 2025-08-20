import { Sidebar } from "@/components/sidebar"
import { CustomerManagement } from "@/components/customer-management"

export default function CustomersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-serif text-foreground">Quản lý Khách hàng</h1>
            <p className="text-muted-foreground mt-2">Theo dõi và phân loại khách hàng thông minh với AI</p>
          </div>
          <CustomerManagement />
        </div>
      </main>
    </div>
  )
}
