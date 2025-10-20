import { Edit, Trash2 } from 'lucide-react'
import {
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
import { UnitType } from '../types'

interface UnitDataTableProps {
  records: UnitType[]
  onEdit?: (unit: UnitType) => void
  onDelete?: (unit: UnitType) => void
  isLoading?: boolean
}

export function UnitDataTable({
  records,
  onEdit,
  onDelete,
  isLoading = false,
}: UnitDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading units..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No units found"
        description="No measurement units available in the system."
        action={
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        }
      />
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <div className="rounded-md border">
            <table className="w-full min-w-[600px] caption-bottom text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="w-[250px]">Unit Name</TableHead>
                  <TableHead className="w-[160px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((unit) => (
                  <TableRow
                    key={unit.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <Badge variant="outline" className="font-mono text-xs whitespace-nowrap">
                        #{unit.id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-sm">
                        {unit.unit_name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(unit)}
                            className="h-8 w-8 p-0"
                            title="Edit unit"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit unit</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(unit)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete unit"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete unit</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {records.map((unit) => (
          <div
            key={unit.id}
            className="rounded-lg border p-4 space-y-3 bg-card hover:bg-muted/30 transition-colors"
          >
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-mono text-xs">
                #{unit.id}
              </Badge>
              <div className="flex items-center gap-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(unit)}
                    className="h-8 w-8 p-0"
                    title="Edit unit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(unit)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    title="Delete unit"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Unit Info */}
            <div className="space-y-2">
              <div className="font-semibold text-base">
                {unit.unit_name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}