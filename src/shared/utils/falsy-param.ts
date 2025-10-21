/**
 * Efficiently filters out falsy values from an object's parameters
 * @param params - Object containing key-value pairs to filter
 * @returns New object with only truthy values (excludes null, undefined, empty strings, and optionally empty arrays)
 */
export const filterFalsyParams = <T extends Record<string, unknown>>(
  params: T,
  options: {
    excludeEmptyArrays?: boolean
    excludeZero?: boolean
  } = {}
): Partial<T> => {
  const { excludeEmptyArrays = false, excludeZero = false } = options
  const result: Partial<T> = {}

  for (const [key, value] of Object.entries(params)) {
    // Skip null and undefined
    if (value === null || value === undefined) continue
    
    // Skip empty strings
    if (value === '') continue
    
    // Optionally skip zero values
    if (excludeZero && value === 0) continue
    
    // Optionally skip empty arrays
    if (excludeEmptyArrays && Array.isArray(value) && value.length === 0) continue
    
    // Include all other values (including false, 0 by default)
    result[key as keyof T] = value as T[keyof T]
  }

  return result
}

/**
 * Legacy version for backward compatibility
 * @deprecated Use the main filterFalsyParams function instead
 */
export const filterFalsyParamsLegacy = (
  params: Record<string, unknown>
): Record<string, unknown> => {
  return filterFalsyParams(params)
}
