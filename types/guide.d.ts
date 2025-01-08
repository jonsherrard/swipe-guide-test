export type Guide = {
  time: number
  url: string
  mainTask: string
  mainTaskSummary: string
  categories: string[]
  ingredients: string[]
  requirements: string[]
  tips: string[]
  views: number
  authorsCount: number
  id: number
  href?: string
  steps?: {
    Headline: string
    Description: string
    Links: string[]
  }[]
}
