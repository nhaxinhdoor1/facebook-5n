"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Clock, UserCheck, AlertTriangle, Eye, UserPlus, RefreshCw, Activity } from "lucide-react"

interface ChatSession {
  id: string
  customerName: string
  customerEmail: string
  assignedAgent: string | null
  status: "waiting" | "active" | "resolved" | "escalated"
  priority: "low" | "medium" | "high" | "urgent"
  startTime: string
  lastActivity: string
  messageCount: number
  waitTime: number
  topic: string
  source: string
}

const mockSessions: ChatSession[] = [
  {
    id: "1",
    customerName: "Nguyễn Văn An",
    customerEmail: "an.nguyen@email.com",
    assignedAgent: "Lê Minh Agent",
    status: "active",
    priority: "high",
    startTime: "2024-01-15 14:30",
    lastActivity: "2024-01-15 14:35",
    messageCount: 8,
    waitTime: 2,
    topic: "Hỗ trợ kỹ thuật",
    source: "Facebook",
  },
  {
    id: "2",
    customerName: "Trần Thị Bình",
    customerEmail: "binh.tran@email.com",
    assignedAgent: null,
    status: "waiting",
    priority: "medium",
    startTime: "2024-01-15 14:32",
    lastActivity: "2024-01-15 14:33",
    messageCount: 3,
    waitTime: 5,
    topic: "Tư vấn sản phẩm",
    source: "Website",
  },
  {
    id: "3",
    customerName: "Lê Minh Cường",
    customerEmail: "cuong.le@email.com",
    assignedAgent: "Trần Thị Manager",
    status: "escalated",
    priority: "urgent",
    startTime: "2024-01-15 14:25",
    lastActivity: "2024-01-15 14:34",
    messageCount: 15,
    waitTime: 8,
    topic: "Khiếu nại",
    source: "Zalo",
  },
  {
    id: "4",
    customerName: "Phạm Thu Hương",
    customerEmail: "huong.pham@email.com",
    assignedAgent: "Lê Minh Agent",
    status: "resolved",
    priority: "low",
    startTime: "2024-01-15 14:20",
    lastActivity: "2024-01-15 14:30",
    messageCount: 6,
    waitTime: 1,
    topic: "Thông tin giá cả",
    source: "Facebook",
  },
]

const availableAgents = [
  { id: "1", name: "Lê Minh Agent", status: "online", activeChats: 2 },
  { id: "2", name: "Trần Thị Manager", status: "online", activeChats: 1 },
  { id: "3", name: "Nguyễn Văn Support", status: "busy", activeChats: 5 },
  { id: "4", name: "Phạm Thu Helper", status: "offline", activeChats: 0 },
]

export function SessionManager() {
  const [sessions, setSessions] = useState<ChatSession[]>(mockSessions)
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const getStatusColor = (status: ChatSession["status"]) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-500 text-white"
      case "active":
        return "bg-green-500 text-white"
      case "resolved":
        return "bg-blue-500 text-white"
      case "escalated":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusText = (status: ChatSession["status"]) => {
    switch (status) {
      case "waiting":
        return "Chờ xử lý"
      case "active":
        return "Đang xử lý"
      case "resolved":
        return "Đã giải quyết"
      case "escalated":
        return "Chuyển cấp cao"
      default:
        return "Không xác định"
    }
  }

  const getPriorityColor = (priority: ChatSession["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: ChatSession["priority"]) => {
    switch (priority) {
      case "low":
        return "Thấp"
      case "medium":
        return "Trung bình"
      case "high":
        return "Cao"
      case "urgent":
        return "Khẩn cấp"
      default:
        return "Không xác định"
    }
  }

  const filteredSessions = sessions.filter((session) => {
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    const matchesPriority = priorityFilter === "all" || session.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  const stats = {
    waiting: sessions.filter((s) => s.status === "waiting").length,
    active: sessions.filter((s) => s.status === "active").length,
    escalated: sessions.filter((s) => s.status === "escalated").length,
    avgWaitTime: Math.round(sessions.reduce((acc, s) => acc + s.waitTime, 0) / sessions.length),
  }

  return (
    <div className="space-y-6">
      {/* Session Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.waiting}</p>
                <p className="text-sm text-muted-foreground">Chờ xử lý</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Đang xử lý</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.escalated}</p>
                <p className="text-sm text-muted-foreground">Chuyển cấp cao</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stats.avgWaitTime}m</p>
                <p className="text-sm text-muted-foreground">Thời gian chờ TB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Sessions */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-card-foreground">Phiên chat</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="waiting">Chờ xử lý</SelectItem>
                    <SelectItem value="active">Đang xử lý</SelectItem>
                    <SelectItem value="resolved">Đã giải quyết</SelectItem>
                    <SelectItem value="escalated">Chuyển cấp cao</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ưu tiên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="urgent">Khẩn cấp</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ưu tiên</TableHead>
                    <TableHead>Chờ</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-card-foreground">{session.customerName}</p>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {session.assignedAgent ? (
                          <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{session.assignedAgent}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-muted-foreground">Chưa giao</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(session.status)}>{getStatusText(session.status)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(session.priority)}>
                          {getPriorityText(session.priority)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{session.waitTime}m</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedSession(session)}>
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Chi tiết phiên chat</DialogTitle>
                              </DialogHeader>
                              {selectedSession && <SessionDetail session={selectedSession} />}
                            </DialogContent>
                          </Dialog>
                          {!session.assignedAgent && (
                            <Button size="sm" variant="outline">
                              <UserPlus className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Available Agents */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Nhân viên trực tuyến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{agent.name}</p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            agent.status === "online"
                              ? "bg-green-500"
                              : agent.status === "busy"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                        <span className="text-xs text-muted-foreground capitalize">{agent.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-card-foreground">{agent.activeChats}</p>
                    <p className="text-xs text-muted-foreground">Chat đang xử lý</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SessionDetail({ session }: { session: ChatSession }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Khách hàng</Label>
          <p className="text-card-foreground">{session.customerName}</p>
          <p className="text-sm text-muted-foreground">{session.customerEmail}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Nhân viên được giao</Label>
          <p className="text-card-foreground">{session.assignedAgent || "Chưa giao"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Trạng thái</Label>
          <div className="mt-1">
            <Badge className={getStatusColor(session.status)}>{getStatusText(session.status)}</Badge>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium">Ưu tiên</Label>
          <div className="mt-1">
            <Badge className={getPriorityColor(session.priority)}>{getPriorityText(session.priority)}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="text-sm font-medium">Số tin nhắn</Label>
          <p className="text-2xl font-bold text-card-foreground">{session.messageCount}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Thời gian chờ</Label>
          <p className="text-2xl font-bold text-card-foreground">{session.waitTime}m</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Nguồn</Label>
          <p className="text-card-foreground">{session.source}</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Chủ đề</Label>
        <p className="text-card-foreground">{session.topic}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Bắt đầu</Label>
          <p className="text-sm text-muted-foreground">{session.startTime}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Hoạt động cuối</Label>
          <p className="text-sm text-muted-foreground">{session.lastActivity}</p>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button className="flex-1 bg-primary text-primary-foreground">Giao cho nhân viên</Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Chuyển cấp cao
        </Button>
      </div>
    </div>
  )
}

const getStatusColor = (status: ChatSession["status"]) => {
  switch (status) {
    case "waiting":
      return "bg-yellow-500 text-white"
    case "active":
      return "bg-green-500 text-white"
    case "resolved":
      return "bg-blue-500 text-white"
    case "escalated":
      return "bg-red-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

const getStatusText = (status: ChatSession["status"]) => {
  switch (status) {
    case "waiting":
      return "Chờ xử lý"
    case "active":
      return "Đang xử lý"
    case "resolved":
      return "Đã giải quyết"
    case "escalated":
      return "Chuyển cấp cao"
    default:
      return "Không xác định"
  }
}

const getPriorityColor = (priority: ChatSession["priority"]) => {
  switch (priority) {
    case "low":
      return "bg-gray-100 text-gray-800"
    case "medium":
      return "bg-blue-100 text-blue-800"
    case "high":
      return "bg-orange-100 text-orange-800"
    case "urgent":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityText = (priority: ChatSession["priority"]) => {
  switch (priority) {
    case "low":
      return "Thấp"
    case "medium":
      return "Trung bình"
    case "high":
      return "Cao"
    case "urgent":
      return "Khẩn cấp"
    default:
      return "Không xác định"
  }
}

function Label({ children, className, ...props }: any) {
  return (
    <label className={`text-sm font-medium text-foreground ${className || ""}`} {...props}>
      {children}
    </label>
  )
}
