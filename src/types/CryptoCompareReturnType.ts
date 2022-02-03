export interface NewsReturn {
  Type: number
  Message: string
  Promoted: any[]
  Data: NewsData[]
  RateLimit: RateLimit
  HasWarning: boolean
}

export interface NewsData {
  id: string
  guid: string
  published_on: number
  imageurl: string
  title: string
  url: string
  source: string
  body: string
  tags: string
  categories: string
  upvotes: string
  downvotes: string
  lang: string
  source_info: SourceInfo
}

export interface SourceInfo {
  name: string
  lang: string
  img: string
}

export interface RateLimit {}

export interface CategoryReturn {
  categoryName: string
  wordsAssociatedWithCategory: string[]
  excludedPhrases?: string[]
  includedPhrases?: string[]
}

export interface FeedReturn {
  key: string
  name: string
  lang: string
  img: string
}

export interface FeedAndCategoryReturn {
  Response: string
  Message: string
  HasWarning: boolean
  Type: number
  RateLimit: RateLimit
  Data: FeedAndCategoryData
}

export interface FeedAndCategoryData {
  Categories: CategoryReturn[]
  Feeds: FeedReturn[]
}

