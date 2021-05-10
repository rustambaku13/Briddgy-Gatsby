import { Box, Text } from "@chakra-ui/layout"
import React, { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js"
export const TextAnimate = ({ texts, delay, ...props }) => {
  const ref = useRef(null)

  const [timer, setTimer] = useState(null)
  const index = useRef(0)
  const normalDiretion = useRef(false)
  useEffect(() => {
    const a = anime({
      targets: ref.current,
      width: ["100%", "0%"],
      direction: "alternate",
      loop: true,
      easing: "steps(30)",
      delay,
      loopBegin: function (anim) {
        if (normalDiretion.current) normalDiretion.current = false
        else return (normalDiretion.current = true)
        if (index.current == texts.length - 1) index.current = 0
        else index.current++
        ref.current.innerHTML = texts[index.current]
      },
    })
    return () => {
      a.pause()
    }
  }, [])
  return (
    <Box d="inline-flex">
      <div className="typewriter">
        <Text ref={ref} fontWeight="700" as="span" {...props}>
          {texts[0]}
        </Text>
      </div>
    </Box>
  )
}
