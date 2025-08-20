"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Bot,
  TrendingUp,
  Star,
  Clock,
  Tag,
  Activity,
  BarChart3,
} from "lucide-react"

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
}

interface ChatMessage {
  id: string
  timestamp: string
  sender: "customer" | "ai" | "human"
  message: string
  confidence?: number
}

interface CustomerDetailProps {
  customer: Customer
}

const mockChatHistory: ChatMessage[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30",
    sender: "customer",
    message: "Xin chào, tôi muốn tìm hiểu về sản phẩm của các bạn",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:31",
    sender: "ai",
    message: "Xin chào! Cảm ơn bạn đã quan tâm đến sản phẩm của chúng tôi. Bạn muốn tìm hiểu về sản phẩm nào cụ thể?",
    confidence: 95,
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:32",
    sender: "customer",
    message: "Tôi quan tâm đến gói dịch vụ premium, giá cả như thế nào?",
  },
  {
    id: "4",
    timestamp: "2024-01-15 14:33",
    sender: "ai",
    message:
      "Gói Premium của chúng tôi có giá 2.999.000 VNĐ/tháng, bao gồm đầy đủ tính năng và hỗ trợ 24/7. Bạn có muốn tôi gửi bảng so sánh chi tiết các gói dịch vụ không?",
    confidence: 88,
  },
  {
    id: "5",
    timestamp: "2024-01-15 14:35",
    sender: "customer",
    message: "Có thể thử nghiệm miễn phí không?",
  },
  {
    id: "6",
    timestamp: "2024-01-15 14:36",
    sender: "human",
    message:
      "Chào anh, tôi là Minh từ bộ phận tư vấn. Chúng tôi có gói dùng thử 14 ngày miễn phí. Anh có muốn tôi hỗ trợ đăng ký không?",
  },
]

const mockActivities = [
  {
    id: "1",
    timestamp: "2024-01-15 14:36",
    type: "handoff",
    description: "Chuyển từ AI sang nhân viên tư vấn",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:30",
    type: "message",
    description: "Bắt đầu cuộc hội thoại mới",
  },
  {
    id: "3",
    timestamp: "2024-01-14 16:20",
    type: "lead_score",
    description: "Lead score tăng từ 70 lên 85",
  },
  {
    id: "4",
    timestamp: "2024-01-12 10:15",
    type: "first_contact",
    description: "Lần đầu tiên liên hệ qua Facebook",
  },
]

export function CustomerDetail({ customer }: CustomerDetailProps) {
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
        return "Lead nóng"
      case "warm":
        return "Lead ấm"
      case "cold":
        return "Lead lạnh"
      case "converted":
        return "Đã chuyển đổi"
      default:
        return "Không xác định"
    }
  }

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{customer.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {customer.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {customer.location}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getLeadStatusColor(customer.leadStatus)}>{getLeadStatusText(customer.leadStatus)}</Badge>
          <Button variant="outline" size="sm">
            Chỉnh sửa
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-chart-1" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{customer.leadScore}</p>
                <p className="text-sm text-muted-foreground">Lead Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-chart-2" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{customer.totalMessages}</p>
                <p className="text-sm text-muted-foreground">Tổng tin nhắn</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-chart-3" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{customer.aiInteractions}</p>
                <p className="text-sm text-muted-foreground">AI Tương tác</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-chart-4" />
              <div>
                <p className="text-lg font-bold text-card-foreground">{customer.lastContact}</p>
                <p className="text-sm text-muted-foreground">Lần cuối liên hệ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Tags */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Tag className="h-5 w-5" />
            Nhãn khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {customer.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
            <Button variant="outline" size="sm">
              + Thêm nhãn
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Lịch sử chat</TabsTrigger>
          <TabsTrigger value="activity">Hoạt động</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Lịch sử hội thoại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {mockChatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "customer"
                          ? "bg-primary text-primary-foreground"
                          : message.sender === "ai"
                            ? "bg-chart-1 text-white"
                            : "bg-chart-2 text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender === "customer" && <User className="h-3 w-3" />}
                        {message.sender === "ai" && <Bot className="h-3 w-3" />}
                        {message.sender === "human" && <MessageSquare className="h-3 w-3" />}
                        <span className="text-xs opacity-75">
                          {message.sender === "customer" ? "Khách hàng" : message.sender === "ai" ? "AI" : "Nhân viên"}
                        </span>
                        {message.confidence && <span className="text-xs opacity-75">({message.confidence}%)</span>}
                      </div>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-75 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Activity className="h-5 w-5" />
                Hoạt động gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">{activity.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <BarChart3 className="h-5 w-5" />
                  Xu hướng tương tác
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tần suất liên hệ</span>
                    <span className="text-sm font-medium">Cao</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Thời gian phản hồi TB</span>
                    <span className="text-sm font-medium">2.5 phút</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Độ hài lòng</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.8/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Khả năng chuyển đổi</span>
                    <span className="text-sm font-medium text-green-600">Cao (85%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Phân tích AI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Chủ đề quan tâm chính</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Giá cả</Badge>
                      <Badge variant="outline">Tính năng</Badge>
                      <Badge variant="outline">Hỗ trợ</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Cảm xúc tổng thể</p>
                    <Badge className="bg-green-100 text-green-800">Tích cực</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Giai đoạn mua hàng</p>
                    <Badge className="bg-orange-100 text-orange-800">Đang cân nhắc</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Khuyến nghị hành động</p>
                    <p className="text-sm text-card-foreground">
                      Gửi thông tin chi tiết về gói Premium và lịch hẹn demo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
