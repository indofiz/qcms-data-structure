import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/common/section'
import { SupplierForm } from '../components/supplier-form'

export function SupplierCreatePage() {
  const navigate = useNavigate()

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

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Create New Supplier"
          description="Add a new supplier to the system with complete contact information and location details"
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
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
                  isEditMode={false}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
