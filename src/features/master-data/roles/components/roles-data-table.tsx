import { Edit, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/common/empty-state'
import { LoadingSpinner } from '@/components/common/loading'
import { RolesType } from '../types'

interface RolesDataTableProps {
  records: RolesType[]
  onEdit?: (role: RolesType) => void
  onDelete?: (role: RolesType) => void
  isLoading?: boolean
}

export function RolesDataTable({
  records,
  onEdit,
  onDelete,
  isLoading = false,
}: RolesDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading roles..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No roles found"
        description="No roles available in the system."
        action={
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        }
      />
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Role Name</TableHead>
            <TableHead>Label</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((role) => (
            <TableRow
              key={role.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <Badge variant="outline" className="font-mono text-xs">
                  #{role.id}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{role.name}</div>
              </TableCell>
              <TableCell>
                <div>{role.label}</div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(role)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit role</span>
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(role)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete role</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
