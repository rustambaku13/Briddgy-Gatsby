export default {
  // Styles for the base style
  baseStyle: {
    fontWeight: 400,
    borderRadius: "base",
  },
  // Styles for the size variations
  sizes: {
    md: {
      px: 8,
      h: "40px",
    },
    lg: {
      px: 14,
      h: "50px",
      fontSize: "md",
    },
  },
  // Styles for the visual style variations

  variants: {
    red_gradient: {
      bgGradient: "linear(to-b, red.300,red.500)",
      color: "white",
      _hover: {
        bgGradient: "linear(to-b, red.500,red.500)",
      },
    },
    outline: {
      bg: "white",
    },
    primary: {
      bg: "tealBlue.light",
      color: "white",
      _hover: {
        bg: "tealBlue.base",
      },
    },
    primary_dark: {
      bg: "tealBlue.base",
      color: "white",
      _hover: {
        bg: "tealBlue.dark",
      },
    },
    primary_gradient: {
      bgGradient: "linear(to right,#44C5D7,#42A4DB)",
      color: "white",
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
}
