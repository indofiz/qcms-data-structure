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
import { DeliveryPartnerType } from '../types'

interface DeliveryPartnerDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: DeliveryPartnerType | null
  onConfirm: () => void
  isLoading?: boolean
}

export function DeliveryPartnerDeleteDialog({
  open,
  onOpenChange,
  record,
  onConfirm,
  isLoading = false,
}: DeliveryPartnerDeleteDialogProps) {
  if (!record) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Delivery Partner
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the delivery partner{' '}
              <span className="font-semibold">{record.company_name}</span>?
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Address: <span className="font-medium">{record.address}</span></p>
              <p>Phone: <span className="font-mono">{record.phone}</span></p>
              {record.email && (
                <p>Email: <span className="font-mono">{record.email}</span></p>
              )}
            </div>
            <p className="text-sm text-destructive">
              This action cannot be undone. This will permanently delete the delivery partner
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
                Delete Partner
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}