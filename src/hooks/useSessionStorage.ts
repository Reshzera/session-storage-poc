import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

type UseSessionStorageReturn<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  () => void,
]

function readStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue
  }

  const item = window.sessionStorage.getItem(key)

  if (item === null) {
    return initialValue
  }

  try {
    return JSON.parse(item) as T
  } catch {
    return initialValue
  }
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): UseSessionStorageReturn<T> {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initialValue))

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  const removeValue = () => {
    window.sessionStorage.removeItem(key)
    setValue(initialValue)
  }

  return [value, setValue, removeValue]
}
