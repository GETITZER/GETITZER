export interface ProductSpec {
  label: string
  value: string
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
