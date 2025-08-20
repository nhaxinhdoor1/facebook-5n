"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Key,
  Settings,
  TestTube,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react"

export function ChatGPTSettings() {
  const [apiKey, setApiKey] = useState("sk-************************************")
  const [model, setModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([1000])
  const [isConnected, setIsConnected] = useState(true)
  const [autoMode, setAutoMode] = useState(true)

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Cài đặt ChatGPT</h2>
          <p className="text-muted-foreground">Cấu hình tích hợp AI và mức độ tự động hóa</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
            {isConnected ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
            {isConnected ? "Đã kết nối" : "Mất kết nối"}
          </Badge>
          <Button variant="outline">
            <TestTube className="h-4 w-4 mr-2" />
            Kiểm tra kết nối
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Configuration */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Key className="h-5 w-5" />
              Cấu hình API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Nhập OpenAI API Key..."
                />
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="model">Mô hình AI</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4 (Khuyến nghị)</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-3.5-turbo-16k">GPT-3.5 Turbo 16K</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="organization">Organization ID (Tùy chọn)</Label>
              <Input id="organization" placeholder="org-xxxxxxxxxxxxxxxx" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-retry">Tự động thử lại khi lỗi</Label>
              <Switch id="auto-retry" />
            </div>
          </CardContent>
        </Card>

        {/* AI Behavior Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Bot className="h-5 w-5" />
              Hành vi AI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="temperature">Độ sáng tạo (Temperature): {temperature[0]}</Label>
              <Slider
                id="temperature"
                min={0}
                max={2}
                step={0.1}
                value={temperature}
                onValueChange={setTemperature}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">0 = Chính xác, 2 = Sáng tạo</p>
            </div>

            <div>
              <Label htmlFor="max-tokens">Độ dài tối đa (Tokens): {maxTokens[0]}</Label>
              <Slider
                id="max-tokens"
                min={100}
                max={4000}
                step={100}
                value={maxTokens}
                onValueChange={setMaxTokens}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Giới hạn độ dài phản hồi</p>
            </div>

            <div>
              <Label htmlFor="response-time">Thời gian phản hồi tối đa (giây)</Label>
              <Input id="response-time" type="number" defaultValue="30" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="context-memory">Nhớ ngữ cảnh hội thoại</Label>
              <Switch id="context-memory" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Automation Level */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Settings className="h-5 w-5" />
              Mức độ tự động hóa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="automation-mode">Chế độ hoạt động</Label>
              <Select defaultValue="hybrid">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Thủ công - Chỉ khi được yêu cầu</SelectItem>
                  <SelectItem value="hybrid">Kết hợp - Rule-based + AI</SelectItem>
                  <SelectItem value="ai-first">AI ưu tiên - Tự động trả lời</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="confidence-threshold">Ngưỡng tin cậy (%)</Label>
              <Input id="confidence-threshold" type="number" defaultValue="75" />
              <p className="text-xs text-muted-foreground mt-1">AI chỉ trả lời khi độ tin cậy trên ngưỡng này</p>
            </div>

            <div>
              <Label htmlFor="fallback-action">Hành động dự phòng</Label>
              <Select defaultValue="human">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="human">Chuyển cho nhân viên</SelectItem>
                  <SelectItem value="default">Tin nhắn mặc định</SelectItem>
                  <SelectItem value="retry">Thử lại với AI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-learn">Tự động học từ phản hồi</Label>
              <Switch id="auto-learn" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System Prompt */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <MessageSquare className="h-5 w-5" />
              Prompt hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="system-prompt">Hướng dẫn cho AI</Label>
              <Textarea
                id="system-prompt"
                rows={6}
                defaultValue="Bạn là trợ lý AI chuyên nghiệp của công ty. Hãy trả lời một cách thân thiện, chính xác và hữu ích. Luôn sử dụng tiếng Việt và giữ giọng điệu chuyên nghiệp nhưng gần gũi."
                placeholder="Nhập hướng dẫn cho AI..."
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

            <div className="flex items-center justify-between">
              <Label htmlFor="use-company-data">Sử dụng dữ liệu công ty</Label>
              <Switch id="use-company-data" />
            </div>
          </CardContent>
        </Card>

        {/* Performance Monitoring */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Clock className="h-5 w-5" />
              Giám sát hiệu suất
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-1">1.2s</div>
                <div className="text-xs text-muted-foreground">Thời gian phản hồi TB</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-2">94.5%</div>
                <div className="text-xs text-muted-foreground">Tỷ lệ thành công</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-3">$12.45</div>
                <div className="text-xs text-muted-foreground">Chi phí hôm nay</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-chart-4">2,847</div>
                <div className="text-xs text-muted-foreground">Requests hôm nay</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="cost-alerts">Cảnh báo chi phí</Label>
              <Switch id="cost-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Đặt lại mặc định</Button>
        <Button className="bg-primary text-primary-foreground">
          <Save className="h-4 w-4 mr-2" />
          Lưu cài đặt
        </Button>
      </div>
    </div>
  )
}
