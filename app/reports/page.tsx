import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, TrendingUp, TrendingDown, Users, MessageSquare, Bot, Clock } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const performanceData = [
  { month: "T1", messages: 2400, aiResponses: 1800, satisfaction: 85 },
  { month: "T2", messages: 1398, aiResponses: 1200, satisfaction: 88 },
  { month: "T3", messages: 9800, aiResponses: 7200, satisfaction: 92 },
  { month: "T4", messages: 3908, aiResponses: 2800, satisfaction: 89 },
  { month: "T5", messages: 4800, aiResponses: 3600, satisfaction: 94 },
  { month: "T6", messages: 3800, aiResponses: 2900, satisfaction: 91 },
]

const responseTypeData = [
  { name: "AI ChatGPT", value: 65, color: "#06b6d4" },
  { name: "Kịch bản tự động", value: 25, color: "#f59e0b" },
  { name: "Chuyển nhân viên", value: 10, color: "#ef4444" },
]

const customerSegmentData = [
  { segment: "Khách hàng tiềm năng cao", count: 245, conversion: 35 },
  { segment: "Khách hàng quan tâm", count: 189, conversion: 22 },
  { segment: "Khách hàng thông thường", count: 156, conversion: 12 },
  { segment: "Khách hàng mới", count: 98, conversion: 8 },
]

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Phân tích</h1>
              <p className="text-gray-600 mt-1">Theo dõi hiệu suất chatbot và phân tích dữ liệu khách hàng</p>
            </div>
            <div className="flex gap-3">
              <Select defaultValue="30days">
                <SelectTrigger className="w-40">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 ngày qua</SelectItem>
                  <SelectItem value="30days">30 ngày qua</SelectItem>
                  <SelectItem value="90days">90 ngày qua</SelectItem>
                  <SelectItem value="custom">Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng tin nhắn</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,856</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5% so với tháng trước
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Phản hồi AI</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,234</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2% so với tháng trước
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <div className="flex items-center text-xs text-red-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -3.1% so với tháng trước
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Thời gian phản hồi TB</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3s</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Cải thiện 15%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Xu hướng hiệu suất</CardTitle>
                <CardDescription>Tin nhắn và phản hồi AI theo thời gian</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="messages" stroke="#06b6d4" name="Tin nhắn" />
                    <Line type="monotone" dataKey="aiResponses" stroke="#f59e0b" name="Phản hồi AI" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Response Types */}
            <Card>
              <CardHeader>
                <CardTitle>Phân loại phản hồi</CardTitle>
                <CardDescription>Tỷ lệ các loại phản hồi chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={responseTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {responseTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Customer Segments */}
          <Card>
            <CardHeader>
              <CardTitle>Phân khúc khách hàng</CardTitle>
              <CardDescription>Phân tích khách hàng theo mức độ tiềm năng</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerSegmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#06b6d4" name="Số lượng khách hàng" />
                  <Bar dataKey="conversion" fill="#f59e0b" name="Tỷ lệ chuyển đổi (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất AI ChatGPT</CardTitle>
                <CardDescription>Phân tích chi tiết về AI responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Độ chính xác phản hồi</span>
                  <Badge variant="secondary">94.2%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Mức độ hài lòng khách hàng</span>
                  <Badge variant="secondary">4.6/5.0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Tỷ lệ chuyển nhân viên</span>
                  <Badge variant="outline">8.3%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Chi phí API trung bình</span>
                  <Badge variant="outline">$0.023/tin nhắn</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Scripts */}
            <Card>
              <CardHeader>
                <CardTitle>Kịch bản hiệu quả nhất</CardTitle>
                <CardDescription>Top 5 kịch bản có tỷ lệ thành công cao</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Chào hỏi khách hàng", success: 98.5, usage: 1250 },
                  { name: "Hỗ trợ sản phẩm", success: 94.2, usage: 890 },
                  { name: "Thông tin giá cả", success: 91.8, usage: 756 },
                  { name: "Đặt lịch hẹn", success: 89.3, usage: 623 },
                  { name: "Khiếu nại dịch vụ", success: 87.1, usage: 445 },
                ].map((script, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{script.name}</div>
                      <div className="text-xs text-gray-500">{script.usage} lần sử dụng</div>
                    </div>
                    <Badge variant="secondary">{script.success}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
