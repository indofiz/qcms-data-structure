import { SupplierForm } from './supplier-form'

interface SupplierCreateFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function SupplierCreateForm({
  onSuccess,
  onCancel
}: SupplierCreateFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create New Supplier</h2>
        <p className="text-muted-foreground">
          Add a new supplier by filling out the form below.
        </p>
      </div>
      
      <SupplierForm
        onSuccess={onSuccess}
        onCancel={onCancel}
        isEditMode={false}
      />
    </div>
  )
}