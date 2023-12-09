import storage from '@/utils/storage'
import { useCallback, useEffect, useRef, useState } from 'react'

interface LocalStorageItem {
  key: string
  seconds: number
  isRunning: boolean
}
const MainKey = 'lastCountDownWithCache'

export function useCountDownWithCache(key: string, lastSecond = 60) {
  let cache
  try {
    cache = (storage.getItem(MainKey) as LocalStorageItem) || null
  } catch (error) {
  }
  const [seconds, setSeconds] = useState(cache?.seconds ?? false)
  const [isRunning, setIsRunning] = useState(cache?.isRunning ?? false)

  useEffect(() => {
    let intervalId
    if (isRunning && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    } else {
      clearCountDown()
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [seconds, isRunning])

  const startCountDown = () => {
    setIsRunning(true)
    setSeconds(lastSecond)
  }

  const clearCountDown = () => {
    setIsRunning(false)
    storage.clearItem(MainKey)
  }

  useEffect(() => {
    storage.setItem(MainKey, { key, seconds, isRunning })
  }, [seconds, key, isRunning])

  return { seconds, isRunning, startCountDown }
}
