export default {
  // Styles for the base style
  // Styles for the visual style variations

  variants: {
    secondary: {
      color: "text.medium",
    },
    light: {
      color: "text.light",
    },
    halfUnderline: {
      d: "inline-block",
      _after: {
        float: "right",
        w: "65%",
        content: '" "',
        h: "4px",
        bg: "tealBlue.base",
      },
    },
    fullUnderline: {
      d: "inline-block",
      _after: {
        float: "right",
        w: "100%",
        content: '" "',
        h: "30px",
        pos: "relative",
        top: "-30px",
        zIndex: -1,
        bg: "tealBlue.light",
        opacity: 0.3,
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
}
