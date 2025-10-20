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
import { DepartmentType } from '../types'

interface DepartmentDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: DepartmentType | null
  onConfirm: () => void
  isLoading: boolean
}

export function DepartmentDeleteDialog({
  open,
  onOpenChange,
  record,
  onConfirm,
  isLoading,
}: DepartmentDeleteDialogProps) {
  if (!record) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Department
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the department{' '}
              <span className="font-semibold">{record.department_name}</span>?
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Department ID: <span className="font-mono">#{record.id}</span>
              </p>
            </div>
            <p className="text-sm text-destructive">
              This action cannot be undone. This will permanently delete the
              department and may affect all users and processes associated with
              this department.
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
                Delete Department
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
