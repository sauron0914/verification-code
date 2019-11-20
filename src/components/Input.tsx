import React, { useRef, useEffect, useState } from 'react'
import { IInput } from './Type/Input.type'
// import '../css/Input.scss'

const Input: React.FC<IInput> = ({
  onChange,
  isFocus,
  index,
  type = 'text',
  value = '',
}) => {
  const InputRef = useRef<HTMLInputElement>(null)
  const [oldVal, setOldVal] = useState('')
  const setVal = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    InputRef.current && InputRef.current.blur()
    const eVal = e.target.value
    const _value = (e.target.value = eVal
      .replace(oldVal, '')
      .replace(/[\W]/, '')
      .substring(0, 1))
    if (_value) {
      onChange({
        handleType: 'next',
        index: i,
        value: _value,
      })
    }
    setOldVal(_value)
  }

  useEffect(() => {
    if (isFocus) {
      InputRef.current && InputRef.current.focus()
    }
  })

  const keydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Backspace') return
    onChange({
      handleType: 'clear',
      index,
    })
  }
  const setFocus = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const _value = e.target.value.replace(/[\W]/, '')
    onChange({
      handleType: 'focus',
      index: i,
      value: _value,
    })
  }
  return (
    <>
      <input
        autoComplete="new-password"
        autoFocus={isFocus}
        ref={InputRef}
        value={value}
        className="active-code-input"
        type={type}
        onFocus={setFocus.bind(null, index)}
        onChange={setVal.bind(null, index)}
        onKeyDown={keydown}
        onPaste={e => {
          e.preventDefault()
        }}
      />
    </>
  )
}

export default Input
