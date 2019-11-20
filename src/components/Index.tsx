import React, { useCallback, useState, useEffect } from 'react'
import { InputChangeVal } from './Type/Input.type'
import Input from './Input'

export interface VerifationCodeProps {
  onGetVerifationCode: (value: string) => void
  len?: number
  autoFocus?: boolean
  type?: 'text' | 'number' | 'tel'
  defaultValue?: string
}

function getInitArr(len: number) {
  const temp: string[] = []
  temp.length = len
  return temp.fill(' ').join('')
}

const VerifationCode: React.FC<VerifationCodeProps> = ({
  onGetVerifationCode,
  len = 4,
  autoFocus = true,
  type = 'text',
  defaultValue = '',
}) => {
  const initArr = getInitArr(len)
  const [verifationCode, setVerifationCode] = useState<string>(defaultValue)
  const [currentIndex, setCurrentIndex] = useState<number>(autoFocus ? 0 : -1)
  const setVal = useCallback(
    (val: InputChangeVal) => {
      const { index, handleType, value } = val
      if (handleType === 'clear' && index !== 0) {
        setCurrentIndex(index - 1)
        setVerifationCode(verifationCode.substr(0, index))
      } else if (handleType === 'focus') {
        setCurrentIndex(index)
      } else if (handleType === 'next') {
        setCurrentIndex(index + 1)
        setVerifationCode(
          verifationCode.substr(0, index) +
            value +
            verifationCode.substr(index + 1),
        )
      }
    },
    [verifationCode],
  )

  useEffect(() => {
    !!verifationCode && onGetVerifationCode(verifationCode)
  }, [onGetVerifationCode, verifationCode])

  return (
    <div className="active-store">
      {initArr.split('').map((item, index) => {
        return (
          <Input
            isFocus={currentIndex === index}
            index={index}
            value={verifationCode[index]}
            key={index}
            onChange={setVal}
            type={type}
          />
        )
      })}
    </div>
  )
}

export default VerifationCode
