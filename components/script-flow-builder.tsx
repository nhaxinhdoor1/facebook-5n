"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MessageSquare, Bot, Settings, Trash2, Move, Copy } from "lucide-react"

interface FlowNode {
  id: string
  type: "trigger" | "condition" | "response" | "ai-handoff"
  title: string
  content: string
  position: { x: number; y: number }
  connections: string[]
}

const mockFlowNodes: FlowNode[] = [
  {
    id: "1",
    type: "trigger",
    title: "Khách hàng gửi tin nhắn",
    content: 'Từ khóa: "xin chào", "hello"',
    position: { x: 100, y: 100 },
    connections: ["2"],
  },
  {
    id: "2",
    type: "condition",
    title: "Kiểm tra điều kiện",
    content: "Khách hàng mới hay cũ?",
    position: { x: 300, y: 100 },
    connections: ["3", "4"],
  },
  {
    id: "3",
    type: "response",
    title: "Chào khách hàng mới",
    content: "Xin chào! Chào mừng bạn đến với dịch vụ của chúng tôi.",
    position: { x: 500, y: 50 },
    connections: ["5"],
  },
  {
    id: "4",
    type: "response",
    title: "Chào khách hàng cũ",
    content: "Xin chào! Rất vui được gặp lại bạn.",
    position: { x: 500, y: 150 },
    connections: ["5"],
  },
  {
    id: "5",
    type: "ai-handoff",
    title: "Chuyển sang AI",
    content: "Nếu câu hỏi phức tạp, chuyển cho ChatGPT xử lý",
    position: { x: 700, y: 100 },
    connections: [],
  },
]

export function ScriptFlowBuilder() {
  const [nodes, setNodes] = useState<FlowNode[]>(mockFlowNodes)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const getNodeIcon = (type: FlowNode["type"]) => {
    switch (type) {
      case "trigger":
        return <MessageSquare className="h-4 w-4" />
      case "condition":
        return <Settings className="h-4 w-4" />
      case "response":
        return <MessageSquare className="h-4 w-4" />
      case "ai-handoff":
        return <Bot className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getNodeColor = (type: FlowNode["type"]) => {
    switch (type) {
      case "trigger":
        return "bg-chart-1 text-white"
      case "condition":
        return "bg-chart-3 text-white"
      case "response":
        return "bg-chart-2 text-white"
      case "ai-handoff":
        return "bg-chart-4 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Flow Builder Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trình tạo luồng hội thoại</h2>
          <p className="text-muted-foreground">Kéo thả để tạo luồng hội thoại tự động</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Sao chép luồng
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Thêm nút
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Node Palette */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Thành phần</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Kích hoạt</Label>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Tin nhắn đến
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Điều kiện</Label>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Kiểm tra điều kiện
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Phản hồi</Label>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Tin nhắn trả lời
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">AI</Label>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                <Bot className="h-4 w-4 mr-2" />
                Chuyển sang AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Flow Canvas */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Luồng hội thoại</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted/20 rounded-lg p-6 min-h-96 overflow-auto">
              {/* Flow Nodes */}
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute w-48 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedNode === node.id ? "border-primary shadow-lg" : "border-border"
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                  }}
                  onClick={() => setSelectedNode(node.id)}
                >
                  <div className={`flex items-center gap-2 p-2 rounded-md mb-2 ${getNodeColor(node.type)}`}>
                    {getNodeIcon(node.type)}
                    <span className="text-sm font-medium">{node.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{node.content}</p>

                  {/* Connection points */}
                  {node.connections.length > 0 && (
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                    </div>
                  )}
                </div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 pointer-events-none">
                {nodes.map((node) =>
                  node.connections.map((connectionId) => {
                    const targetNode = nodes.find((n) => n.id === connectionId)
                    if (!targetNode) return null

                    const startX = node.position.x + 192 // node width
                    const startY = node.position.y + 40 // node height / 2
                    const endX = targetNode.position.x
                    const endY = targetNode.position.y + 40

                    return (
                      <line
                        key={`${node.id}-${connectionId}`}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="var(--primary)"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    )
                  }),
                )}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--primary)" />
                  </marker>
                </defs>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Node Properties */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Thuộc tính</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                {(() => {
                  const node = nodes.find((n) => n.id === selectedNode)
                  if (!node) return null

                  return (
                    <>
                      <div>
                        <Label htmlFor="node-title">Tiêu đề</Label>
                        <Input
                          id="node-title"
                          value={node.title}
                          onChange={(e) => {
                            setNodes(nodes.map((n) => (n.id === selectedNode ? { ...n, title: e.target.value } : n)))
                          }}
                        />
                      </div>

                      <div>
                        <Label htmlFor="node-content">Nội dung</Label>
                        <Textarea
                          id="node-content"
                          value={node.content}
                          onChange={(e) => {
                            setNodes(nodes.map((n) => (n.id === selectedNode ? { ...n, content: e.target.value } : n)))
                          }}
                        />
                      </div>

                      <div>
                        <Label htmlFor="node-type">Loại</Label>
                        <Select
                          value={node.type}
                          onValueChange={(value: FlowNode["type"]) => {
                            setNodes(nodes.map((n) => (n.id === selectedNode ? { ...n, type: value } : n)))
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trigger">Kích hoạt</SelectItem>
                            <SelectItem value="condition">Điều kiện</SelectItem>
                            <SelectItem value="response">Phản hồi</SelectItem>
                            <SelectItem value="ai-handoff">Chuyển AI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Move className="h-3 w-3 mr-1" />
                          Di chuyển
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  )
                })()}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Chọn một nút để chỉnh sửa thuộc tính</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
