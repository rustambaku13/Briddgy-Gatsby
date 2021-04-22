export default {
  // Styles for the base style
  baseStyle: {
    fontWeight: 400,
    borderRadius: "base",
    _hover: {
      _disabled: {
        bg: "",
      },
    },
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
      bgGradient: "linear(-40deg,warning.base ,cherryRed.base )",
      backgroundSize: "150% 150%",
      color: "white",
      _hover: {
        backgroundPosition: "50% 50%",
      },
    },
    danger: {
      bg: "danger.base",
      color: "white",
      _hover: {
        bg: "danger.dark",
      },
    },
    success: {
      bgGradient: "linear(-40deg,success.base ,crayolaGreen.base )",
      backgroundSize: "150% 150%",
      color: "white",
      _hover: {
        backgroundPosition: "50% 50%",
      },
    },
    outline: {
      bg: "white",
    },
    lieBlueText: {
      backgroundClip: "text",
      backgroundSize: "150% 150%",
      bgGradient: "linear(to-r,lilaPurple.dark 0%,tealBlue.light 40%)",
      _hover: {
        backgroundPosition: "-100% 0%",
      },
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
