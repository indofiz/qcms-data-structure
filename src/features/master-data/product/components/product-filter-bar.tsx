import {
  Search,
  X,
  Filter,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useProductFilterStore } from '../store'
import { useDebounce } from '@/shared/hooks/use-debounce'
import { useGetPlants } from '../hooks'
import { useEffect, useState } from 'react'

interface ProductFilterBarProps {
  showFiltersButton?: boolean
}

export function ProductFilterBar({
  showFiltersButton = true,
}: ProductFilterBarProps) {
  const {
    search,
    plant,
    activate,
    setSearch,
    setPlant,
    setActivate,
    resetFilter,
  } = useProductFilterStore()

  // Fetch plant data
  const { data: plantsData, isLoading: plantsLoading } = useGetPlants()

  // State for showing typing indicator and filter visibility
  const [isTyping, setIsTyping] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const debouncedSearch = useDebounce(search, 500)

  // Reset showFilters when showFiltersButton is disabled
  useEffect(() => {
    if (!showFiltersButton && showFilters) {
      setShowFilters(false)
    }
  }, [showFiltersButton, showFilters])

  // Track typing state
  useEffect(() => {
    if (search !== debouncedSearch) {
      setIsTyping(true)
    } else {
      setIsTyping(false)
    }
  }, [search, debouncedSearch])

  // Count active filters
  const activeFiltersCount = [plant, activate].filter(Boolean).length

  const handleClearSearch = () => {
    setSearch('')
  }

  const handleClearAll = () => {
    resetFilter()
  }

  return (
    <div className="space-y-4">
      {/* Search Bar with Filter Toggle Button */}
      <div
        className={`flex ${showFiltersButton ? 'flex-col md:flex-row' : 'flex-row'} items-center gap-3`}
      >
        <div className="relative flex-1 w-full">
          {isTyping ? (
            <span className="absolute flex items-center justify-center left-3 top-0 bottom-0 w-4 transform text-muted-foreground">
              <Loader2 className="h-4 w-4  animate-spin" />
            </span>
          ) : (
            <div className="absolute flex items-center justify-center left-3 top-0 bottom-0 w-4 transform text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
          )}
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-10 w-full"
          />
          {search && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Filter Toggle Button - Only show if showFiltersButton is true */}
        {showFiltersButton && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center w-full md:w-auto py-4 gap-2 min-w-[120px]"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs h-5 px-1.5">
                {activeFiltersCount}
              </Badge>
            )}
            {showFilters ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Collapsible Filters Row - Only show if showFiltersButton is true */}
      {showFiltersButton && showFilters && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/30 rounded-lg border animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" />
            Filter by:
          </div>

          {/* Plant Filter */}
          <Select
            value={plant || 'all'}
            onValueChange={(value) =>
              setPlant(value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Plant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plants</SelectItem>
              {plantsLoading ? (
                <SelectItem value="" disabled>
                  Loading...
                </SelectItem>
              ) : (
                plantsData?.data?.map((plantItem) => (
                  <SelectItem key={plantItem.id} value={plantItem.plant_name}>
                    {plantItem.plant_name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Activate Filter */}
          <Select
            value={activate?.toString() || 'all'}
            onValueChange={(value) =>
              setActivate(value === 'all' ? undefined : Number(value))
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="1">Active</SelectItem>
              <SelectItem value="0">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear All Button */}
          {(search || activeFiltersCount > 0) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="ml-auto"
            >
              <X className="mr-1 h-3 w-3" />
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
