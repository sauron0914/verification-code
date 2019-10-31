import React, { useRef, useEffect, useState } from 'react'
import { IInput } from './Type/Input.type'
// import '../css/Input.scss'

const Input: React.FC<IInput> = ({ onChange, isFocus, index }) => {
  const InputRef = useRef<HTMLInputElement>(null)
  const [oldVal, setOldVal] = useState('')
  const setVal = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    InputRef.current && InputRef.current.blur()
    const eVal = e.target.value
    const value = (e.target.value = eVal
      .replace(oldVal, '')
      .replace(/[\W]/, '')
      .substring(0, 1))
    if (value) {
      onChange({
        type: 'next',
        index: i,
        value,
      })
    }
    setOldVal(value)
  }

  useEffect(() => {
    if (isFocus) {
      InputRef.current && InputRef.current.focus()
    }
  })

  const keydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Backspace') return
    onChange({
      type: 'clear',
      index,
    })
  }
  const setFocus = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[\W]/, '')
    onChange({
      type: 'focus',
      index: i,
      value,
    })
  }
  return (
    <>
      <input
        autoComplete="new-password"
        autoFocus={isFocus}
        ref={InputRef}
        className="active-code-input"
        type="text"
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
