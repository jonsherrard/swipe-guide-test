import type { Guide } from '@/types/guide'

export const getRelatedGuides = (
  categories: string[] | undefined,
  guides: Guide[] | undefined,
  currentGuideId: number | undefined
): Guide[] => {
  if (categories == null || categories.length === 0 || guides == null || currentGuideId == null) {
    return []
  }

  return guides.filter((guide) => {
    if (guide.id === currentGuideId) {
      return false
    }
    if (!guide.categories || guide.categories.length === 0) {
      return false
    }
    return guide.categories.some((category) => categories.includes(category))
  })
}
