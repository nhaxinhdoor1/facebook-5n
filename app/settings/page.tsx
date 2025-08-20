import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Bot,
  Bell,
  Shield,
  Database,
  Globe,
  Palette,
  Save,
  RefreshCw,
  Download,
  Upload,
  Key,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
              <p className="text-gray-600 mt-1">Cấu hình và tùy chỉnh hệ thống chatbot</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Đặt lại mặc định
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Lưu tất cả
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">Chung</TabsTrigger>
              <TabsTrigger value="ai">AI & ChatGPT</TabsTrigger>
              <TabsTrigger value="notifications">Thông báo</TabsTrigger>
              <TabsTrigger value="security">Bảo mật</TabsTrigger>
              <TabsTrigger value="integrations">Tích hợp</TabsTrigger>
              <TabsTrigger value="appearance">Giao diện</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Cài đặt cơ bản
                    </CardTitle>
                    <CardDescription>Cấu hình thông tin cơ bản của hệ thống</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="company-name">Tên công ty</Label>
                      <Input id="company-name" defaultValue="Công ty ABC" />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://company.com" />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Múi giờ</Label>
                      <Select defaultValue="asia-ho-chi-minh">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia-ho-chi-minh">Việt Nam (UTC+7)</SelectItem>
                          <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                          <SelectItem value="america-new-york">New York (UTC-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Ngôn ngữ mặc định</Label>
                      <Select defaultValue="vi">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Cài đặt chat
                    </CardTitle>
                    <CardDescription>Cấu hình hành vi chatbot mặc định</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Tự động chào hỏi</Label>
                        <div className="text-sm text-gray-500">Gửi tin nhắn chào hỏi khi khách hàng bắt đầu chat</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Hiển thị typing indicator</Label>
                        <div className="text-sm text-gray-500">Hiển thị "đang nhập..." khi bot đang xử lý</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label htmlFor="response-delay">Độ trễ phản hồi (giây)</Label>
                      <Input id="response-delay" type="number" defaultValue="2" />
                    </div>
                    <div>
                      <Label htmlFor="session-timeout">Timeout phiên chat (phút)</Label>
                      <Input id="session-timeout" type="number" defaultValue="30" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Lưu trữ dữ liệu
                    </CardTitle>
                    <CardDescription>Cấu hình lưu trữ và sao lưu dữ liệu</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Tự động sao lưu</Label>
                        <div className="text-sm text-gray-500">Sao lưu dữ liệu hàng ngày</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label htmlFor="retention-days">Thời gian lưu trữ (ngày)</Label>
                      <Input id="retention-days" type="number" defaultValue="365" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Xuất dữ liệu
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Upload className="w-4 h-4 mr-2" />
                        Nhập dữ liệu
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Giờ làm việc
                    </CardTitle>
                    <CardDescription>Cấu hình giờ hoạt động của chatbot</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Hoạt động 24/7</Label>
                        <div className="text-sm text-gray-500">Chatbot hoạt động liên tục</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-time">Giờ bắt đầu</Label>
                        <Input id="start-time" type="time" defaultValue="08:00" />
                      </div>
                      <div>
                        <Label htmlFor="end-time">Giờ kết thúc</Label>
                        <Input id="end-time" type="time" defaultValue="18:00" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="off-hours-message">Tin nhắn ngoài giờ</Label>
                      <Textarea
                        id="off-hours-message"
                        defaultValue="Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong giờ làm việc (8:00-18:00)."
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* AI & ChatGPT Settings */}
            <TabsContent value="ai" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      Cấu hình API
                    </CardTitle>
                    <CardDescription>Cài đặt kết nối với ChatGPT API</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="openai-key">OpenAI API Key</Label>
                      <div className="flex gap-2">
                        <Input id="openai-key" type="password" defaultValue="sk-************************************" />
                        <Button variant="outline" size="icon">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="ai-model">Mô hình AI</Label>
                      <Select defaultValue="gpt-4">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4 (Khuyến nghị)</SelectItem>
                          <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Kích hoạt AI</Label>
                        <div className="text-sm text-gray-500">Sử dụng AI để trả lời tự động</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">94.5%</div>
                        <div className="text-xs text-gray-500">Tỷ lệ thành công</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">1.2s</div>
                        <div className="text-xs text-gray-500">Thời gian phản hồi</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      Hành vi AI
                    </CardTitle>
                    <CardDescription>Tùy chỉnh cách AI phản hồi</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="ai-temperature">Độ sáng tạo: 0.7</Label>
                      <input
                        type="range"
                        id="ai-temperature"
                        min="0"
                        max="2"
                        step="0.1"
                        defaultValue="0.7"
                        className="w-full mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Chính xác</span>
                        <span>Sáng tạo</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="max-tokens">Độ dài tối đa: 1000 tokens</Label>
                      <input
                        type="range"
                        id="max-tokens"
                        min="100"
                        max="4000"
                        step="100"
                        defaultValue="1000"
                        className="w-full mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confidence-threshold">Ngưỡng tin cậy (%)</Label>
                      <Input id="confidence-threshold" type="number" defaultValue="75" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Nhớ ngữ cảnh</Label>
                        <div className="text-sm text-gray-500">AI nhớ cuộc hội thoại trước đó</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Prompt hệ thống
                    </CardTitle>
                    <CardDescription>Hướng dẫn cho AI về cách trả lời</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="system-prompt">Prompt chính</Label>
                      <Textarea
                        id="system-prompt"
                        rows={6}
                        defaultValue="Bạn là trợ lý AI chuyên nghiệp của công ty. Hãy trả lời một cách thân thiện, chính xác và hữu ích. Luôn sử dụng tiếng Việt và giữ giọng điệu chuyên nghiệp nhưng gần gũi."
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand-context">Thông tin thương hiệu</Label>
                      <Textarea
                        id="brand-context"
                        rows={4}
                        placeholder="Thông tin về công ty, sản phẩm, dịch vụ để AI hiểu rõ ngữ cảnh..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Thông báo email
                    </CardTitle>
                    <CardDescription>Cấu hình thông báo qua email</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Tin nhắn mới</Label>
                        <div className="text-sm text-gray-500">Thông báo khi có tin nhắn mới từ khách hàng</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Báo cáo hàng ngày</Label>
                        <div className="text-sm text-gray-500">Gửi báo cáo tổng hợp hàng ngày</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cảnh báo lỗi hệ thống</Label>
                        <div className="text-sm text-gray-500">Thông báo khi có lỗi xảy ra</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label htmlFor="notification-email">Email nhận thông báo</Label>
                      <Input id="notification-email" type="email" defaultValue="admin@company.com" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Thông báo trong app
                    </CardTitle>
                    <CardDescription>Cấu hình thông báo trong ứng dụng</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Âm thanh thông báo</Label>
                        <div className="text-sm text-gray-500">Phát âm thanh khi có thông báo mới</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Thông báo desktop</Label>
                        <div className="text-sm text-gray-500">Hiển thị thông báo trên desktop</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Thông báo khách hàng VIP</Label>
                        <div className="text-sm text-gray-500">Ưu tiên thông báo từ khách hàng VIP</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Bảo mật tài khoản
                    </CardTitle>
                    <CardDescription>Cấu hình bảo mật cho tài khoản người dùng</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Xác thực 2 bước</Label>
                        <div className="text-sm text-gray-500">Bắt buộc xác thực 2 bước cho admin</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Tự động đăng xuất</Label>
                        <div className="text-sm text-gray-500">Đăng xuất sau thời gian không hoạt động</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label htmlFor="session-timeout-security">Thời gian timeout (phút)</Label>
                      <Input id="session-timeout-security" type="number" defaultValue="60" />
                    </div>
                    <div>
                      <Label htmlFor="password-policy">Chính sách mật khẩu</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Cơ bản (6+ ký tự)</SelectItem>
                          <SelectItem value="medium">Trung bình (8+ ký tự, số và chữ)</SelectItem>
                          <SelectItem value="high">Cao (12+ ký tự, số, chữ, ký tự đặc biệt)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Bảo mật dữ liệu
                    </CardTitle>
                    <CardDescription>Cấu hình bảo vệ dữ liệu khách hàng</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Mã hóa dữ liệu</Label>
                        <div className="text-sm text-gray-500">Mã hóa dữ liệu nhạy cảm</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Ẩn danh hóa</Label>
                        <div className="text-sm text-gray-500">Ẩn danh thông tin cá nhân trong logs</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Audit log</Label>
                        <div className="text-sm text-gray-500">Ghi lại tất cả hoạt động của người dùng</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label htmlFor="data-retention">Thời gian lưu trữ log (ngày)</Label>
                      <Input id="data-retention" type="number" defaultValue="90" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Integrations */}
            <TabsContent value="integrations" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      API & Webhooks
                    </CardTitle>
                    <CardDescription>Cấu hình tích hợp với hệ thống bên ngoài</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input id="api-endpoint" defaultValue="https://api.company.com/chatbot" />
                    </div>
                    <div>
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="https://your-site.com/webhook" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Kích hoạt webhook</Label>
                        <div className="text-sm text-gray-500">Gửi dữ liệu đến webhook khi có sự kiện</div>
                      </div>
                      <Switch />
                    </div>
                    <div>
                      <Label htmlFor="api-rate-limit">Giới hạn API (requests/phút)</Label>
                      <Input id="api-rate-limit" type="number" defaultValue="100" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      CRM Integration
                    </CardTitle>
                    <CardDescription>Tích hợp với hệ thống CRM</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="crm-type">Loại CRM</Label>
                      <Select defaultValue="none">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Không sử dụng</SelectItem>
                          <SelectItem value="salesforce">Salesforce</SelectItem>
                          <SelectItem value="hubspot">HubSpot</SelectItem>
                          <SelectItem value="pipedrive">Pipedrive</SelectItem>
                          <SelectItem value="custom">Tùy chỉnh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Đồng bộ khách hàng</Label>
                        <div className="text-sm text-gray-500">Tự động đồng bộ thông tin khách hàng</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Tạo lead tự động</Label>
                        <div className="text-sm text-gray-500">Tự động tạo lead từ cuộc hội thoại</div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appearance */}
            <TabsContent value="appearance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Giao diện
                    </CardTitle>
                    <CardDescription>Tùy chỉnh giao diện admin</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="theme">Chủ đề</Label>
                      <Select defaultValue="light">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Sáng</SelectItem>
                          <SelectItem value="dark">Tối</SelectItem>
                          <SelectItem value="auto">Tự động</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="primary-color">Màu chủ đạo</Label>
                      <div className="flex gap-2 mt-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-600"></div>
                        <div className="w-8 h-8 bg-green-500 rounded-full border"></div>
                        <div className="w-8 h-8 bg-purple-500 rounded-full border"></div>
                        <div className="w-8 h-8 bg-red-500 rounded-full border"></div>
                        <div className="w-8 h-8 bg-orange-500 rounded-full border"></div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sidebar-style">Kiểu sidebar</Label>
                      <Select defaultValue="fixed">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Cố định</SelectItem>
                          <SelectItem value="collapsible">Thu gọn được</SelectItem>
                          <SelectItem value="overlay">Overlay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat widget
                    </CardTitle>
                    <CardDescription>Tùy chỉnh giao diện chat widget</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="widget-position">Vị trí widget</Label>
                      <Select defaultValue="bottom-right">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bottom-right">Góc phải dưới</SelectItem>
                          <SelectItem value="bottom-left">Góc trái dưới</SelectItem>
                          <SelectItem value="top-right">Góc phải trên</SelectItem>
                          <SelectItem value="top-left">Góc trái trên</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="widget-color">Màu widget</Label>
                      <Input id="widget-color" type="color" defaultValue="#3b82f6" />
                    </div>
                    <div>
                      <Label htmlFor="welcome-message">Tin nhắn chào hỏi</Label>
                      <Textarea id="welcome-message" defaultValue="Xin chào! Tôi có thể giúp gì cho bạn?" rows={3} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
