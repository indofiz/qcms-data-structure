import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { AnalysisParameterDataTable } from '../components/analysis-parameter-data-table'
import { AnalysisParameterFormContainer } from '../components/analysis-parameter-form-container'
import { AnalysisParameterDeleteDialog } from '../components/analysis-parameter-delete-dialog'
import { useGetAnalysisParameters, useDeleteAnalysisParameter } from '../hooks'
import { useModalStore } from '@/app/store/ui.store'
import { AnalysisParameterType } from '../types'
import { extractResponseData } from '@/shared/utils/response.utils'

export function AnalysisParameterPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] =
    useState<AnalysisParameterType | null>(null)

  const { data: response, isLoading } = useGetAnalysisParameters()
  const deleteMutation = useDeleteAnalysisParameter()
  const { openModal } = useModalStore()

  // Extract data using utility function to handle response structure correctly
  const allData = extractResponseData(response) || []

  // Handle edit analysis parameter
  const handleEditParameter = (parameter: AnalysisParameterType) => {
    openModal(
      { id: parameter.id },
      `Edit Analysis Parameter - ${parameter.parameter_name}`
    )
  }

  // Handle delete analysis parameter
  const handleDeleteParameter = (parameter: AnalysisParameterType) => {
    setDeleteRecord(parameter)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(
        `Analysis parameter ${deleteRecord.parameter_name} deleted successfully`
      )
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete analysis parameter')
    }
  }

  // Handle create new analysis parameter
  const handleCreateNew = () => {
    openModal(null, 'Create New Analysis Parameter')
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
        Create Parameter
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Analysis Parameters"
          description="Manage analysis parameters for quality control testing"
          actions={headerActions}
        />
        <CardContent className="pt-4 p-0 md:p-2">
          <AnalysisParameterDataTable
            records={allData}
            onEdit={handleEditParameter}
            onDelete={handleDeleteParameter}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AnalysisParameterDeleteDialog
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
      <AnalysisParameterFormContainer onSuccess={handleFormSuccess} />
    </div>
  )
}
