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
import { PositionsType } from '../types'

interface PositionsDataTableProps {
  records: PositionsType[]
  onEdit?: (position: PositionsType) => void
  onDelete?: (position: PositionsType) => void
  isLoading?: boolean
}

export function PositionsDataTable({
  records,
  onEdit,
  onDelete,
  isLoading = false,
}: PositionsDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading positions..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No positions found"
        description="No positions available in the system."
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
            <TableHead>Position Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((position) => (
            <TableRow
              key={position.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <Badge variant="outline" className="font-mono text-xs">
                  #{position.id}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{position.position_name}</div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(position)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit position</span>
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(position)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete position</span>
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