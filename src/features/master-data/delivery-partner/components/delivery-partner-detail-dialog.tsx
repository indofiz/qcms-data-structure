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
import { useGetDeliveryPartnerDetail } from '../hooks'
import { DeliveryPartnerType } from '../types/delivery-partner.type'

interface DeliveryPartnerDetailDialogProps {
  record: DeliveryPartnerType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeliveryPartnerDetailDialog({
  record,
  open,
  onOpenChange,
}: DeliveryPartnerDetailDialogProps) {
  const { data: detailData, isLoading } = useGetDeliveryPartnerDetail(
    record?.id ? Number(record.id) : 0
  )

  const deliveryPartner = detailData?.data

  const getStatusBadge = (active: boolean) => {
    return (
      <Badge variant={active ? 'default' : 'secondary'}>
        {active ? 'Active' : 'Inactive'}
      </Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Delivery Partner Details
            {deliveryPartner && getStatusBadge(deliveryPartner.active)}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : !deliveryPartner ? (
          <div className="text-center py-8 text-muted-foreground">
            No data available
          </div>
        ) : (
          <div className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Company Name
                  </label>
                  <p className="text-sm font-medium">
                    {deliveryPartner.company_name}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <div>{getStatusBadge(deliveryPartner.active)}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Address
                </label>
                <p className="text-sm">{deliveryPartner.address}</p>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone
                  </label>
                  <p className="text-sm font-medium">
                    {deliveryPartner.phone}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Fax
                  </label>
                  <p className="text-sm font-medium">
                    {deliveryPartner.fax || (
                      <span className="text-muted-foreground italic">
                        Not provided
                      </span>
                    )}
                  </p>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-sm font-medium">
                    {deliveryPartner.email || (
                      <span className="text-muted-foreground italic">
                        Not provided
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Timeline</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Created At
                  </label>
                  <p className="text-sm">
                    {deliveryPartner.created_at
                      ? format(new Date(deliveryPartner.created_at), 'PPp')
                      : 'Not available'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Updated At
                  </label>
                  <p className="text-sm">
                    {deliveryPartner.updated_at
                      ? format(new Date(deliveryPartner.updated_at), 'PPp')
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