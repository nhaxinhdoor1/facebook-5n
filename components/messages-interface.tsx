"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  MessageSquare,
  Bot,
  User,
  Brain,
  Clock,
  Zap,
  FileText,
  Target,
  Activity,
  Send,
  Mic,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface Conversation {
  id: string
  customerName: string
  customerAvatar: string
  lastMessage: string
  timestamp: string
  status: "active" | "waiting" | "resolved"
  unreadCount: number
  aiHandled: boolean
  priority: "low" | "medium" | "high"
  source: "facebook" | "website" | "zalo"
}

interface Message {
  id: string
  sender: "customer" | "ai" | "human"
  content: string
  timestamp: string
  confidence?: number
  aiModel?: string
  responseTime?: number
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    customerName: "Nguyễn Văn An",
    customerAvatar: "/diverse-avatars.png",
    lastMessage: "Tôi muốn tìm hiểu về gói Premium",
    timestamp: "2 phút trước",
    status: "active",
    unreadCount: 2,
    aiHandled: true,
    priority: "high",
    source: "facebook",
  },
  {
    id: "2",
    customerName: "Trần Thị Bình",
    customerAvatar: "/diverse-avatars.png",
    lastMessage: "Cảm ơn bạn đã hỗ trợ!",
    timestamp: "5 phút trước",
    status: "resolved",
    unreadCount: 0,
    aiHandled: false,
    priority: "medium",
    source: "website",
  },
  {
    id: "3",
    customerName: "Lê Minh Cường",
    customerAvatar: "/diverse-avatars.png",
    lastMessage: "Tôi gặp vấn đề với thanh toán",
    timestamp: "10 phút trước",
    status: "waiting",
    unreadCount: 3,
    aiHandled: false,
    priority: "high",
    source: "zalo",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "customer",
    content: "Xin chào, tôi muốn tìm hiểu về gói Premium của các bạn",
    timestamp: "14:30",
  },
  {
    id: "2",
    sender: "ai",
    content:
      "Xin chào! Cảm ơn bạn đã quan tâm đến gói Premium. Gói Premium bao gồm đầy đủ tính năng AI, hỗ trợ 24/7 và tích hợp không giới hạn với giá 2.999.000 VNĐ/tháng. Bạn có muốn tôi gửi bảng so sánh chi tiết không?",
    timestamp: "14:31",
    confidence: 95,
    aiModel: "GPT-4",
    responseTime: 1.2,
  },
  {
    id: "3",
    sender: "customer",
    content: "Có thể dùng thử miễn phí không?",
    timestamp: "14:32",
  },
  {
    id: "4",
    sender: "ai",
    content:
      "Có, chúng tôi cung cấp gói dùng thử 14 ngày miễn phí với đầy đủ tính năng. Bạn chỉ cần đăng ký với email và có thể bắt đầu ngay. Tôi có thể hỗ trợ bạn đăng ký ngay bây giờ không?",
    timestamp: "14:33",
    confidence: 88,
    aiModel: "GPT-4",
    responseTime: 0.9,
  },
]

export function MessagesInterface() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [aiEnabled, setAiEnabled] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      {/* AI Status and Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-chart-1" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">89.3%</p>
                <p className="text-sm text-muted-foreground">AI Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-chart-2" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">1.2s</p>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-chart-3" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">247</p>
                <p className="text-sm text-muted-foreground">Active Chats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-chart-4" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">4.8/5</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="conversations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conversations">Hội thoại</TabsTrigger>
          <TabsTrigger value="ai-config">Cấu hình AI</TabsTrigger>
          <TabsTrigger value="training">Huấn luyện AI</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-card-foreground">Danh sách hội thoại</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Input
                  placeholder="Tìm kiếm hội thoại..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mt-2"
                />
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {mockConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-muted transition-colors ${
                        selectedConversation?.id === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={conversation.customerAvatar || "/placeholder.svg"}
                          alt={conversation.customerName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-card-foreground truncate">{conversation.customerName}</p>
                            <div className="flex items-center gap-1">
                              {conversation.aiHandled && <Bot className="h-3 w-3 text-chart-1" />}
                              {conversation.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            <div className="flex items-center gap-1">
                              <Badge
                                className={`text-xs ${
                                  conversation.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : conversation.status === "waiting"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {conversation.status === "active"
                                  ? "Đang xử lý"
                                  : conversation.status === "waiting"
                                    ? "Chờ xử lý"
                                    : "Đã giải quyết"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {selectedConversation && (
                      <>
                        <img
                          src={selectedConversation.customerAvatar || "/placeholder.svg"}
                          alt={selectedConversation.customerName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-card-foreground">{selectedConversation.customerName}</p>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`text-xs ${
                                selectedConversation.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : selectedConversation.status === "waiting"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {selectedConversation.status === "active"
                                ? "Đang xử lý"
                                : selectedConversation.status === "waiting"
                                  ? "Chờ xử lý"
                                  : "Đã giải quyết"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {selectedConversation.source.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="ai-toggle" className="text-sm">
                        AI Auto
                      </Label>
                      <Switch id="ai-toggle" checked={aiEnabled} onCheckedChange={setAiEnabled} />
                    </div>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Messages */}
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                  {mockMessages.map((message) => (
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
                            {message.sender === "customer"
                              ? "Khách hàng"
                              : message.sender === "ai"
                                ? `AI (${message.aiModel})`
                                : "Nhân viên"}
                          </span>
                          {message.confidence && <span className="text-xs opacity-75">({message.confidence}%)</span>}
                          {message.responseTime && (
                            <span className="text-xs opacity-75">({message.responseTime}s)</span>
                          )}
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-75 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-config" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Response Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Brain className="h-5 w-5" />
                  Cấu hình phản hồi AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Mô hình AI</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (Chất lượng cao)</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5 (Nhanh, tiết kiệm)</SelectItem>
                      <SelectItem value="claude">Claude (Phân tích sâu)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Giọng điệu thương hiệu</Label>
                  <Select defaultValue="friendly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Thân thiện, gần gũi</SelectItem>
                      <SelectItem value="professional">Chuyên nghiệp, trang trọng</SelectItem>
                      <SelectItem value="casual">Thoải mái, trẻ trung</SelectItem>
                      <SelectItem value="formal">Trang trọng, lịch sự</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Ngành nghề</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Công nghệ</SelectItem>
                      <SelectItem value="finance">Tài chính</SelectItem>
                      <SelectItem value="healthcare">Y tế</SelectItem>
                      <SelectItem value="education">Giáo dục</SelectItem>
                      <SelectItem value="retail">Bán lẻ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Độ tin cậy tối thiểu (%)</Label>
                  <Input type="number" defaultValue="85" min="0" max="100" />
                  <p className="text-xs text-muted-foreground mt-1">AI chỉ phản hồi khi độ tin cậy &gt;= giá trị này</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Thời gian phản hồi tối đa (giây)</Label>
                  <Input type="number" defaultValue="5" min="1" max="30" />
                </div>
              </CardContent>
            </Card>

            {/* Context and Memory Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Activity className="h-5 w-5" />
                  Bộ nhớ hội thoại
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Ghi nhớ ngữ cảnh</Label>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label className="text-sm font-medium">Số tin nhắn ghi nhớ</Label>
                  <Input type="number" defaultValue="10" min="1" max="50" />
                  <p className="text-xs text-muted-foreground mt-1">Số tin nhắn trước đó AI sẽ tham khảo</p>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Nhận diện khách hàng cũ</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Tự động phân loại chủ đề</Label>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label className="text-sm font-medium">Prompt hệ thống</Label>
                  <Textarea
                    placeholder="Nhập prompt hệ thống để định hướng AI..."
                    defaultValue="Bạn là trợ lý AI chuyên nghiệp, thân thiện và hữu ích. Luôn trả lời bằng tiếng Việt và cung cấp thông tin chính xác về sản phẩm/dịch vụ."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Training Data Management */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <FileText className="h-5 w-5" />
                  Dữ liệu huấn luyện
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Kéo thả file hoặc click để tải lên</p>
                  <p className="text-xs text-muted-foreground">Hỗ trợ: PDF, DOC, TXT, CSV (tối đa 10MB)</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Chọn file
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">FAQ_SanPham.pdf</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Button variant="ghost" size="sm">
                        Xóa
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">ThongTin_DichVu.docx</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <Button variant="ghost" size="sm">
                        Xử lý lại
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training Status and Performance */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Zap className="h-5 w-5" />
                  Trạng thái huấn luyện
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tài liệu đã xử lý</span>
                    <span className="text-sm font-medium">15/20</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-card-foreground">2,847</p>
                    <p className="text-xs text-muted-foreground">Câu hỏi đã học</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-card-foreground">94.2%</p>
                    <p className="text-xs text-muted-foreground">Độ chính xác</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Cập nhật tự động</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Học từ hội thoại mới</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cải thiện từ feedback</span>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Bắt đầu huấn luyện lại
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
