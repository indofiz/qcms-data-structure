import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoadingButton } from '@/components/common/loading'
import { useAddUnit, useUpdateUnit } from '../hooks'
import { UnitType, unitSchema, UnitCreateType } from '../types'

interface UnitFormProps {
  initialData?: UnitType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function UnitForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false
}: UnitFormProps) {
  const form = useForm<UnitCreateType>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      unit_name: initialData?.unit_name || '',
    }
  })

  const createMutation = useAddUnit()
  const updateMutation = useUpdateUnit(Number(initialData?.id) || 0)

  const isLoading = createMutation.isPending || updateMutation.isPending

  const onSubmit = async (data: UnitCreateType) => {
    try {
      if (isEditMode && initialData?.id) {
        await updateMutation.mutateAsync(data)
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
          {/* Unit Name */}
          <FormField
            control={form.control}
            name="unit_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter unit name"
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
            {isEditMode ? 'Update Unit' : 'Create Unit'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}