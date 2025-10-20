import { Edit, Trash2, Eye } from 'lucide-react'
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
import { MaterialType } from '../types'

interface RawMaterialDataTableProps {
  records: MaterialType[]
  onEdit?: (record: MaterialType) => void
  onDelete?: (record: MaterialType) => void
  onView?: (record: MaterialType) => void
  isLoading?: boolean
}

export function RawMaterialDataTable({
  records,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: RawMaterialDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading raw materials..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No raw materials found"
        description="No raw materials available in the system."
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
            <table className="w-full min-w-[800px] caption-bottom text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="w-[200px]">Material Details</TableHead>
                  <TableHead className="w-[150px]">Formula</TableHead>
                  <TableHead className="w-[120px]">Category</TableHead>
                  <TableHead className="w-[180px]">Plants</TableHead>
                  <TableHead className="w-[160px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow
                    key={record.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <Badge variant="outline" className="font-mono text-xs whitespace-nowrap">
                        #{record.id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-sm">
                          {record.material_name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {record.formula || (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {record.category}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {record.plants.map((plant, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {plant}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(record)}
                            className="h-8 w-8 p-0"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View raw material details</span>
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(record)}
                            className="h-8 w-8 p-0"
                            title="Edit raw material"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit raw material</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(record)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete raw material"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete raw material</span>
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
        {records.map((record) => (
          <div
            key={record.id}
            className="rounded-lg border p-4 space-y-3 bg-card hover:bg-muted/30 transition-colors"
          >
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-mono text-xs">
                #{record.id}
              </Badge>
              <div className="flex items-center gap-1">
                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(record)}
                    className="h-8 w-8 p-0"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(record)}
                    className="h-8 w-8 p-0"
                    title="Edit raw material"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(record)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    title="Delete raw material"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Material Info */}
            <div className="space-y-2">
              <div className="font-semibold text-base">
                {record.material_name}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Formula:</span>
                <span className="font-mono text-sm">
                  {record.formula || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{record.category}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-xs">Plants:</span>
                <div className="flex flex-wrap gap-1">
                  {record.plants.map((plant, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {plant}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}