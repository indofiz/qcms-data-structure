import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/common/section'
import { LoadingContentSpin } from '@/components/common/loading'
import { SupplierForm } from '../components/supplier-form'
import { useGetSupplierDetail } from '../hooks'

export function SupplierEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const supplierId = Number(id)
  const {
    data: supplierResponse,
    isLoading,
    error,
    refetch,
  } = useGetSupplierDetail(supplierId)

  const supplier = supplierResponse?.data

  const handleSuccess = () => {
    navigate('/master-data/suppliers')
  }

  const handleCancel = () => {
    navigate('/master-data/suppliers')
  }

  const headerActions = (
    <Button
      variant="outline"
      onClick={() => navigate('/master-data/suppliers')}
      className="gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Suppliers
    </Button>
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full mx-auto p-0">
        <Card className="shadow-none border-none">
          <PageHeader
            title="Edit Supplier"
            description="Loading supplier details..."
            actions={headerActions}
          />

          <CardContent className="pt-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading Supplier Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LoadingContentSpin className="h-32" />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="w-full mx-auto p-0">
        <Card className="shadow-none border-none">
          <PageHeader
            title="Edit Supplier"
            description="Failed to load supplier details"
            actions={headerActions}
          />

          <CardContent className="pt-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">
                    Error Loading Supplier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <p className="text-muted-foreground text-center">
                      Unable to load the supplier details. Please check your
                      connection and try again.
                    </p>
                    <div className="flex gap-2">
                      <Button onClick={() => refetch()} variant="outline">
                        Try Again
                      </Button>
                      <Button onClick={handleCancel} variant="secondary">
                        Go Back
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Supplier not found
  if (!supplier) {
    return (
      <div className="w-full mx-auto p-0">
        <Card className="shadow-none border-none">
          <PageHeader
            title="Edit Supplier"
            description="Supplier not found"
            actions={headerActions}
          />

          <CardContent className="pt-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">
                    Supplier Not Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <p className="text-muted-foreground text-center">
                      The requested supplier (ID: {id}) could not be found or
                      may have been deleted.
                    </p>
                    <Button onClick={handleCancel} variant="secondary">
                      Back to Suppliers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Success state - show form
  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title={`Edit Supplier - ${supplier.supplier_name}`}
          description={`Update supplier information and location details for ${supplier.supplier_name}`}
          actions={headerActions}
        />

        <CardContent className="pt-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
              </CardHeader>
              <CardContent>
                <SupplierForm
                  initialData={supplier}
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
                  isEditMode={true}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
