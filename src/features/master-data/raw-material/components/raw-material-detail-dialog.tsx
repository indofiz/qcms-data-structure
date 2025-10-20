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
import { useGetMaterialDetail } from '../hooks'
import { MaterialType } from '../types/raw-material.type'

interface RawMaterialDetailDialogProps {
  record: MaterialType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RawMaterialDetailDialog({
  record,
  open,
  onOpenChange,
}: RawMaterialDetailDialogProps) {
  const { data: detailData, isLoading } = useGetMaterialDetail(
    record?.id ? Number(record.id) : 0
  )

  const material = detailData?.data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Raw Material Details
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : !material ? (
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
                    Material Name
                  </label>
                  <p className="text-sm font-medium">
                    {material.material_name}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Category
                  </label>
                  <div>
                    <Badge variant="outline">
                      {material.category?.category_name || 'No category'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Formula
                </label>
                <p className="text-sm">
                  {material.formula || (
                    <span className="text-muted-foreground italic">
                      No formula provided
                    </span>
                  )}
                </p>
              </div>
              
              {material.description && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Description
                  </label>
                  <p className="text-sm">{material.description}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Plant Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Plant Assignment</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Assigned Plants
                </label>
                <div className="flex flex-wrap gap-2">
                  {material.plants && material.plants.length > 0 ? (
                    material.plants.map((plant) => (
                      <Badge key={plant.id} variant="secondary">
                        {plant.plant_name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground italic">
                      No plants assigned
                    </span>
                  )}
                </div>
                {material.plants && material.plants.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    This material is available in {material.plants.length} plant{material.plants.length !== 1 ? 's' : ''}
                  </p>
                )}
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
                    {material.created_at
                      ? format(new Date(material.created_at), 'PPp')
                      : 'Not available'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Updated At
                  </label>
                  <p className="text-sm">
                    {material.updated_at
                      ? format(new Date(material.updated_at), 'PPp')
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