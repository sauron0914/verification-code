export interface InputChangeVal {
  handleType: 'clear' | 'next' | 'focus'
  index: number
  value?: string
}

export interface IInput {
  onChange: (val: InputChangeVal) => void
  isFocus: boolean
  index: number
  type: 'text' | 'number' | 'tel'
  value: string
}
