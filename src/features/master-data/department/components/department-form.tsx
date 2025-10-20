import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoadingButton } from '@/components/common/loading'
import { useCreateDepartment, useUpdateDepartment } from '../hooks'
import { DepartmentType, departmentSchema } from '../types'

export type DepartmentFormData = typeof departmentSchema._type

interface DepartmentFormProps {
  initialData?: DepartmentType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function DepartmentForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false
}: DepartmentFormProps) {
  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      department_name: initialData?.department_name || '',
    }
  })

  const createMutation = useCreateDepartment()
  const updateMutation = useUpdateDepartment()

  const isLoading = createMutation.isPending || updateMutation.isPending

  const onSubmit = async (data: DepartmentFormData) => {
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
          {/* Department Name */}
          <FormField
            control={form.control}
            name="department_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter department name"
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
            {isEditMode ? 'Update Department' : 'Create Department'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}