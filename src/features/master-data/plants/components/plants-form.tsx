import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoadingButton } from '@/components/common/loading'
import { useCreatePlant, useUpdatePlant } from '../hooks'
import { PlantType, plantSchema } from '../types'

export type PlantsFormData = typeof plantSchema._type

interface PlantsFormProps {
  initialData?: PlantType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function PlantsForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false
}: PlantsFormProps) {
  const form = useForm<PlantsFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      plant_name: initialData?.plant_name || '',
    }
  })

  const createMutation = useCreatePlant()
  const updateMutation = useUpdatePlant(Number(initialData?.id) || 0)

  const isLoading = createMutation.isPending || updateMutation.isPending

  const onSubmit = async (data: PlantsFormData) => {
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
          {/* Plant Name */}
          <FormField
            control={form.control}
            name="plant_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plant Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter plant name"
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
            {isEditMode ? 'Update Plant' : 'Create Plant'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
