export interface InputChangeVal {
  type: 'clear' | 'next' | 'focus'
  index: number
  value?: string
}

export interface IInput {
  onChange: (val: InputChangeVal) => void
  isFocus: boolean
  index: number
}
