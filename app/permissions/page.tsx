import { Sidebar } from "@/components/sidebar"
import { UserPermissions } from "@/components/user-permissions"

export default function PermissionsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-serif text-foreground">Phân quyền & Quản lý người dùng</h1>
            <p className="text-muted-foreground mt-2">Quản lý tài khoản và phân quyền truy cập hệ thống</p>
          </div>
          <UserPermissions />
        </div>
      </main>
    </div>
  )
}
