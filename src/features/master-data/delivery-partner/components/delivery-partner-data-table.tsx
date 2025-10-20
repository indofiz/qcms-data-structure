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
import { DeliveryPartnerType } from '../types'

interface DeliveryPartnerDataTableProps {
  records: DeliveryPartnerType[]
  onEdit?: (record: DeliveryPartnerType) => void
  onDelete?: (record: DeliveryPartnerType) => void
  onView?: (record: DeliveryPartnerType) => void
  isLoading?: boolean
}

export function DeliveryPartnerDataTable({
  records,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: DeliveryPartnerDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading delivery partners..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No delivery partners found"
        description="No delivery partners available in the system."
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
                  <TableHead className="w-[250px]">Company Details</TableHead>
                  <TableHead className="w-[130px]">Phone</TableHead>
                  <TableHead className="w-[180px]">Email</TableHead>
                  <TableHead className="w-[120px]">Fax</TableHead>
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
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-sm">
                          {record.company_name}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2 max-w-[230px]">
                          {record.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium whitespace-nowrap">
                        {record.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground max-w-[160px] truncate">
                        {record.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {record.fax || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={record.active ? 'default' : 'secondary'}>
                        {record.active ? 'Active' : 'Inactive'}
                      </Badge>
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
                            <span className="sr-only">View delivery partner details</span>
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(record)}
                            className="h-8 w-8 p-0"
                            title="Edit delivery partner"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit delivery partner</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(record)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete delivery partner"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete delivery partner</span>
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
                    title="Edit delivery partner"
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
                    title="Delete delivery partner"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Company Info */}
            <div className="space-y-2">
              <div className="font-semibold text-base">
                {record.company_name}
              </div>
              <div className="text-sm text-muted-foreground">
                {record.address}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{record.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="truncate ml-2">{record.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fax:</span>
                <span>{record.fax || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={record.active ? 'default' : 'secondary'}>
                  {record.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}