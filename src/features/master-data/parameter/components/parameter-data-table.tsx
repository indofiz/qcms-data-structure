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
import { ParameterType } from '../types'

interface ParameterDataTableProps {
  records: ParameterType[]
  onEdit?: (parameter: ParameterType) => void
  onDelete?: (parameter: ParameterType) => void
  isLoading?: boolean
}

export function ParameterDataTable({
  records,
  onEdit,
  onDelete,
  isLoading = false,
}: ParameterDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading parameters..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No parameters found"
        description="No parameters available in the system."
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
                  <TableHead className="w-[250px]">Parameter Name</TableHead>
                  <TableHead className="w-[150px]">Unit</TableHead>
                  <TableHead className="w-[160px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((parameter) => (
                  <TableRow
                    key={parameter.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <Badge variant="outline" className="font-mono text-xs whitespace-nowrap">
                        #{parameter.id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-sm">
                        {parameter.parameter_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {parameter.unit || '-'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(parameter)}
                            className="h-8 w-8 p-0"
                            title="Edit parameter"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit parameter</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(parameter)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete parameter"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete parameter</span>
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
        {records.map((parameter) => (
          <div
            key={parameter.id}
            className="rounded-lg border p-4 space-y-3 bg-card hover:bg-muted/30 transition-colors"
          >
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-mono text-xs">
                #{parameter.id}
              </Badge>
              <div className="flex items-center gap-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(parameter)}
                    className="h-8 w-8 p-0"
                    title="Edit parameter"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(parameter)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    title="Delete parameter"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Parameter Info */}
            <div className="space-y-2">
              <div className="font-semibold text-base">
                {parameter.parameter_name}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit:</span>
                <span className="font-medium">{parameter.unit || '-'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}