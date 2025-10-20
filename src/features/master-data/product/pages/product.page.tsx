import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { PageHeader } from '@/components/common/section'
import { Pagination } from '@/components/common/pagination'
import {
  ProductDataTable,
  ProductFilterBar,
  ProductForm,
  ProductDeleteDialog,
  ProductDetailDialog,
} from '../components'
import { useProductFilterStore } from '../store'
import {
  useGetProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../hooks'
import { ProductType, ProductRequestType } from '../types'

export function ProductPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRecord, setDeleteRecord] = useState<ProductType | null>(null)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [editRecord, setEditRecord] = useState<ProductType | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [detailRecord, setDetailRecord] = useState<ProductType | null>(null)

  const filter = useProductFilterStore()
  const { data, isLoading } = useGetProducts({ filter })
  const addMutation = useAddProduct()
  const updateMutation = useUpdateProduct(
    editRecord?.id ? Number(editRecord.id) : 0
  )
  const deleteMutation = useDeleteProduct()

  // Handle view product details
  const handleViewProduct = (product: ProductType) => {
    setDetailRecord(product)
    setDetailDialogOpen(true)
  }

  // Handle edit product
  const handleEditProduct = (product: ProductType) => {
    setEditRecord(product)
    setFormDialogOpen(true)
  }

  // Handle delete product
  const handleDeleteProduct = (product: ProductType) => {
    setDeleteRecord(product)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteRecord) return

    try {
      await deleteMutation.mutateAsync(Number(deleteRecord.id))
      toast.success(`Product ${deleteRecord.product_name} deleted successfully`)
      setDeleteDialogOpen(false)
      setDeleteRecord(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete product')
    }
  }

  // Handle create new product
  const handleCreateNew = () => {
    setEditRecord(null)
    setFormDialogOpen(true)
  }

  // Handle form submit
  const handleFormSubmit = async (data: ProductRequestType) => {
    try {
      if (editRecord) {
        // Update existing product
        await updateMutation.mutateAsync(data)
        toast.success('Product updated successfully')
      } else {
        // Create new product
        await addMutation.mutateAsync(data)
        toast.success('Product created successfully')
      }
      setFormDialogOpen(false)
      setEditRecord(null)
    } catch (error) {
      console.error('Form submit error:', error)
      toast.error(`Failed to ${editRecord ? 'update' : 'create'} product`)
    }
  }

  // Handle form cancel
  const handleFormCancel = () => {
    setFormDialogOpen(false)
    setEditRecord(null)
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    filter.setPage(page)
  }

  // Calculate total pages
  const totalPages = data?.data?.pagination?.total
    ? Math.ceil(data.data.pagination.total / filter.per_page)
    : 1

  const headerActions = (
    <>
      <button
        onClick={handleCreateNew}
        className="w-full mb-4 md:mb-0 md:w-auto inline-flex justify-center md:justify-start items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Create Product
      </button>
    </>
  )

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      <Card className="shadow-none border-none">
        <PageHeader
          title="Products"
          description="Manage and view all product information and specifications"
          actions={headerActions}
        />
        <div className="p-0 pb-6 md:pb-2 pt-0 md:pt-2 md:px-2">
          <ProductFilterBar showFiltersButton={true} />
        </div>
        <CardContent className="pt-4 p-0 md:p-2">
          <ProductDataTable
            records={data?.data?.data ?? []}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            isLoading={isLoading}
          />

          {isLoading ? null : (
            <Pagination
              currentPage={data?.data?.pagination?.current_page || 1}
              totalPages={totalPages}
              totalItems={data?.data?.pagination?.total || 0}
              itemsPerPage={filter.per_page}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ProductDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open)
          if (!open) setDeleteRecord(null)
        }}
        record={deleteRecord}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />

      {/* Product Form Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editRecord ? 'Edit Product' : 'Create New Product'}
            </DialogTitle>
            <DialogDescription>
              {editRecord
                ? 'Update the product information below.'
                : 'Fill in the details to create a new product.'}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            initialData={
              editRecord
                ? {
                    product_name: editRecord.product_name,
                    product_code: editRecord.product_code,
                    company_name: editRecord.company_name,
                    activate: editRecord.activate === 'active' ? 1 : 0,
                    product_type_code: editRecord.product_type_code,
                    plant_id: editRecord.plant.id.toString(),
                  }
                : undefined
            }
            isLoading={
              editRecord ? updateMutation.isPending : addMutation.isPending
            }
            isEdit={!!editRecord}
          />
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <ProductDetailDialog
        record={detailRecord}
        open={detailDialogOpen}
        onOpenChange={(open) => {
          setDetailDialogOpen(open)
          if (!open) setDetailRecord(null)
        }}
      />
    </div>
  )
}
