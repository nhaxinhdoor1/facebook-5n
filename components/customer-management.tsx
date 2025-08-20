"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  Search,
  Download,
  Upload,
  Star,
  MessageSquare,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Bot,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react"
import { CustomerDetail } from "@/components/customer-detail"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  firstContact: string
  lastContact: string
  totalMessages: number
  aiInteractions: number
  leadScore: number
  leadStatus: "hot" | "warm" | "cold" | "converted"
  source: string
  tags: string[]
  avatar?: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    phone: "+84 901 234 567",
    location: "Hà Nội",
    firstContact: "2024-01-10",
    lastContact: "2024-01-15",
    totalMessages: 24,
    aiInteractions: 18,
    leadScore: 85,
    leadStatus: "hot",
    source: "Facebook",
    tags: ["VIP", "Quan tâm sản phẩm A"],
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    email: "binh.tran@email.com",
    phone: "+84 902 345 678",
    location: "TP.HCM",
    firstContact: "2024-01-12",
    lastContact: "2024-01-14",
    totalMessages: 12,
    aiInteractions: 8,
    leadScore: 72,
    leadStatus: "warm",
    source: "Website",
    tags: ["Tư vấn", "Giá cả"],
  },
  {
    id: "3",
    name: "Lê Minh Cường",
    email: "cuong.le@email.com",
    phone: "+84 903 456 789",
    location: "Đà Nẵng",
    firstContact: "2024-01-08",
    lastContact: "2024-01-13",
    totalMessages: 8,
    aiInteractions: 6,
    leadScore: 45,
    leadStatus: "cold",
    source: "Zalo",
    tags: ["Khảo sát"],
  },
  {
    id: "4",
    name: "Phạm Thu Hương",
    email: "huong.pham@email.com",
    phone: "+84 904 567 890",
    location: "Hà Nội",
    firstContact: "2024-01-05",
    lastContact: "2024-01-15",
    totalMessages: 35,
    aiInteractions: 22,
    leadScore: 95,
    leadStatus: "converted",
    source: "Facebook",
    tags: ["Đã mua", "VIP", "Giới thiệu"],
  },
]

export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")

  const getLeadStatusColor = (status: Customer["leadStatus"]) => {
    switch (status) {
      case "hot":
        return "bg-red-500 text-white"
      case "warm":
        return "bg-orange-500 text-white"
      case "cold":
        return "bg-blue-500 text-white"
      case "converted":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getLeadStatusText = (status: Customer["leadStatus"]) => {
    switch (status) {
      case "hot":
        return "Nóng"
      case "warm":
        return "Ấm"
      case "cold":
        return "Lạnh"
      case "converted":
        return "Đã chuyển đổi"
      default:
        return "Không xác định"
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || customer.leadStatus === statusFilter
    const matchesSource = sourceFilter === "all" || customer.source === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  const stats = {
    total: customers.length,
    hot: customers.filter((c) => c.leadStatus === "hot").length,
    warm: customers.filter((c) => c.leadStatus === "warm").length,
    cold: customers.filter((c) => c.leadStatus === "cold").length,
    converted: customers.filter((c) => c.leadStatus === "converted").length,
  }

  return (
    <div className="space-y-6">
      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Tổng khách hàng</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.hot}</p>
                <p className="text-sm text-muted-foreground">Lead nóng</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.warm}</p>
                <p className="text-sm text-muted-foreground">Lead ấm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.cold}</p>
                <p className="text-sm text-muted-foreground">Lead lạnh</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.converted}</p>
                <p className="text-sm text-muted-foreground">Đã chuyển đổi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Danh sách khách hàng</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="hot">Lead nóng</SelectItem>
                <SelectItem value="warm">Lead ấm</SelectItem>
                <SelectItem value="cold">Lead lạnh</SelectItem>
                <SelectItem value="converted">Đã chuyển đổi</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Nguồn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nguồn</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Zalo">Zalo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Table */}
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Địa điểm</TableHead>
                  <TableHead>Lead Score</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Tin nhắn</TableHead>
                  <TableHead>AI Tương tác</TableHead>
                  <TableHead>Lần cuối</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.source}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {customer.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${customer.leadScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{customer.leadScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLeadStatusColor(customer.leadStatus)}>
                        {getLeadStatusText(customer.leadStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        {customer.totalMessages}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Bot className="h-4 w-4 text-primary" />
                        {customer.aiInteractions}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {customer.lastContact}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedCustomer(customer)}>
                              <Eye className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Chi tiết khách hàng</DialogTitle>
                            </DialogHeader>
                            {selectedCustomer && <CustomerDetail customer={selectedCustomer} />}
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

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Không tìm thấy khách hàng nào</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
