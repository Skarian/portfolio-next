import { useState, useEffect } from "react"

function useWindowSize() {
  const isWindowClient = typeof window === "object"

  const [windowSize, setWindowSize] = useState(
    isWindowClient ? window.innerWidth : undefined
  )

  //👇
  useEffect(() => {
    //a handler which will be called on change of the screen resize
    function setSize() {
      setWindowSize(window.innerWidth)
    }

    if (isWindowClient) {
      //register the window resize listener
      window.addEventListener("resize", setSize)

      //un-register the listener
      return () => window.removeEventListener("resize", setSize)
    }
  }, [isWindowClient, setWindowSize])
  //☝️

  if (windowSize >= 1920) {
    return "xl"
  } else if (windowSize >= 1280) {
    return "lg"
  } else if (windowSize >= 960) {
    return "md"
  } else if (windowSize >= 600) {
    return "sm"
  } else {
    return "xs"
  }
}

export default useWindowSize
