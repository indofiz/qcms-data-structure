import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  SelectProvince,
  SelectCity,
  SelectDistrict,
  SelectSubdistrict,
} from '@/components/common/dialog-select'
import {
  useAddSupplier,
  useUpdateSupplier,
  DetailSupplierType,
  SupplierType,
  SupplierRequestType,
} from '../'

// Validation schema
const formSchema = z.object({
  supplier_name: z.string().min(1, 'Supplier name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  province_id: z.string().min(1, 'Province is required'),
  city_id: z.string().min(1, 'City is required'),
  district_id: z.string().min(1, 'District is required'),
  sub_district_id: z.string().min(1, 'Sub district is required'),
  address: z.string().min(1, 'Address is required'),
})

export type SupplierFormData = z.infer<typeof formSchema>

interface SupplierFormProps {
  initialData?: DetailSupplierType | SupplierType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function SupplierForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false,
}: SupplierFormProps) {
  // State for location cascade
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('')
  const [selectedCityId, setSelectedCityId] = useState<string>('')
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('')

  // Helper function to extract location IDs from nested objects
  const extractLocationIds = (
    data: DetailSupplierType | SupplierType | undefined
  ) => {
    if (!data) return {}

    // For DetailSupplierType (with nested objects), extract IDs
    if (typeof data.province === 'object' && data.province) {
      return {
        province_id: data.province.id?.toString() || '',
        city_id: typeof data.city === 'object' && data.city ? data.city.id?.toString() || '' : '',
        district_id: typeof data.district === 'object' && data.district ? data.district.id?.toString() || '' : '',
        sub_district_id: typeof data.sub_district === 'object' && data.sub_district ? data.sub_district.id?.toString() || '' : '',
      }
    }

    // For SupplierType (flat strings), we can't get IDs easily, so return empty
    return {
      province_id: '',
      city_id: '',
      district_id: '',
      sub_district_id: '',
    }
  }

  const locationIds = extractLocationIds(initialData)

  const form = useForm<SupplierFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier_name: initialData?.supplier_name || '',
      phone: initialData?.phone || '',
      email: initialData?.email || '',
      province_id: locationIds.province_id || '',
      city_id: locationIds.city_id || '',
      district_id: locationIds.district_id || '',
      sub_district_id: locationIds.sub_district_id || '',
      address: initialData?.address || '',
    },
  })

  // Initialize state from form values
  useEffect(() => {
    if (locationIds.province_id) {
      setSelectedProvinceId(locationIds.province_id)
      setSelectedCityId(locationIds.city_id)
      setSelectedDistrictId(locationIds.district_id)
    }
  }, [locationIds.province_id, locationIds.city_id, locationIds.district_id])

  const createMutation = useAddSupplier()
  const updateMutation = useUpdateSupplier(Number(initialData?.id) || 0)

  const isLoading = createMutation.isPending || updateMutation.isPending

  // Handle location cascade changes
  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvinceId(provinceId)
    setSelectedCityId('')
    setSelectedDistrictId('')
    form.setValue('province_id', provinceId)
    form.setValue('city_id', '')
    form.setValue('district_id', '')
    form.setValue('sub_district_id', '')
  }

  const handleCityChange = (cityId: string) => {
    setSelectedCityId(cityId)
    setSelectedDistrictId('')
    form.setValue('city_id', cityId)
    form.setValue('district_id', '')
    form.setValue('sub_district_id', '')
  }

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId)
    form.setValue('district_id', districtId)
    form.setValue('sub_district_id', '')
  }

  const handleSubdistrictChange = (subdistrictId: string) => {
    form.setValue('sub_district_id', subdistrictId)
  }

  const onSubmit = async (data: SupplierFormData) => {
    try {
      if (isEditMode && initialData?.id) {
        const updateData: SupplierRequestType = {
          supplier_name: data.supplier_name,
          phone: data.phone,
          email: data.email || '',
          sub_district_id: data.sub_district_id,
          address: data.address,
        }
        await updateMutation.mutateAsync(updateData)
      } else {
        const createData: SupplierRequestType = {
          supplier_name: data.supplier_name,
          phone: data.phone,
          email: data.email || '',
          sub_district_id: data.sub_district_id,
          address: data.address,
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
    form.reset()
    setSelectedProvinceId('')
    setSelectedCityId('')
    setSelectedDistrictId('')
    toast.info('Form has been reset')
  }

  const handleCancel = () => {
    form.reset()
    setSelectedProvinceId('')
    setSelectedCityId('')
    setSelectedDistrictId('')
    onCancel?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supplier Name */}
          <FormField
            control={form.control}
            name="supplier_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter supplier name"
                    {...field}
                    disabled={isLoading}
                  />
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
                  <Input
                    placeholder="Enter phone number"
                    {...field}
                    disabled={isLoading}
                  />
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        {/* Location Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Province */}
          <FormField
            control={form.control}
            name="province_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province *</FormLabel>
                <SelectProvince
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                    handleProvinceChange(value)
                  }}
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <SelectCity
                  provinceId={selectedProvinceId ? Number(selectedProvinceId) : null}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                    handleCityChange(value)
                  }}
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District */}
          <FormField
            control={form.control}
            name="district_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District *</FormLabel>
                <SelectDistrict
                  cityId={selectedCityId ? Number(selectedCityId) : null}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                    handleDistrictChange(value)
                  }}
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sub District */}
          <FormField
            control={form.control}
            name="sub_district_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub District *</FormLabel>
                <SelectSubdistrict
                  districtId={selectedDistrictId ? Number(selectedDistrictId) : null}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                    handleSubdistrictChange(value)
                  }}
                  disabled={isLoading}
                />
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
                  rows={3}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            {isEditMode ? 'Update Supplier' : 'Create Supplier'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
