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
import { ParameterType } from '../types'

interface ParameterDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: ParameterType | null
  onConfirm: () => void
  isLoading?: boolean
}

export function ParameterDeleteDialog({
  open,
  onOpenChange,
  record,
  onConfirm,
  isLoading = false,
}: ParameterDeleteDialogProps) {
  if (!record) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Parameter
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the parameter{' '}
              <span className="font-semibold">{record.parameter_name}</span>?
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Parameter ID: <span className="font-mono">#{record.id}</span>
              </p>
              {record.unit && (
                <p>
                  Unit: <span className="font-medium">{record.unit}</span>
                </p>
              )}
            </div>
            <p className="text-sm text-destructive">
              This action cannot be undone. This will permanently delete the
              parameter and may affect all COA standardizations and test results
              using this parameter.
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
                Delete Parameter
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
