"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Shield,
  Settings,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  Crown,
  User,
  MessageSquare,
  BarChart3,
  Bot,
  Zap,
  Search,
} from "lucide-react"
import { UserRoleManager } from "@/components/user-role-manager"
import { SessionManager } from "@/components/session-manager"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "agent" | "viewer"
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  createdAt: string
  permissions: string[]
  assignedChats: number
  avatar?: string
}

interface Role {
  id: string
  name: string
  displayName: string
  description: string
  permissions: string[]
  userCount: number
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Nguyễn Văn Admin",
    email: "admin@company.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 14:30",
    createdAt: "2024-01-01",
    permissions: ["all"],
    assignedChats: 0,
  },
  {
    id: "2",
    name: "Trần Thị Manager",
    email: "manager@company.com",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-15 13:45",
    createdAt: "2024-01-02",
    permissions: ["dashboard", "customers", "chatbot", "reports", "users"],
    assignedChats: 5,
  },
  {
    id: "3",
    name: "Lê Minh Agent",
    email: "agent1@company.com",
    role: "agent",
    status: "active",
    lastLogin: "2024-01-15 14:20",
    createdAt: "2024-01-05",
    permissions: ["customers", "messages", "chatbot"],
    assignedChats: 12,
  },
  {
    id: "4",
    name: "Phạm Thu Viewer",
    email: "viewer@company.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "2024-01-14 16:00",
    createdAt: "2024-01-10",
    permissions: ["dashboard", "reports"],
    assignedChats: 0,
  },
]

const mockRoles: Role[] = [
  {
    id: "admin",
    name: "admin",
    displayName: "Quản trị viên",
    description: "Toàn quyền truy cập và quản lý hệ thống",
    permissions: ["all"],
    userCount: 1,
  },
  {
    id: "manager",
    name: "manager",
    displayName: "Quản lý",
    description: "Quản lý nhóm và giám sát hoạt động",
    permissions: ["dashboard", "customers", "chatbot", "reports", "users", "integrations"],
    userCount: 1,
  },
  {
    id: "agent",
    name: "agent",
    displayName: "Nhân viên tư vấn",
    description: "Xử lý chat và hỗ trợ khách hàng",
    permissions: ["customers", "messages", "chatbot"],
    userCount: 1,
  },
  {
    id: "viewer",
    name: "viewer",
    displayName: "Người xem",
    description: "Chỉ xem báo cáo và thống kê",
    permissions: ["dashboard", "reports"],
    userCount: 1,
  },
]

const allPermissions = [
  { id: "dashboard", name: "Tổng quan", icon: BarChart3 },
  { id: "customers", name: "Quản lý khách hàng", icon: Users },
  { id: "chatbot", name: "Quản lý chatbot", icon: Bot },
  { id: "messages", name: "Tin nhắn", icon: MessageSquare },
  { id: "reports", name: "Báo cáo", icon: BarChart3 },
  { id: "integrations", name: "Tích hợp", icon: Zap },
  { id: "users", name: "Quản lý người dùng", icon: Shield },
  { id: "settings", name: "Cài đặt", icon: Settings },
]

export function UserPermissions() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getRoleIcon = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "manager":
        return <UserCheck className="h-4 w-4 text-blue-500" />
      case "agent":
        return <User className="h-4 w-4 text-green-500" />
      case "viewer":
        return <Eye className="h-4 w-4 text-gray-500" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleDisplayName = (role: User["role"]) => {
    const roleObj = roles.find((r) => r.name === role)
    return roleObj?.displayName || role
  }

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white"
      case "inactive":
        return "bg-gray-500 text-white"
      case "suspended":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusText = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "Hoạt động"
      case "inactive":
        return "Không hoạt động"
      case "suspended":
        return "Tạm khóa"
      default:
        return "Không xác định"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="roles">Vai trò</TabsTrigger>
          <TabsTrigger value="sessions">Phiên làm việc</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Tổng người dùng</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{stats.active}</p>
                    <p className="text-sm text-muted-foreground">Đang hoạt động</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <EyeOff className="h-6 w-6 text-gray-500" />
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{stats.inactive}</p>
                    <p className="text-sm text-muted-foreground">Không hoạt động</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <UserX className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{stats.suspended}</p>
                    <p className="text-sm text-muted-foreground">Tạm khóa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Management */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-card-foreground">Danh sách người dùng</CardTitle>
                <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm người dùng
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Tạo người dùng mới</DialogTitle>
                    </DialogHeader>
                    <CreateUserForm onClose={() => setIsCreateUserOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm theo tên hoặc email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả vai trò</SelectItem>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="manager">Quản lý</SelectItem>
                    <SelectItem value="agent">Nhân viên</SelectItem>
                    <SelectItem value="viewer">Người xem</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                    <SelectItem value="suspended">Tạm khóa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Chat được giao</TableHead>
                      <TableHead>Lần cuối đăng nhập</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-card-foreground">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(user.role)}
                            <span>{getRoleDisplayName(user.role)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            {user.assignedChats}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Chi tiết người dùng</DialogTitle>
                                </DialogHeader>
                                {selectedUser && <UserDetailForm user={selectedUser} />}
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <UserRoleManager roles={roles} permissions={allPermissions} />
        </TabsContent>

        <TabsContent value="sessions">
          <SessionManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CreateUserForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Họ và tên</Label>
          <Input id="name" placeholder="Nhập họ và tên..." />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Nhập email..." />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="role">Vai trò</Label>
          <Select defaultValue="agent">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Quản trị viên</SelectItem>
              <SelectItem value="manager">Quản lý</SelectItem>
              <SelectItem value="agent">Nhân viên</SelectItem>
              <SelectItem value="viewer">Người xem</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Trạng thái</Label>
          <Select defaultValue="active">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="password">Mật khẩu tạm thời</Label>
        <Input id="password" type="password" placeholder="Nhập mật khẩu..." />
      </div>

      <div>
        <Label>Quyền truy cập</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {allPermissions.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox id={permission.id} />
              <Label htmlFor={permission.id} className="text-sm">
                {permission.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button className="bg-primary text-primary-foreground">Tạo người dùng</Button>
      </div>
    </div>
  )
}

function UserDetailForm({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Vai trò</Label>
          <div className="flex items-center gap-2 mt-1">
            {getRoleIcon(user.role)}
            <span>{getRoleDisplayName(user.role)}</span>
          </div>
        </div>
        <div>
          <Label>Trạng thái</Label>
          <div className="mt-1">
            <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Chat được giao</Label>
          <p className="text-2xl font-bold text-foreground mt-1">{user.assignedChats}</p>
        </div>
        <div>
          <Label>Lần cuối đăng nhập</Label>
          <p className="text-sm text-muted-foreground mt-1">{user.lastLogin}</p>
        </div>
      </div>

      <div>
        <Label>Quyền truy cập</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {allPermissions.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                id={`detail-${permission.id}`}
                checked={user.permissions.includes(permission.id) || user.permissions.includes("all")}
                disabled
              />
              <Label htmlFor={`detail-${permission.id}`} className="text-sm">
                {permission.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
