import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoadingButton } from '@/components/common/loading'
import { SelectCategory } from '@/components/common/dialog-select'
import {
  useAddMaterial,
  useUpdateMaterial,
} from '../hooks/use-raw-material-mutations'
import { useGetPlants } from '../../plants/hooks/use-plants'
import {
  rawMaterialRequestSchema,
  RawMaterialRequestType,
  DetailMaterialType,
} from '../types/raw-material.type'

interface RawMaterialFormProps {
  initialData?: DetailMaterialType
  onSuccess?: () => void
  onCancel?: () => void
  isEditMode?: boolean
}

export function RawMaterialForm({
  initialData,
  onSuccess,
  onCancel,
  isEditMode = false,
}: RawMaterialFormProps) {
  // Helper function to convert category display to API format
  const getCategoryId = (category: string | undefined) => {
    if (!category) return ''
    // If it's already an ID (numeric string), use it; otherwise it might be a category name
    // For now, return as-is since we'll use the SelectCategory component which handles IDs
    return category
  }

  // Fetch plants for checkbox selection (fetch early to use in default values)
  const { data: plantsData, isLoading: plantsLoading } = useGetPlants()

  // Helper function to convert plant names to IDs for existing data
  const getPlantIds = useCallback(
    (plants: string[] | undefined): string[] => {
      if (!plants || !plantsData?.data) return []

      return plants
        .map((plantValue) => {
          // If it's already an ID (numeric string), use it
          if (/^\d+$/.test(plantValue)) {
            return plantValue
          }

          // If it's a plant name, find the corresponding ID
          const plant = plantsData.data.find((p) => p.plant_name === plantValue)
          return plant ? plant.id.toString() : plantValue
        })
        .filter(Boolean)
    },
    [plantsData?.data]
  )

  const form = useForm<RawMaterialRequestType>({
    resolver: zodResolver(rawMaterialRequestSchema),
    defaultValues: {
      material_name: initialData?.material_name || '',
      formula: initialData?.formula || '',
      description: '',
      category_id: getCategoryId(initialData?.category?.id.toString() || ''),
      plants: [],
    },
  })

  const createMutation = useAddMaterial()
  const updateMutation = useUpdateMaterial(Number(initialData?.id) || 0)

  const isLoading = createMutation.isPending || updateMutation.isPending

  // Update plants field when plants data is loaded and we have initial data
  useEffect(() => {
    if (plantsData?.data && initialData?.plants) {
      const plantIds = getPlantIds(
        initialData.plants?.map((p) => p.id.toString())
      )
      form.setValue('plants', plantIds)
    } else if (plantsData?.data && !initialData?.plants) {
      console.log(
        'Raw Material Form - No initial plants data, keeping empty array'
      )
      form.setValue('plants', [])
    }
  }, [plantsData, initialData?.plants, form, getPlantIds])

  const onSubmit = async (data: RawMaterialRequestType) => {
    console.log('Raw Material Form - Submitting data:', data)
    console.log('Raw Material Form - Plants selected:', data.plants)

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

  const availablePlants = plantsData?.data || []

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Material Name */}
          <FormField
            control={form.control}
            name="material_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter material name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Formula */}
          <FormField
            control={form.control}
            name="formula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Formula</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter chemical formula (e.g., H2SO4)"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <SelectCategory
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select category"
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter material description (optional)"
                  rows={3}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Plants Selection */}
        <FormField
          control={form.control}
          name="plants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Associated Plants *</FormLabel>
              <div className="text-sm text-muted-foreground mb-3">
                Select which plants use this material
              </div>
              {plantsLoading ? (
                <div className="flex items-center gap-2 py-4">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                  Loading plants...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availablePlants.map((plant) => (
                    <div key={plant.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`plant-${plant.id}`}
                        checked={field.value.includes(plant.id.toString())}
                        onCheckedChange={(checked) => {
                          console.log(
                            `Plant ${plant.plant_name} (ID: ${plant.id}) ${checked ? 'checked' : 'unchecked'}`
                          )
                          console.log('Current field value:', field.value)

                          if (checked) {
                            const newValue = [
                              ...field.value,
                              plant.id.toString(),
                            ]
                            console.log('New value after adding:', newValue)
                            field.onChange(newValue)
                          } else {
                            const newValue = field.value.filter(
                              (p) => p !== plant.id.toString()
                            )
                            console.log('New value after removing:', newValue)
                            field.onChange(newValue)
                          }
                        }}
                        disabled={isLoading}
                      />
                      <label
                        htmlFor={`plant-${plant.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {plant.plant_name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
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
            {isEditMode ? 'Update Material' : 'Create Material'}
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
