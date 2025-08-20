import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { MessageSquare, Users, Bot, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

const messageData = [
  { name: "T2", messages: 1200, ai_responses: 800 },
  { name: "T3", messages: 1900, ai_responses: 1300 },
  { name: "T4", messages: 800, ai_responses: 600 },
  { name: "T5", messages: 2100, ai_responses: 1500 },
  { name: "T6", messages: 1600, ai_responses: 1100 },
  { name: "T7", messages: 2400, ai_responses: 1800 },
  { name: "CN", messages: 1800, ai_responses: 1200 },
]

const responseData = [
  { name: "ChatGPT", value: 65, color: "var(--chart-1)" },
  { name: "Rule-based", value: 25, color: "var(--chart-2)" },
  { name: "Human", value: 10, color: "var(--chart-3)" },
]

const satisfactionData = [
  { time: "00:00", satisfaction: 85 },
  { time: "04:00", satisfaction: 82 },
  { time: "08:00", satisfaction: 88 },
  { time: "12:00", satisfaction: 91 },
  { time: "16:00", satisfaction: 89 },
  { time: "20:00", satisfaction: 87 },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tổng tin nhắn hôm nay</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-4">+12.5%</span> so với hôm qua
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Khách hàng tương tác</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-4">+8.2%</span> so với tuần trước
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Phản hồi AI thành công</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">89.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-4">+2.1%</span> cải thiện
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Tỷ lệ hài lòng</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">4.7/5</div>
            <p className="text-xs text-muted-foreground">Từ 892 đánh giá</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Volume Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Lượng tin nhắn theo ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="messages" fill="var(--chart-1)" name="Tổng tin nhắn" />
                <Bar dataKey="ai_responses" fill="var(--chart-2)" name="Phản hồi AI" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Type Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Phân bố loại phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={responseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {responseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {responseData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Satisfaction Trend and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Satisfaction Trend */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Xu hướng độ hài lòng (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" domain={[75, 95]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="var(--chart-4)"
                  strokeWidth={3}
                  dot={{ fill: "var(--chart-4)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts and Notifications */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Cảnh báo & Thông báo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <CheckCircle className="h-5 w-5 text-chart-4 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Lead tiềm năng mới</p>
                <p className="text-xs text-muted-foreground">3 khách hàng quan tâm sản phẩm</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <AlertTriangle className="h-5 w-5 text-chart-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-card-foreground">API ChatGPT chậm</p>
                <p className="text-xs text-muted-foreground">Thời gian phản hồi tăng 15%</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
              <Bot className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Cập nhật kịch bản</p>
                <p className="text-xs text-muted-foreground">5 kịch bản mới được thêm</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
