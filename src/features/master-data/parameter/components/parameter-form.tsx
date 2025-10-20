import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoadingButton } from '@/components/common/loading'
import { SelectUnit } from '@/components/common/dialog-select'
import { useAddParameter, useUpdateParameter } from '../hooks'
import { 
  ParameterType, 
  DetailParameterType, 
  parameterRequestSchema, 
  ParameterRequestType 
} from '../types'

interface ParameterFormProps {
  initialData?: ParameterType | DetailParameterType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function ParameterForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false,
}: ParameterFormProps) {
  // Helper function to extract unit ID from either type
  const getUnitId = (data: ParameterType | DetailParameterType | undefined): string => {
    if (!data) return ''
    
    // Check if it's DetailParameterType with nested unit object
    if (typeof data.unit === 'object' && data.unit) {
      return data.unit.id.toString()
    }
    
    // For ParameterType with string unit, we can't get the ID easily
    // This would need to be handled by the API or by fetching unit details
    return ''
  }

  const form = useForm<ParameterRequestType>({
    resolver: zodResolver(parameterRequestSchema),
    defaultValues: {
      parameter_name: initialData?.parameter_name || '',
      unit_id: getUnitId(initialData),
    },
  })

  const createMutation = useAddParameter()
  const updateMutation = useUpdateParameter(Number(initialData?.id) || 0)

  const isLoading = createMutation.isPending || updateMutation.isPending

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      form.reset({
        parameter_name: initialData.parameter_name || '',
        unit_id: getUnitId(initialData),
      })
    }
  }, [initialData, form])

  const onSubmit = async (data: ParameterRequestType) => {
    try {
      if (isEditMode && initialData?.id) {
        const updateData: ParameterRequestType = {
          parameter_name: data.parameter_name,
          unit_id: data.unit_id,
        }
        await updateMutation.mutateAsync(updateData)
      } else {
        const createData: ParameterRequestType = {
          parameter_name: data.parameter_name,
          unit_id: data.unit_id,
        }
        await createMutation.mutateAsync(createData)
      }

      form.reset()
      onSuccess?.()
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error('Form submission error:', error)
    }
  }

  const handleReset = () => {
    form.reset({
      parameter_name: initialData?.parameter_name || '',
      unit_id: getUnitId(initialData),
    })
    toast.info('Form has been reset')
  }

  const handleCancel = () => {
    form.reset()
    onCancel?.()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        key={initialData?.id || 'new'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parameter Name */}
          <FormField
            control={form.control}
            name="parameter_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parameter Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter parameter name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Unit */}
          <FormField
            control={form.control}
            name="unit_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <SelectUnit
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder="Select a unit"
                  disabled={isLoading}
                  allowClear={true}
                />
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
            {isEditMode ? 'Update Parameter' : 'Create Parameter'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
