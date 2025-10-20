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
import { ProductType } from '../types'

interface ProductDataTableProps {
  records: ProductType[]
  onEdit?: (record: ProductType) => void
  onDelete?: (record: ProductType) => void
  onView?: (record: ProductType) => void
  isLoading?: boolean
}

export function ProductDataTable({
  records,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: ProductDataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading products..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="No products available in the system."
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
            <table className="w-full min-w-[900px] caption-bottom text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="w-[200px]">Product Details</TableHead>
                  <TableHead className="w-[150px]">Product Code</TableHead>
                  <TableHead className="w-[150px]">Company</TableHead>
                  <TableHead className="w-[150px]">Plant</TableHead>
                  <TableHead className="w-[120px]">Type Code</TableHead>
                  <TableHead className="w-[120px]">Solder Type</TableHead>
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
                          {record.product_name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {record.product_code}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {record.company_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{record.plant.plant_name}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {record.plant.id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {record.product_type_code}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {record.solder_type || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={record.activate === 'active' ? 'default' : 'secondary'}>
                        {record.activate === 'active' ? 'Active' : 'Inactive'}
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
                            <span className="sr-only">View product details</span>
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(record)}
                            className="h-8 w-8 p-0"
                            title="Edit product"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit product</span>
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(record)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete product</span>
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
                    title="Edit product"
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
                    title="Delete product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <div className="font-semibold text-base">
                {record.product_name}
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                {record.product_code}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company:</span>
                <span className="font-medium">{record.company_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plant:</span>
                <span className="font-medium">{record.plant.plant_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type Code:</span>
                <span className="font-mono text-sm">{record.product_type_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Solder Type:</span>
                <span>{record.solder_type || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={record.activate === 'active' ? 'default' : 'secondary'}>
                  {record.activate === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}