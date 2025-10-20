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
import { SupplierType } from '../types'

interface SupplierDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: SupplierType | null
  onConfirm: () => void
  isLoading?: boolean
}

export function SupplierDeleteDialog({
  open,
  onOpenChange,
  record,
  onConfirm,
  isLoading = false,
}: SupplierDeleteDialogProps) {
  if (!record) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Supplier
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the supplier{' '}
              <span className="font-semibold">{record.supplier_name}</span>?
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Address: <span className="font-medium">{record.address}</span></p>
              <p>Phone: <span className="font-mono">{record.phone}</span></p>
              {record.email && (
                <p>Email: <span className="font-mono">{record.email}</span></p>
              )}
            </div>
            <p className="text-sm text-destructive">
              This action cannot be undone. This will permanently delete the supplier
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
                Delete Supplier
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}