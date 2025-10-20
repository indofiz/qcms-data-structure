import { Pencil, Trash2, Eye } from 'lucide-react'
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
import { CoaStandarizationType } from '../types/coa-standarization.type'

interface CoaStandardizationDataTableProps {
  records: CoaStandarizationType[]
  onEdit?: (record: CoaStandarizationType) => void
  onDelete?: (record: CoaStandarizationType) => void
  onView?: (record: CoaStandarizationType) => void
  isLoading?: boolean
}

export function CoaStandardizationDataTable({
  records,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: CoaStandardizationDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading COA standardizations..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No COA standardizations found"
        description="No COA standardizations available in the system."
        action={
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        }
      />
    )
  }

  const getStatusBadge = (status: string) => {
    // Handle both string and numeric status values
    const isActive = status === 'ACTIVE' || status === '1' || Number(status) === 1
    const variant = isActive ? 'default' : 'secondary'
    const label = isActive ? 'Active' : 'Not Active'
    
    return (
      <Badge variant={variant} className="text-xs">
        {label}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const variant = type === 'NUMBER' ? 'outline' : 'secondary'
    return (
      <Badge variant={variant} className="text-xs">
        {type}
      </Badge>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <div className="rounded-md border">
            <table className="w-full min-w-[900px] caption-bottom text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="w-[200px]">Material</TableHead>
                  <TableHead className="w-[200px]">Parameter</TableHead>
                  <TableHead className="w-[120px]">Type</TableHead>
                  <TableHead className="w-[100px]">Min Value</TableHead>
                  <TableHead className="w-[100px]">Max Value</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
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
                    <TableCell className="font-medium">
                      <div className="font-semibold text-sm">{record.material_name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{record.parameter_name}</div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(record.standarization_type)}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{record.min_value}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {record.max_value || '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(record.status)}
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
                            <span className="sr-only">View COA standardization details</span>
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(record)}
                            className="h-8 w-8 p-0"
                            title="Edit COA standardization"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit COA standardization</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(record)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete COA standardization"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete COA standardization</span>
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
                    title="Edit COA standardization"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(record)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    title="Delete COA standardization"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Material and Parameter Info */}
            <div className="space-y-2">
              <div className="font-semibold text-base">
                {record.material_name}
              </div>
              <div className="text-sm text-muted-foreground">
                Parameter: {record.parameter_name}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Type:</span>
                <div>{getTypeBadge(record.standarization_type)}</div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Status:</span>
                <div>{getStatusBadge(record.status)}</div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Min Value:</span>
                <span className="font-mono text-sm">{record.min_value}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Max Value:</span>
                <span className="font-mono text-sm">{record.max_value || '-'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}