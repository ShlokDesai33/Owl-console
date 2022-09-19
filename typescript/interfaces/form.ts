export type Option = {
  value: string
  priceAddition: number
}

export type CustomField = {
  // name of field
  name: string
  content: Option[]
  type: 'text' | 'radio' | 'checkbox'
}