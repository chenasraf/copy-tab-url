import React from 'react'
import { useStorageLocal } from './useStorageLocal'

export type Options = {
  customButtons: CustomButton[]
}

export type CustomButton = {
  label: string
  format: string
}

export function useOptions() {
  const [options, setOptions] = useStorageLocal<Options>({
    key: 'options',
    initialValue: { customButtons: [] },
  })
  const setOption = React.useCallback(
    function <K extends keyof Options>(key: K, value: Options[K]) {
      console.log('setOption', key, value, options)
      setOptions({ ...(options as Options), [key]: value as never })
    },
    [options, setOptions],
  )
  return {
    options: options!,
    setOption,
    setOptions,
  }
}
