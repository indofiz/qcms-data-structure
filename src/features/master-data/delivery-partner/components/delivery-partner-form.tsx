import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoadingButton } from '@/components/common/loading'
import {
  useAddDeliveryPartner,
  useUpdateDeliveryPartner,
  DeliveryPartnerType,
  DeliveryPartnerRequestType,
} from '../'

// Validation schema
const formSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  fax: z.string().optional().or(z.literal('')),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  active: z.boolean().optional().default(true),
})

export type DeliveryPartnerFormData = z.infer<typeof formSchema>

interface DeliveryPartnerFormProps {
  record?: DeliveryPartnerType
  onSuccess?: () => void
  onCancel?: () => void
}

export function DeliveryPartnerForm({
  record,
  onSuccess,
  onCancel,
}: DeliveryPartnerFormProps) {
  const isEditing = !!record

  const form = useForm<DeliveryPartnerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: record?.company_name || '',
      address: record?.address || '',
      phone: record?.phone || '',
      fax: record?.fax || '',
      email: record?.email || '',
      active: record?.active ?? true,
    },
  })

  // Mutations
  const addMutation = useAddDeliveryPartner()
  const updateMutation = useUpdateDeliveryPartner(Number(record?.id) || 0)

  const isLoading = addMutation.isPending || updateMutation.isPending

  const onSubmit = async (data: DeliveryPartnerFormData) => {
    try {
      const payload: DeliveryPartnerRequestType = {
        company_name: data.company_name,
        address: data.address,
        phone: data.phone,
        fax: data.fax || '',
        email: data.email || '',
        active: data.active ?? true,
      }

      if (isEditing) {
        await updateMutation.mutateAsync(payload)
      } else {
        await addMutation.mutateAsync(payload)
      }

      onSuccess?.()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter email address" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fax */}
          <FormField
            control={form.control}
            name="fax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fax</FormLabel>
                <FormControl>
                  <Input placeholder="Enter fax number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter complete address" 
                  {...field} 
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active Status */}
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Active Status
                </FormLabel>
                <div className="text-sm text-muted-foreground">
                  Enable this delivery partner for operations
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <LoadingButton 
            type="submit" 
            loading={isLoading}
          >
            {isEditing ? 'Update' : 'Create'} Delivery Partner
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}