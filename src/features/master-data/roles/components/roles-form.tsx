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
import { useCreateRole, useUpdateRole } from '../hooks'
import { RolesType, rolesRequestSchema } from '../types'

export type RolesFormData = typeof rolesRequestSchema._type

interface RolesFormProps {
  initialData?: RolesType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function RolesForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false,
}: RolesFormProps) {
  const form = useForm<RolesFormData>({
    resolver: zodResolver(rolesRequestSchema),
    defaultValues: {
      name: initialData?.name || '',
      label: initialData?.label || '',
    },
  })

  const createMutation = useCreateRole()
  const updateMutation = useUpdateRole()

  const isLoading = createMutation.isPending || updateMutation.isPending

  const onSubmit = async (data: RolesFormData) => {
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
          {/* Role Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter role name"
                    {...field}
                    disabled={isLoading || initialData?.id !== undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Label */}
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Label *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter role label"
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
            {isEditMode ? 'Update Role' : 'Create Role'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
