"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit, Trash2, Shield, Users } from "lucide-react"

interface Role {
  id: string
  name: string
  displayName: string
  description: string
  permissions: string[]
  userCount: number
}

interface Permission {
  id: string
  name: string
  icon: any
}

interface UserRoleManagerProps {
  roles: Role[]
  permissions: Permission[]
}

export function UserRoleManager({ roles, permissions }: UserRoleManagerProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Role Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {roles.map((role) => (
          <Card key={role.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{role.userCount}</p>
                  <p className="text-sm text-muted-foreground">{role.displayName}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Management */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Quản lý vai trò</CardTitle>
            <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo vai trò mới
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Tạo vai trò mới</DialogTitle>
                </DialogHeader>
                <CreateRoleForm permissions={permissions} onClose={() => setIsCreateRoleOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="bg-muted/50 border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-card-foreground">{role.displayName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {role.userCount}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Quyền truy cập</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {role.permissions.includes("all") ? (
                        <Badge variant="outline" className="text-xs">
                          Toàn quyền
                        </Badge>
                      ) : (
                        role.permissions.map((permissionId) => {
                          const permission = permissions.find((p) => p.id === permissionId)
                          return (
                            <Badge key={permissionId} variant="outline" className="text-xs">
                              {permission?.name || permissionId}
                            </Badge>
                          )
                        })
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => setSelectedRole(role)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Chỉnh sửa
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Chỉnh sửa vai trò</DialogTitle>
                        </DialogHeader>
                        {selectedRole && (
                          <EditRoleForm
                            role={selectedRole}
                            permissions={permissions}
                            onClose={() => setSelectedRole(null)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline" disabled={role.userCount > 0}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CreateRoleForm({ permissions, onClose }: { permissions: Permission[]; onClose: () => void }) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId])
    } else {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId))
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="role-name">Tên vai trò</Label>
        <Input id="role-name" placeholder="Nhập tên vai trò..." />
      </div>

      <div>
        <Label htmlFor="role-display-name">Tên hiển thị</Label>
        <Input id="role-display-name" placeholder="Nhập tên hiển thị..." />
      </div>

      <div>
        <Label htmlFor="role-description">Mô tả</Label>
        <Textarea id="role-description" placeholder="Mô tả vai trò..." />
      </div>

      <div>
        <Label>Quyền truy cập</Label>
        <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                id={`create-${permission.id}`}
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
              />
              <Label htmlFor={`create-${permission.id}`} className="text-sm">
                {permission.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button className="bg-primary text-primary-foreground">Tạo vai trò</Button>
      </div>
    </div>
  )
}

function EditRoleForm({ role, permissions, onClose }: { role: Role; permissions: Permission[]; onClose: () => void }) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role.permissions)

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId])
    } else {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId))
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="edit-role-name">Tên vai trò</Label>
        <Input id="edit-role-name" defaultValue={role.name} />
      </div>

      <div>
        <Label htmlFor="edit-role-display-name">Tên hiển thị</Label>
        <Input id="edit-role-display-name" defaultValue={role.displayName} />
      </div>

      <div>
        <Label htmlFor="edit-role-description">Mô tả</Label>
        <Textarea id="edit-role-description" defaultValue={role.description} />
      </div>

      <div>
        <Label>Quyền truy cập</Label>
        <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                id={`edit-${permission.id}`}
                checked={selectedPermissions.includes(permission.id) || selectedPermissions.includes("all")}
                onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                disabled={selectedPermissions.includes("all")}
              />
              <Label htmlFor={`edit-${permission.id}`} className="text-sm">
                {permission.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button className="bg-primary text-primary-foreground">Cập nhật vai trò</Button>
      </div>
    </div>
  )
}
