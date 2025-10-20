import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LoadingButton } from '@/components/common/loading'
import {
  SelectMaterial,
  SelectParameter,
} from '@/components/common/dialog-select'
import {
  useAddCoaStandardization,
  useUpdateCoaStandardization,
} from '../hooks'
import {
  CoaStandarizationType,
  DetailCoaStandarizationType,
  CoaStandarizationRequestType,
  coaStandarizationRequestSchema,
} from '../types/coa-standarization.type'

interface CoaStandardizationFormProps {
  initialData?: DetailCoaStandarizationType | CoaStandarizationType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function CoaStandardizationForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false,
}: CoaStandardizationFormProps) {
  // Helper function to convert status display to API format
  const getStatusValue = (status: string | undefined) => {
    if (!status) return '1' // Default to Active
    // Handle both string and numeric formats from API
    if (status === 'ACTIVE' || status === '1' || Number(status) === 1) return '1'
    if (status === 'INACTIVE' || status === '0' || Number(status) === 0) return '0'
    return '1' // Default to Active
  }

  const form = useForm<CoaStandarizationRequestType>({
    resolver: zodResolver(coaStandarizationRequestSchema),
    defaultValues: {
      raw_mat_id: initialData?.raw_mat_id || '',
      parameter_id: initialData?.parameter_id || '',
      standarization_type: (initialData?.standarization_type as 'STRING' | 'NUMBER') || 'STRING',
      min_value: initialData?.min_value || '',
      max_value: initialData?.max_value || '',
      status: getStatusValue(initialData?.status),
    },
  })

  const createMutation = useAddCoaStandardization()
  const updateMutation = useUpdateCoaStandardization(Number(initialData?.id) || 0)

  const isLoading = createMutation.isPending || updateMutation.isPending

  // Watch the standardization type to conditionally show/hide max_value
  const standardizationType = form.watch('standarization_type')

  // Clear max_value when standardization_type is STRING
  useEffect(() => {
    if (standardizationType === 'STRING') {
      form.setValue('max_value', '')
    }
  }, [standardizationType, form])

  const onSubmit = async (data: CoaStandarizationRequestType) => {
    try {
      if (isEditMode && initialData?.id) {
        await updateMutation.mutateAsync(data)
      } else {
        await createMutation.mutateAsync(data)
      }

      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleReset = () => {
    form.reset()
  }

  const handleCancel = () => {
    form.reset()
    onCancel?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Raw Material */}
          <FormField
            control={form.control}
            name="raw_mat_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raw Material *</FormLabel>
                <SelectMaterial
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select raw material"
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parameter */}
          <FormField
            control={form.control}
            name="parameter_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parameter *</FormLabel>
                <SelectParameter
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select parameter"
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Standardization Type */}
          <FormField
            control={form.control}
            name="standarization_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Standardization Type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select standardization type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="STRING">STRING</SelectItem>
                    <SelectItem value="NUMBER">NUMBER</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Not Active</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Min Value */}
          <FormField
            control={form.control}
            name="min_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Value *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter minimum value"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Max Value - Hidden when standardization_type is STRING */}
          {standardizationType !== 'STRING' && (
            <FormField
              control={form.control}
              name="max_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter maximum value (optional)"
                      {...field}
                      value={field.value || ''}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
            {isEditMode ? 'Update COA Standardization' : 'Create COA Standardization'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}