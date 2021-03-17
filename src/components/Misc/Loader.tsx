import { Box } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import React, { Suspense, useEffect, useRef } from "react"
import anime from "animejs/lib/anime.es.js"

export const Loader = chakra(({ className }) => {
  const box = useRef(null)
  useEffect(() => {
    if (box.current) {
      anime({
        targets: ["#salams g"],
        keyframes: [
          { rotate: "5deg", translateX: 20, zoom: 0.98 },
          { translateY: 5 },
          { translateY: 0 },
          { rotate: 0, translateX: 0 },
        ],
        duration: 1300,
        delay: anime.stagger(100),
        easing: "easeInOutQuad",

        loop: true,
      })
    }
  }, [box])
  return (
    <Box w="120px" className={className}>
      <svg ref={box} width={120} height={120} viewBox="0 0 512 512">
        <defs>
          <linearGradient
            x1={0.5}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#171717" />
            <stop offset={0.048} stopColor="#0b0b0b" />
            <stop offset={0.968} stopColor="#111" />
            <stop offset={1} stopColor="#383838" />
          </linearGradient>
          <linearGradient
            x1={0.5}
            y1={1}
            x2={0.5}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#12151c" />
            <stop offset={1} stopColor="#191a1c" />
          </linearGradient>
          <filter
            x={600}
            y={163}
            width={14.5}
            height={16}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dx={0.5} />
            <feGaussianBlur result="blur" />
            <feFlood floodColor="#fff" floodOpacity={0.102} />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient
            x1={0.097}
            y1={0.07}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#191a1f" />
            <stop offset={1} stopColor="#2d2e30" />
          </linearGradient>
          <linearGradient
            x1={0.5}
            y1={1}
            x2={0.5}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#1d1c21" />
            <stop offset={1} stopOpacity={0.737} />
          </linearGradient>
          <filter
            x={350.738}
            y={181}
            width={21.779}
            height={23.728}
            filterUnits="userSpaceOnUse"
          >
            <feOffset />
            <feGaussianBlur result="blur-2" />
            <feFlood floodOpacity={0.102} />
            <feComposite operator="in" in2="blur-2" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            x={351.674}
            y={182.31}
            width={19.885}
            height={21.195}
            filterUnits="userSpaceOnUse"
          >
            <feOffset />
            <feGaussianBlur result="blur-3" />
            <feFlood floodOpacity={0.8} />
            <feComposite operator="in" in2="blur-3" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient
            id="b"
            x1={0.5}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#41b2d6" />
            <stop offset={1} stopColor="#2e6991" />
          </linearGradient>
          <filter
            id="c"
            x={1.783}
            y={190.317}
            width={87.14}
            height={129.58}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-4" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-4" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="d"
            x={80.842}
            y={174.27}
            width={108.681}
            height={146.107}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-5" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-5" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="e"
            x={166.98}
            y={185.09}
            width={156.896}
            height={124.962}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-6" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-6" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="f"
            x={247.26}
            y={184.616}
            width={178.5}
            height={135.896}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-7" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-7" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="g"
            x={417.006}
            y={183.627}
            width={88.699}
            height={131.806}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-8" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-8" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="h"
            x={94.601}
            y={197.46}
            width={89.908}
            height={122.286}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-9" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-9" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="i"
            x={170.826}
            y={196.484}
            width={202.939}
            height={122.371}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-10" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-10" />
            <feComposite in="SourceGraphic" />
          </filter>
          <clipPath id="a">
            <path d="M0 0H512V512H0z" />
          </clipPath>
        </defs>
        <g clipPath="url(#a)">
          <path data-name="Rectangle 55" fill="none" d="M0 0H512V512H0z" />
          <g id="salams" data-name="Group 19">
            <path
              data-name="Path 84"
              d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0z"
              transform="translate(-3955 -870.986) translate(3955 870.987)"
              fill="url(#b)"
            />
            <g data-name="Group 18">
              <g
                filter="url(#c)"
                transform="translate(-3955 -870.986) translate(3965.783 1051.257) translate(-10.78 -180.27)"
              >
                <path
                  data-name="Path 76"
                  d="M4536.372 708.844s18.716 5.192 36 6.922a179.579 179.579 0 0033.137 0V604.955s-7.517 33.735-25.194 61.438-43.943 42.451-43.943 42.451z"
                  transform="translate(-4525.59 -408.64)"
                  fill="#fff"
                />
              </g>
              <g
                filter="url(#d)"
                transform="translate(-3955 -870.986) translate(3965.783 1051.257) translate(-10.78 -180.27)"
              >
                <path
                  data-name="Path 77"
                  d="M4560.833 613.639s24.247-11.4 46.918-12.459 43.763 8.206 43.763 8.206L4560.833 729.2z"
                  transform="translate(-4470.99 -420.82)"
                  fill="#fff"
                />
              </g>
              <g
                filter="url(#e)"
                transform="translate(-3955 -870.986) translate(3965.783 1051.257) translate(-10.78 -180.27)"
              >
                <path
                  data-name="Path 79"
                  d="M4600.586 610.454s34.669 37.248 82.05 34.937 108.992-55.482-91.33 72.025z"
                  transform="translate(-4415.32 -419.36)"
                  fill="#fff"
                />
              </g>
              <g
                filter="url(#f)"
                transform="translate(-3955 -870.986) translate(3965.783 1051.257) translate(-10.78 -180.27)"
              >
                <path
                  data-name="Path 80"
                  d="M4608.035 721.16s158.635-135.747 160-115.917-.526 111.294-.526 111.294z"
                  transform="translate(-4351.77 -412.65)"
                  fill="#fff"
                />
              </g>
              <g
                filter="url(#g)"
                transform="translate(-3955 -870.986) translate(3965.783 1051.257) translate(-10.78 -180.27)"
              >
                <path
                  data-name="Path 81"
                  d="M4661.459 600.526l-2.267 113.713s19.016.5 36.691-.795 34.008-4.368 34.008-4.368-12.636-5.3-34.008-34.007-34.424-74.543-34.424-74.543z"
                  transform="translate(-4233.19 -410.9)"
                  fill="#fff"
                />
              </g>
              <g
                filter="url(#h)"
                transform="translate(-3955 -870.986) translate(3965.783 1051.257) translate(-10.78 -180.27)"
              >
                <path
                  data-name="Path 82"
                  d="M4564.047 729.756s55.626-19.034 59.184-25.257 12.724-79.029 12.724-79.029z"
                  transform="translate(-4460.45 -422.01)"
                  fill="#fff"
                />
              </g>
              <g
                filter="url(#i)"
                transform="translate(-3955 -870.986) translate(3965.783 1051.257) translate(-10.78 -180.27)"
              >
                <path
                  data-name="Path 83"
                  d="M4588.469 729.364l184.939-104.371-125.47 104.371z"
                  transform="translate(-4408.64 -422.51)"
                  fill="#fff"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
      {/* <svg width="1em" height="1em" viewBox="0 0 512 512" ref={box}>
        <defs>
          <linearGradient
            x1={0.5}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#171717" />
            <stop offset={0.048} stopColor="#0b0b0b" />
            <stop offset={0.968} stopColor="#111" />
            <stop offset={1} stopColor="#383838" />
          </linearGradient>
          <linearGradient
            x1={0.5}
            y1={1}
            x2={0.5}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#12151c" />
            <stop offset={1} stopColor="#191a1c" />
          </linearGradient>
          <filter
            x={600}
            y={163}
            width={14.5}
            height={16}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dx={0.5} />
            <feGaussianBlur result="blur" />
            <feFlood floodColor="#fff" floodOpacity={0.102} />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient
            x1={0.097}
            y1={0.07}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#191a1f" />
            <stop offset={1} stopColor="#2d2e30" />
          </linearGradient>
          <linearGradient
            x1={0.5}
            y1={1}
            x2={0.5}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#1d1c21" />
            <stop offset={1} stopOpacity={0.737} />
          </linearGradient>
          <filter
            x={350.738}
            y={181}
            width={21.779}
            height={23.728}
            filterUnits="userSpaceOnUse"
          >
            <feOffset />
            <feGaussianBlur result="blur-2" />
            <feFlood floodOpacity={0.102} />
            <feComposite operator="in" in2="blur-2" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            x={351.674}
            y={182.31}
            width={19.885}
            height={21.195}
            filterUnits="userSpaceOnUse"
          >
            <feOffset />
            <feGaussianBlur result="blur-3" />
            <feFlood floodOpacity={0.8} />
            <feComposite operator="in" in2="blur-3" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient
            id="c"
            x1={0.5}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#41b2d6" />
            <stop offset={1} stopColor="#21596b" />
          </linearGradient>
          <filter
            id="b"
            x={-9}
            y={183.252}
            width={90.851}
            height={135.568}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-4" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-4" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="d"
            x={74.302}
            y={166.344}
            width={113.547}
            height={152.983}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-5" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-5" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="e"
            x={165.063}
            y={177.745}
            width={164.352}
            height={130.703}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-6" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-6" />
            <feComposite in="SourceGraphic" />
          </filter>
          <linearGradient
            id="g"
            x1={0.5}
            x2={0.5}
            y2={1}
            gradientUnits="objectBoundingBox"
          >
            <stop offset={0} stopColor="#3fb0d4" />
            <stop offset={1} stopColor="#21596b" />
          </linearGradient>
          <filter
            id="f"
            x={249.651}
            y={177.245}
            width={187.112}
            height={142.223}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-7" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-7" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="h"
            x={428.507}
            y={176.203}
            width={92.493}
            height={137.914}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-8" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-8" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="i"
            x={88.8}
            y={190.778}
            width={93.768}
            height={127.883}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-9" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-9" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id="j"
            x={169.116}
            y={189.75}
            width={212.866}
            height={127.972}
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy={3} />
            <feGaussianBlur stdDeviation={3} result="blur-10" />
            <feFlood floodOpacity={0.161} />
            <feComposite operator="in" in2="blur-10" />
            <feComposite in="SourceGraphic" />
          </filter>
          <clipPath id="a">
            <path d="M0 0H512V512H0z" />
          </clipPath>
        </defs>
        <g clipPath="url(#a)">
          <path data-name="Rectangle 55" fill="none" d="M0 0H512V512H0z" />
          <g id="salams" data-name="Group 17">
            <g
              filter="url(#b)"
              transform="translate(-4512.145 -1064.523) translate(4512.15 1064.52)"
            >
              <path
                data-name="Path 93"
                d="M4536.372 714.419s19.721 5.47 37.934 7.294a189.224 189.224 0 0034.917 0V604.955s-7.92 35.545-26.546 64.735-46.305 44.729-46.305 44.729z"
                transform="translate(-4536.37 -415.7)"
                fill="url(#c)"
              />
            </g>
            <g
              filter="url(#d)"
              transform="translate(-4512.145 -1064.523) translate(4512.15 1064.52)"
            >
              <path
                data-name="Path 94"
                d="M4560.833 614.312s25.548-12.007 49.435-13.128 46.112 8.646 46.112 8.646l-95.547 126.247z"
                transform="translate(-4477.53 -428.75)"
                fill="url(#c)"
              />
            </g>
            <g
              filter="url(#e)"
              transform="translate(-4512.145 -1064.523) translate(4512.15 1064.52)"
            >
              <path
                data-name="Path 95"
                d="M4601.084 610.454s36.529 39.247 86.453 36.812 114.841-58.46-96.232 75.891z"
                transform="translate(-4417.24 -426.71)"
                fill="url(#c)"
              />
            </g>
            <g
              filter="url(#f)"
              transform="translate(-4512.145 -1064.523) translate(4512.15 1064.52)"
            >
              <path
                data-name="Path 96"
                d="M4608.035 727.487s167.149-143.033 168.589-122.138-.554 117.268-.554 117.268z"
                transform="translate(-4349.38 -420.02)"
                fill="url(#g)"
              />
            </g>
            <g
              filter="url(#h)"
              transform="translate(-4512.145 -1064.523) translate(4512.15 1064.52)"
            >
              <path
                data-name="Path 97"
                d="M4661.583 600.526l-2.39 119.816s20.038.522 38.661-.838 35.832-4.6 35.832-4.6-13.314-5.588-35.832-35.832-36.271-78.546-36.271-78.546z"
                transform="translate(-4221.69 -418.32)"
                fill="url(#c)"
              />
            </g>
            <g
              filter="url(#i)"
              transform="translate(-4512.145 -1064.523) translate(4512.15 1064.52)"
            >
              <path
                data-name="Path 98"
                d="M4564.047 735.353s58.612-20.056 62.359-26.612 13.408-83.271 13.408-83.271z"
                transform="translate(-4466.25 -428.69)"
                fill="url(#c)"
              />
            </g>
            <g
              filter="url(#j)"
              transform="translate(-4512.145 -1064.523) translate(4512.15 1064.52)"
            >
              <path
                data-name="Path 99"
                d="M4588.468 734.965l194.866-109.972-132.2 109.972z"
                transform="translate(-4410.35 -429.24)"
                fill="url(#c)"
              />
            </g>
          </g>
        </g>
      </svg> */}

      {/* <Box
        mx="auto"
        h="40px"
        ref={box}
        w="40px"
        boxShadow="lg"
        borderRadius="50%"
        bg="blue.400"
      ></Box> */}
    </Box>
  )
})
