import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoadingButton } from '@/components/common/loading'
import { useCreateUnitOfMeasurement, useUpdateUnitOfMeasurement } from '../hooks'
import { UnitOfMeasurementType, unitOfMeasurementSchema } from '../types'

export type UnitOfMeasurementFormData = typeof unitOfMeasurementSchema._type

interface UnitOfMeasurementFormProps {
  initialData?: UnitOfMeasurementType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function UnitOfMeasurementForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false
}: UnitOfMeasurementFormProps) {
  const form = useForm<UnitOfMeasurementFormData>({
    resolver: zodResolver(unitOfMeasurementSchema),
    defaultValues: {
      unit_of_measurement: initialData?.unit_of_measurement || '',
    }
  })

  const createMutation = useCreateUnitOfMeasurement()
  const updateMutation = useUpdateUnitOfMeasurement()

  const isLoading = createMutation.isPending || updateMutation.isPending

  const onSubmit = async (data: UnitOfMeasurementFormData) => {
    try {
      if (isEditMode && initialData?.id) {
        await updateMutation.mutateAsync({ id: Number(initialData.id), data })
      } else {
        await createMutation.mutateAsync(data)
      }
      
      form.reset()
      onSuccess?.()
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error('Form submission error:', error)
    }
  }

  const handleReset = () => {
    form.reset()
    toast.info('Form has been reset')
  }

  const handleCancel = () => {
    form.reset()
    onCancel?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Unit of Measurement */}
          <FormField
            control={form.control}
            name="unit_of_measurement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit of Measurement *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter unit of measurement"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingText={isEditMode ? 'Updating...' : 'Creating...'}
          >
            {isEditMode ? 'Update Unit of Measurement' : 'Create Unit of Measurement'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}