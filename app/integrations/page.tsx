import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Users,
  Activity,
  ExternalLink,
  Webhook,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"

const channels = [
  {
    id: "facebook",
    name: "Facebook Messenger",
    icon: "📘",
    status: "connected",
    users: 12450,
    messages: 8920,
    description: "Kết nối với Facebook Page để nhận và gửi tin nhắn",
    lastSync: "2 phút trước",
  },
  {
    id: "zalo",
    name: "Zalo OA",
    icon: "💬",
    status: "connected",
    users: 8760,
    messages: 5430,
    description: "Tích hợp với Zalo Official Account",
    lastSync: "5 phút trước",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: "📱",
    status: "disconnected",
    users: 0,
    messages: 0,
    description: "Kết nối với WhatsApp Business API",
    lastSync: "Chưa kết nối",
  },
  {
    id: "telegram",
    name: "Telegram Bot",
    icon: "✈️",
    status: "pending",
    users: 0,
    messages: 0,
    description: "Tích hợp với Telegram Bot API",
    lastSync: "Đang thiết lập",
  },
  {
    id: "website",
    name: "Website Chat Widget",
    icon: "🌐",
    status: "connected",
    users: 3240,
    messages: 2180,
    description: "Widget chat tích hợp vào website",
    lastSync: "1 phút trước",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "connected":
      return "bg-green-100 text-green-800"
    case "disconnected":
      return "bg-red-100 text-red-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "disconnected":
      return <XCircle className="w-4 h-4 text-red-600" />
    case "pending":
      return <AlertCircle className="w-4 h-4 text-yellow-600" />
    default:
      return <AlertCircle className="w-4 h-4 text-gray-600" />
  }
}

export default function IntegrationsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tích hợp đa kênh</h1>
              <p className="text-gray-600 mt-1">Quản lý kết nối với các nền tảng nhắn tin khác nhau</p>
            </div>
            <Button>
              <ExternalLink className="w-4 h-4 mr-2" />
              Thêm kênh mới
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kênh đã kết nối</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 kênh đang thiết lập</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,450</div>
                <p className="text-xs text-muted-foreground">Trên tất cả các kênh</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tin nhắn hôm nay</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16,530</div>
                <p className="text-xs text-muted-foreground">+12% so với hôm qua</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tỷ lệ phản hồi</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">Trung bình tất cả kênh</p>
              </CardContent>
            </Card>
          </div>

          {/* Channel Management */}
          <Tabs defaultValue="channels" className="space-y-6">
            <TabsList>
              <TabsTrigger value="channels">Quản lý kênh</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt chung</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {channels.map((channel) => (
                  <Card key={channel.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{channel.icon}</span>
                          <div>
                            <CardTitle className="text-lg">{channel.name}</CardTitle>
                            <CardDescription>{channel.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(channel.status)}
                          <Badge className={getStatusColor(channel.status)}>
                            {channel.status === "connected"
                              ? "Đã kết nối"
                              : channel.status === "pending"
                                ? "Đang thiết lập"
                                : "Chưa kết nối"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {channel.status === "connected" && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Người dùng:</span>
                            <div className="font-semibold">{channel.users.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Tin nhắn:</span>
                            <div className="font-semibold">{channel.messages.toLocaleString()}</div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Đồng bộ lần cuối: {channel.lastSync}</span>
                        <div className="flex gap-2">
                          {channel.status === "connected" ? (
                            <>
                              <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4 mr-1" />
                                Cài đặt
                              </Button>
                              <Button variant="outline" size="sm">
                                Ngắt kết nối
                              </Button>
                            </>
                          ) : (
                            <Button size="sm">{channel.status === "pending" ? "Hoàn tất thiết lập" : "Kết nối"}</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt chung</CardTitle>
                  <CardDescription>Cấu hình áp dụng cho tất cả các kênh</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Tự động phân phối tin nhắn</Label>
                      <div className="text-sm text-gray-500">
                        Phân phối tin nhắn đến nhân viên có sẵn khi AI không thể xử lý
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Đồng bộ dữ liệu khách hàng</Label>
                      <div className="text-sm text-gray-500">Tự động đồng bộ thông tin khách hàng giữa các kênh</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Thông báo real-time</Label>
                      <div className="text-sm text-gray-500">
                        Nhận thông báo ngay khi có tin nhắn mới từ bất kỳ kênh nào
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response-time">Thời gian phản hồi tối đa (giây)</Label>
                    <Input id="response-time" type="number" defaultValue="30" className="w-32" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-channel">Kênh dự phòng</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Email thông báo</option>
                      <option>SMS</option>
                      <option>Slack</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quản lý Webhooks</CardTitle>
                  <CardDescription>Cấu hình webhook endpoints cho tích hợp với hệ thống bên ngoài</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        name: "Webhook tin nhắn mới",
                        url: "https://api.yoursite.com/webhooks/messages",
                        status: "active",
                      },
                      {
                        name: "Webhook khách hàng mới",
                        url: "https://api.yoursite.com/webhooks/customers",
                        status: "active",
                      },
                      {
                        name: "Webhook báo cáo hàng ngày",
                        url: "https://api.yoursite.com/webhooks/reports",
                        status: "inactive",
                      },
                    ].map((webhook, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Webhook className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="font-medium">{webhook.name}</div>
                            <div className="text-sm text-gray-500">{webhook.url}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                            {webhook.status === "active" ? "Hoạt động" : "Tạm dừng"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Thêm webhook mới
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
