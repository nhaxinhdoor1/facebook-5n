"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Bot, MessageSquare, Play, Pause, Copy, Download, Upload } from "lucide-react"
import { ScriptFlowBuilder } from "@/components/script-flow-builder"
import { ChatGPTSettings } from "@/components/chatgpt-settings"

const mockScripts = [
  {
    id: 1,
    name: "Chào hỏi khách hàng",
    description: "Kịch bản chào hỏi và giới thiệu sản phẩm",
    status: "active",
    type: "rule-based",
    aiEnabled: true,
    lastModified: "2024-01-15",
    triggers: ["xin chào", "hello", "hi"],
    responses: 3,
  },
  {
    id: 2,
    name: "Hỗ trợ kỹ thuật",
    description: "Giải đáp các vấn đề kỹ thuật phổ biến",
    status: "active",
    type: "hybrid",
    aiEnabled: true,
    lastModified: "2024-01-14",
    triggers: ["lỗi", "không hoạt động", "sự cố"],
    responses: 8,
  },
  {
    id: 3,
    name: "Thông tin sản phẩm",
    description: "Cung cấp thông tin chi tiết về sản phẩm",
    status: "draft",
    type: "ai-first",
    aiEnabled: true,
    lastModified: "2024-01-13",
    triggers: ["sản phẩm", "giá cả", "tính năng"],
    responses: 5,
  },
]

export function ChatbotManagement() {
  const [selectedScript, setSelectedScript] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("scripts")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scripts">Kịch bản</TabsTrigger>
          <TabsTrigger value="flow-builder">Trình tạo luồng</TabsTrigger>
          <TabsTrigger value="ai-settings">Cài đặt AI</TabsTrigger>
        </TabsList>

        <TabsContent value="scripts" className="space-y-6">
          {/* Script Management Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Tạo kịch bản mới
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Tìm kiếm kịch bản..." className="w-64" />
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                  <SelectItem value="inactive">Tạm dừng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Scripts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockScripts.map((script) => (
              <Card key={script.id} className="bg-card border-border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg text-card-foreground">{script.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{script.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant={
                          script.status === "active" ? "default" : script.status === "draft" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {script.status === "active" ? "Hoạt động" : script.status === "draft" ? "Nháp" : "Tạm dừng"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Loại:</span>
                    <div className="flex items-center gap-2">
                      {script.type === "rule-based" && <MessageSquare className="h-4 w-4 text-chart-2" />}
                      {script.type === "hybrid" && <Bot className="h-4 w-4 text-chart-3" />}
                      {script.type === "ai-first" && <Bot className="h-4 w-4 text-chart-1" />}
                      <span className="capitalize">
                        {script.type === "rule-based" ? "Quy tắc" : script.type === "hybrid" ? "Kết hợp" : "AI ưu tiên"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI tích hợp:</span>
                    <Switch checked={script.aiEnabled} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Từ khóa kích hoạt:</span>
                    <span className="text-card-foreground">{script.triggers.length}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Phản hồi:</span>
                    <span className="text-card-foreground">{script.responses}</span>
                  </div>

                  <div className="text-xs text-muted-foreground">Cập nhật: {script.lastModified}</div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="h-3 w-3 mr-1" />
                      Chỉnh sửa
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Copy className="h-3 w-3 mr-1" />
                      Sao chép
                    </Button>
                    <Button size="sm" variant="outline">
                      {script.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Script Editor */}
          {selectedScript && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Chỉnh sửa kịch bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="script-name">Tên kịch bản</Label>
                      <Input id="script-name" placeholder="Nhập tên kịch bản..." />
                    </div>
                    <div>
                      <Label htmlFor="script-desc">Mô tả</Label>
                      <Textarea id="script-desc" placeholder="Mô tả kịch bản..." />
                    </div>
                    <div>
                      <Label htmlFor="script-type">Loại kịch bản</Label>
                      <Select defaultValue="hybrid">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rule-based">Quy tắc cứng</SelectItem>
                          <SelectItem value="hybrid">Kết hợp AI</SelectItem>
                          <SelectItem value="ai-first">AI ưu tiên</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="triggers">Từ khóa kích hoạt</Label>
                      <Textarea id="triggers" placeholder="Nhập từ khóa, cách nhau bằng dấu phẩy..." />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ai-enabled">Kích hoạt AI</Label>
                      <Switch id="ai-enabled" />
                    </div>
                    <div>
                      <Label htmlFor="ai-threshold">Ngưỡng chuyển sang AI (%)</Label>
                      <Input id="ai-threshold" type="number" placeholder="75" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="flow-builder">
          <ScriptFlowBuilder />
        </TabsContent>

        <TabsContent value="ai-settings">
          <ChatGPTSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
