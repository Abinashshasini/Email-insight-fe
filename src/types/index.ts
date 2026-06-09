export type InsightType = 'flight' | 'finance' | 'movie' | 'delivery' | 'hotel' | 'shopping' | 'social' | 'promo'
export type ChipVariant = InsightType

export interface Insight {
  id: string
  type: InsightType
  data: Record<string, unknown>
  sender: string
  subject: string
  extractedAt: string
  confidence: number
}

export interface Email {
  id: string
  sender: string
  subject: string
  receivedAt: string
  score: number
}

export interface TimelineEvent {
  id: string
  bucket: string
  time: string
  type: InsightType
  title: string
  subtitle: string
  urgent: boolean
  past: boolean
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  usedInsights?: string[]
}
