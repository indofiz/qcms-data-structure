import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { RolesDataTable } from '../components/roles-data-table'
import { RolesFormContainer } from '../components/roles-form-container'
import { RolesDeleteDialog } from '../components/roles-delete-dialog'
import { useGetRoles, useDeleteRole } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { RolesType } from '../types'

export function RolesPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<RolesType | null>(null)

  const { data: response, isLoading } = useGetRoles()
  const deleteMutation = useDeleteRole()
  const { openModal } = useModalStore()

  // Handle edit role
  const handleEditRole = (role: RolesType) => {
    openModal({ id: role.id }, `Edit Role - ${role.name}`)
  }

  // Handle delete role
  const handleDeleteRole = (role: RolesType) => {
    setDeleteRecord(role)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(`Role ${deleteRecord.name} deleted successfully`)
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete role')
    }
  }

  // Handle create new role
  const handleCreateNew = () => {
    openModal(null, 'Create New Role')
  }

  // Handle successful form actions (refresh data)
  const handleFormSuccess = () => {
    // The form container will close the modal automatically
    // Queries will be invalidated by the mutation hooks
  }

  const headerActions = (
    <>
      <button
        onClick={handleCreateNew}
        className="inline-flex w-full mb-4 md:w-fit md:mb-0 justify-center md:justify-start items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Create Role
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Roles"
          description="Manage system user roles and permissions"
          actions={headerActions}
        />
        <CardContent className="pt-4 p-0 md:p-2">
          <RolesDataTable
            records={response?.data || []}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <RolesDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open)
          if (!open) setDeleteRecord(null)
        }}
        record={deleteRecord}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />

      {/* Create/Edit Modal */}
      <RolesFormContainer onSuccess={handleFormSuccess} />
    </div>
  )
}
