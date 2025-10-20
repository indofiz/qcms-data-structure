import { Edit, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/common/empty-state'
import { LoadingSpinner } from '@/components/common/loading'
import { PlantType } from '../types'

interface PlantsDataTableProps {
  records: PlantType[]
  onEdit?: (plant: PlantType) => void
  onDelete?: (plant: PlantType) => void
  isLoading?: boolean
}

export function PlantsDataTable({
  records,
  onEdit,
  onDelete,
  isLoading = false
}: PlantsDataTableProps) {

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading plants..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No plants found"
        description="No plants available in the system."
        action={
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        }
      />
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Plant Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((plant) => (
            <TableRow
              key={plant.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <Badge variant="outline" className="font-mono text-xs">
                  #{plant.id}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{plant.plant_name}</div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(plant)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit plant</span>
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(plant)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete plant</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}