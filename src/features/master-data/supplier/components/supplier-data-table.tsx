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
import { SupplierType } from '../types'

interface SupplierDataTableProps {
  records: SupplierType[]
  onEdit?: (supplier: SupplierType) => void
  onDelete?: (supplier: SupplierType) => void
  onView?: (supplier: SupplierType) => void
  isLoading?: boolean
}

export function SupplierDataTable({
  records,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: SupplierDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading suppliers..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No suppliers found"
        description="No suppliers available in the system."
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
                  <TableHead className="w-[250px]">Supplier Details</TableHead>
                  <TableHead className="w-[130px]">Contact</TableHead>
                  <TableHead className="w-[180px]">Email</TableHead>
                  <TableHead className="w-[120px]">Location</TableHead>
                  <TableHead className="w-[160px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((supplier) => (
                  <TableRow
                    key={supplier.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <Badge variant="outline" className="font-mono text-xs whitespace-nowrap">
                        #{supplier.id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-sm">
                          {supplier.supplier_name}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2 max-w-[230px]">
                          {supplier.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium whitespace-nowrap">
                        {supplier.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground max-w-[160px] truncate">
                        {supplier.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm whitespace-nowrap">
                        {supplier.city}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(supplier)}
                            className="h-8 w-8 p-0"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View supplier details</span>
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(supplier)}
                            className="h-8 w-8 p-0"
                            title="Edit supplier"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit supplier</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(supplier)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete supplier"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete supplier</span>
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
        {records.map((supplier) => (
          <div
            key={supplier.id}
            className="rounded-lg border p-4 space-y-3 bg-card hover:bg-muted/30 transition-colors"
          >
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-mono text-xs">
                #{supplier.id}
              </Badge>
              <div className="flex items-center gap-1">
                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(supplier)}
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
                    onClick={() => onEdit(supplier)}
                    className="h-8 w-8 p-0"
                    title="Edit supplier"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(supplier)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    title="Delete supplier"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Supplier Info */}
            <div className="space-y-2">
              <div className="font-semibold text-base">
                {supplier.supplier_name}
              </div>
              <div className="text-sm text-muted-foreground">
                {supplier.address}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{supplier.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="truncate ml-2">{supplier.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span>{supplier.city}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}