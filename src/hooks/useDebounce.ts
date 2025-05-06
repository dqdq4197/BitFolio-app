import { useEffect, useState } from 'react'

const useDebounce = <S = undefined>(value: S, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<S>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [delay, value])

  return debouncedValue
}

export default useDebounce
