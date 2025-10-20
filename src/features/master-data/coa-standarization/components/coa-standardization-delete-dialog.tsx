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
import { CoaStandarizationType } from '../types/coa-standarization.type'

interface CoaStandardizationDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: CoaStandarizationType | null
  onConfirm: () => void
  isLoading?: boolean
}

export function CoaStandardizationDeleteDialog({
  open,
  onOpenChange,
  record,
  onConfirm,
  isLoading = false,
}: CoaStandardizationDeleteDialogProps) {
  if (!record) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete COA Standardization
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the COA standardization for{' '}
              <span className="font-semibold">{record.material_name}</span> -{' '}
              <span className="font-semibold">{record.parameter_name}</span>?
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Type: <span className="font-semibold">{record.standarization_type}</span></p>
              <p>Min Value: <span className="font-mono">{record.min_value}</span></p>
              {record.max_value && (
                <p>Max Value: <span className="font-mono">{record.max_value}</span></p>
              )}
            </div>
            <p className="text-sm text-destructive">
              This action cannot be undone. This will permanently delete the COA standardization
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
                Delete Standardization
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}