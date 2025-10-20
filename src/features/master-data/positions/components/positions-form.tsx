import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
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
import { useCreatePosition, useUpdatePosition } from '../hooks'
import { PositionsType, positionsRequestSchema } from '../types'

export type PositionsFormData = typeof positionsRequestSchema._type

interface PositionsFormProps {
  initialData?: PositionsType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function PositionsForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false,
}: PositionsFormProps) {
  const form = useForm<PositionsFormData>({
    resolver: zodResolver(positionsRequestSchema),
    defaultValues: {
      position_name: initialData?.position_name || '',
    },
  })

  const createMutation = useCreatePosition()
  const updateMutation = useUpdatePosition()

  const isLoading = createMutation.isPending || updateMutation.isPending

  const onSubmit = async (data: PositionsFormData) => {
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
          {/* Position Name */}
          <FormField
            control={form.control}
            name="position_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter position name"
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
            {isEditMode ? 'Update Position' : 'Create Position'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}