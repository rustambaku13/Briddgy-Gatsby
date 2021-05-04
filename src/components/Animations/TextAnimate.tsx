import { Box, Text } from "@chakra-ui/layout"
import React, { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js"
export const TextAnimate = ({ texts, delay, ...props }) => {
  const ref = useRef(null)
  const [timer, setTimer] = useState(null)
  const index = useRef(0)
  useEffect(() => {
    const a = setInterval(() => {
      if (index.current == texts.length - 1) index.current = 0
      else index.current++
      ref.current.innerHTML = texts[index.current]
    }, delay * 1000)
    return () => {
      clearInterval(a)
    }
  }, [])
  return (
    <Box d="inline-flex">
      <div className="typewriter">
        <Text
          animation={`typing${delay} ${delay}s steps(10, end) infinite,
          blink-caret 0.75s infinite;`}
          fontWeight="700"
          as="span"
          ref={ref}
          {...props}
        >
          {texts[0]}
        </Text>
      </div>
    </Box>
  )
}
