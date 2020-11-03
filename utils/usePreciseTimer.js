// Hook Definition: usePreciseTimer = (handler, periodInMilliseconds, activityFlag)
// This hook expects us to pass it a handler, something it can run every interval - periodInMilliseconds, and it should only run it if the activityFlag evaluates to true.

import { useEffect, useRef, useState } from "react"

const usePreciseTimer = (handler, periodInMilliseconds, activityFlag) => {
  const [timeDelay, setTimeDelay] = useState(1)
  const savedCallback = useRef()
  const initialTime = useRef()

  useEffect(() => {
    savedCallback.current = handler
  }, [handler])

  useEffect(() => {
    if (activityFlag) {
      initialTime.current = new Date().getTime()
      const id = setInterval(() => {
        const currentTime = new Date().getTime()
        const delay = currentTime - initialTime.current
        initialTime.current = currentTime
        setTimeDelay(delay / 1000)
        savedCallback.current(timeDelay)
      }, periodInMilliseconds)

      return () => {
        clearInterval(id)
      }
    }
  }, [periodInMilliseconds, activityFlag, timeDelay])
}

export default usePreciseTimer
