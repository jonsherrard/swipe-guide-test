import type { Guide } from '@/types/guide'
import type { Href } from 'expo-router'

export const dataTransferObject = (apiResponse: any): Guide[] => {
  return apiResponse.map((guide: any) => ({
    id: guide.Id,
    mainTask: guide.MainTask,
    mainTaskSummary: guide.MainTaskSummary,
    categories: guide.Categories,
    ingredients: guide.Ingredients,
    requirements: guide.Requirements,
    tips: guide.Tips,
    views: guide.Views,
    authorsCount: guide.AuthorsCount,
    href: `/guides/${String(guide.Id)}` as Href,
  }))
}