import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { LoadingSpinner } from '@/components/common/loading'
import { format } from 'date-fns'
import { useGetProductDetail } from '../hooks'
import { ProductType } from '../types/product.type'

interface ProductDetailDialogProps {
  record: ProductType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductDetailDialog({
  record,
  open,
  onOpenChange,
}: ProductDetailDialogProps) {
  const { data: detailData, isLoading } = useGetProductDetail(
    record?.id ? Number(record.id) : 0
  )

  const product = detailData?.data

  const getStatusBadge = (activate: string) => {
    const isActive = activate === '1' || activate === 'active'
    return (
      <Badge variant={isActive ? 'default' : 'secondary'}>
        {isActive ? 'Active' : 'Inactive'}
      </Badge>
    )
  }

  const getProductTypeBadge = (typeCode: string) => {
    const typeMap: Record<string, string> = {
      'SOL': 'Solder',
      'TIN': 'Tin',
      'ALLOY': 'Alloy'
    }
    
    return (
      <Badge variant="outline">
        {typeMap[typeCode] || typeCode}
      </Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Product Details
            {product && getStatusBadge(product.activate)}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : !product ? (
          <div className="text-center py-8 text-muted-foreground">
            No data available
          </div>
        ) : (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Product Name
                  </label>
                  <p className="text-sm font-medium">
                    {product.product_name}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Product Code
                  </label>
                  <p className="text-sm font-medium">
                    {product.product_code}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Company Name
                  </label>
                  <p className="text-sm">{product.company_name}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <div>{getStatusBadge(product.activate)}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Product Type
                  </label>
                  <div>{getProductTypeBadge(product.product_type_code)}</div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Plant
                  </label>
                  <div>
                    <Badge variant="secondary">
                      {product.plant?.plant_name || 'No plant assigned'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {product.solder_type && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Solder Type
                  </label>
                  <p className="text-sm">{product.solder_type}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Timeline</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Created At
                  </label>
                  <p className="text-sm">
                    {product.created_at
                      ? format(new Date(product.created_at), 'PPp')
                      : 'Not available'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Updated At
                  </label>
                  <p className="text-sm">
                    {product.updated_at
                      ? format(new Date(product.updated_at), 'PPp')
                      : 'Not available'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}