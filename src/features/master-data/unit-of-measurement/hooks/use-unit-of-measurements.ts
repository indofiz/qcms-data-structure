import { useQuery } from '@tanstack/react-query'
import { getAllUnitOfMeasurements, getUnitOfMeasurementById } from '../services'

const UNIT_OF_MEASUREMENTS_QUERY_KEY = 'unit-of-measurements'

export const useGetUnitOfMeasurements = () => {
  return useQuery({
    queryKey: [UNIT_OF_MEASUREMENTS_QUERY_KEY],
    queryFn: getAllUnitOfMeasurements,
  })
}

export const useGetUnitOfMeasurement = (id: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [UNIT_OF_MEASUREMENTS_QUERY_KEY, id],
    queryFn: () => getUnitOfMeasurementById(id),
    enabled: options?.enabled ?? !!id,
  })
}