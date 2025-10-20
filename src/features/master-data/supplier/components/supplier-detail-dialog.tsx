import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { LoadingSpinner } from '@/components/common/loading'
import { format } from 'date-fns'
import { useGetSupplierDetail } from '../hooks'
import { SupplierType } from '../types/supplier.type'

interface SupplierDetailDialogProps {
  record: SupplierType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupplierDetailDialog({
  record,
  open,
  onOpenChange,
}: SupplierDetailDialogProps) {
  const { data: detailData, isLoading } = useGetSupplierDetail(
    record?.id ? Number(record.id) : 0
  )

  const supplier = detailData?.data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Supplier Details
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : !supplier ? (
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
                    Supplier Name
                  </label>
                  <p className="text-sm font-medium">
                    {supplier.supplier_name}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </label>
                  <p className="text-sm font-medium">
                    {supplier.phone}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <p className="text-sm">
                  {supplier.email || (
                    <span className="text-muted-foreground italic">
                      No email provided
                    </span>
                  )}
                </p>
              </div>
            </div>

            <Separator />

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location Information</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Address
                </label>
                <p className="text-sm">{supplier.address}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Sub District
                  </label>
                  <p className="text-sm">
                    {supplier.sub_district?.sub_district_name || '-'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    District
                  </label>
                  <p className="text-sm">
                    {supplier.district?.district_name || '-'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    City
                  </label>
                  <p className="text-sm">
                    {supplier.city?.city_name || '-'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Province
                  </label>
                  <p className="text-sm">
                    {supplier.province?.province_name || '-'}
                  </p>
                </div>
              </div>
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
                    {supplier.created_at
                      ? format(new Date(supplier.created_at), 'PPp')
                      : 'Not available'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Updated At
                  </label>
                  <p className="text-sm">
                    {supplier.updated_at
                      ? format(new Date(supplier.updated_at), 'PPp')
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