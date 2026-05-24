export interface GuideSection {
  id: string
  title: string
  content: string
}

export interface Guide {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  author: string
  tags: string[]
  sections: GuideSection[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
}

export interface RFQFormData {
  name: string
  email: string
  company: string
  industry: string
  projectDescription: string
  timeline: string
  budget: string
  additionalInfo: string
}
