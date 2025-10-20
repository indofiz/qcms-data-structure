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
import { CategoryType } from '../types'

interface CategoryDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: CategoryType | null
  onConfirm: () => void
  isLoading?: boolean
}

export function CategoryDeleteDialog({
  open,
  onOpenChange,
  record,
  onConfirm,
  isLoading = false,
}: CategoryDeleteDialogProps) {
  if (!record) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Delete Category
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to delete the category{' '}
              <span className="font-semibold">{record.category_name}</span>?
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Category ID: <span className="font-mono">#{record.id}</span>
              </p>
            </div>
            <p className="text-sm text-destructive">
              This action cannot be undone. This will permanently delete the
              category and may affect all raw materials associated with this
              category.
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
                Delete Category
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
