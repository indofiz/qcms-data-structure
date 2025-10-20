/**
 * Utility function to filter out falsy parameters
 * Removes undefined, null, and empty string values from objects
 */

export const filterFalsyParams = (params: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      if (value === undefined || value === null || value === '') {
        return false
      }
      return true
    })
  )
}
