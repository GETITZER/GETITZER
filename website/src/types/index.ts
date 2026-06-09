export interface ProductSpec {
  label: string
  value: string
}

export interface ProductVariant {
  name: string
  subtitle: string
  color: string
  desc: string
  applications: string[]
}

export interface Product {
  id: string
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  useCase: string
  specs: ProductSpec[]
  industries: string[]
  compliance: string[]
  icon: string
  image?: string
  imageAlt?: string
  badge?: string
  badgeColor?: 'isa' | 'brand' | 'green' | 'red'
  highlights?: string[]
  variants?: ProductVariant[]
  featured?: boolean
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
  valveType: string
  application: string
  fluidType: string
  sizeRange: string
  pressureClass: string
  quantity: string
  timeline: string
  additionalInfo: string
}
