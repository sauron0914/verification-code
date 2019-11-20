import React from 'react'

interface VerifationCodeProps {
  onGetVerifationCode: (value: string) => void
  len?: number
  autoFocus?: boolean
  type?: 'text' | 'number' | 'tel'
  defaultValue?: string
}
declare const VerifationCode: React.FC<VerifationCodeProps>

export default VerifationCode
export { VerifationCodeProps }
