export default {
  // Styles for the base style
  baseStyle: {
    fontWeight: 400,
    borderRadius: 5,
    h: "40px",
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
      bgGradient: "linear(to-b, red.400,red.600)",
      color: "white",
    },

    primary: {
      bg: "blue.400",
      color: "white",
      _hover: {
        bg: "blue.500",
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