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
import { useGetCoaStandardizationDetail } from '../hooks'
import { CoaStandarizationType } from '../types/coa-standarization.type'

interface CoaStandardizationDetailDialogProps {
  record: CoaStandarizationType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CoaStandardizationDetailDialog({
  record,
  open,
  onOpenChange,
}: CoaStandardizationDetailDialogProps) {
  const { data: detailData, isLoading } = useGetCoaStandardizationDetail(
    record?.id ? Number(record.id) : 0
  )

  const standardization = detailData?.data

  const getStatusBadge = (status: string) => {
    const isActive = status === '1' || status === 'active'
    return (
      <Badge variant={isActive ? 'default' : 'secondary'}>
        {isActive ? 'Active' : 'Not Active'}
      </Badge>
    )
  }

  const getStandardizationTypeBadge = (type: string) => {
    return (
      <Badge variant={type === 'STRING' ? 'outline' : 'secondary'}>
        {type}
      </Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            COA Standardization Details
            {standardization && getStatusBadge(standardization.status)}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : !standardization ? (
          <div className="text-center py-8 text-muted-foreground">
            No data available
          </div>
        ) : (
          <div className="space-y-6">
            {/* Material and Parameter */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Material Name
                  </label>
                  <p className="text-sm font-medium">
                    {standardization.material?.material_name || '-'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Parameter Name
                  </label>
                  <p className="text-sm font-medium">
                    {standardization.parameter?.parameter_name || '-'}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Standardization Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Standardization Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Type
                  </label>
                  <div>
                    {getStandardizationTypeBadge(
                      standardization.standarization_type
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Min Value
                  </label>
                  <p className="text-sm font-medium">
                    {standardization.min_value}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Max Value
                  </label>
                  <p className="text-sm font-medium">
                    {standardization.max_value || (
                      <span className="text-muted-foreground italic">
                        Not set
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Status and Timestamps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Status & Timeline</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <div>{getStatusBadge(standardization.status)}</div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Created At
                  </label>
                  <p className="text-sm">
                    {standardization.created_at
                      ? format(new Date(standardization.created_at), 'PPp')
                      : 'Not available'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Updated At
                  </label>
                  <p className="text-sm">
                    {standardization.updated_at
                      ? format(new Date(standardization.updated_at), 'PPp')
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
