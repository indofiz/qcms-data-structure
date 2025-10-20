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
import { AnalysisParameterType } from '../types'

interface AnalysisParameterDataTableProps {
  records: AnalysisParameterType[]
  onEdit?: (parameter: AnalysisParameterType) => void
  onDelete?: (parameter: AnalysisParameterType) => void
  isLoading?: boolean
}

export function AnalysisParameterDataTable({
  records,
  onEdit,
  onDelete,
  isLoading = false
}: AnalysisParameterDataTableProps) {

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" text="Loading analysis parameters..." />
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <EmptyState
        title="No analysis parameters found"
        description="No analysis parameters available in the system."
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
            <TableHead>Parameter Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((parameter) => (
            <TableRow
              key={parameter.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <Badge variant="outline" className="font-mono text-xs">
                  #{parameter.id}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{parameter.parameter_name}</div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(parameter)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit analysis parameter</span>
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(parameter)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete analysis parameter</span>
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