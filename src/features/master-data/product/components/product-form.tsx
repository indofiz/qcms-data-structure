import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectPlant } from '@/components/common/dialog-select'
import { productRequestSchema, ProductRequestType } from '../types'
import { LoadingButton } from '@/components/common/loading'

type ProductFormData = ProductRequestType

interface ProductFormProps {
  onSubmit: (data: ProductRequestType) => void
  onCancel?: () => void
  initialData?: Partial<ProductFormData>
  isLoading?: boolean
  isEdit?: boolean
}

export function ProductForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
  isEdit = false,
}: ProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productRequestSchema),
    defaultValues: {
      product_name: initialData?.product_name || '',
      product_code: initialData?.product_code || '',
      company_name: initialData?.company_name || '',
      activate: initialData?.activate || 1,
      product_type_code: initialData?.product_type_code || '',
      plant_id: initialData?.plant_id || '',
    },
  })

  const handleSubmit = (data: ProductFormData) => {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Product Name */}
        <FormField
          control={form.control}
          name="product_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Code */}
        <FormField
          control={form.control}
          name="product_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Code *</FormLabel>
              <FormControl>
                <Input placeholder="Enter product code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Plant */}
        <FormField
          control={form.control}
          name="plant_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plant *</FormLabel>
              <SelectPlant
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Type Code */}
        <FormField
          control={form.control}
          name="product_type_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type Code *</FormLabel>
              <FormControl>
                <Input placeholder="Enter product type code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Activate Status */}
        <FormField
          control={form.control}
          name="activate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status *</FormLabel>
              <FormControl>
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex items-center gap-3 pt-6">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingText={isEdit ? 'Updating...' : 'Creating...'}
          >
            {isEdit ? 'Update Product' : 'Create Product'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
