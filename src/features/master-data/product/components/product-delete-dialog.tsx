import { Trash2, Loader2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ProductType } from '../types'

interface ProductDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: ProductType | null
  onConfirm: () => void
  isLoading?: boolean
}

export function ProductDeleteDialog({
  open,
  onOpenChange,
  record,
  onConfirm,
  isLoading = false,
}: ProductDeleteDialogProps) {
  if (!record) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Product
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the product{' '}
              <span className="font-semibold">{record.product_name}</span>?
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Product Code: <span className="font-mono">{record.product_code}</span></p>
              <p>Company: <span className="font-medium">{record.company_name}</span></p>
              <p>Type: <span className="font-medium">{record.product_type_code}</span></p>
              {record.plant?.plant_name && (
                <p>Plant: <span className="font-medium">{record.plant.plant_name}</span></p>
              )}
            </div>
            <p className="text-sm text-destructive">
              This action cannot be undone. This will permanently delete the product
              and remove all associated data.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Product
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}