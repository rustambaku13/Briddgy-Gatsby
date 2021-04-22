export default {
  // Styles for the base style
  // Styles for the visual style variations

  variants: {
    transparentOutline: {
      backgroundColor: "rgba(255,255,255,0.1)",
      color: "white",
      fontWeight: 700,
      px: 2,
      py: 1,
      borderRadius: "md",
      borderWidth: "1px",
      borderColor: "white",
    },
    secondary: {
      color: "text.medium",
    },
    light: {
      color: "text.light",
    },
    lighter: {
      color: "text.lighter",
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
        h: ["15px", "15px", "30px"],
        pos: "relative",
        top: ["-20px", "-20px", "-30px"],
        zIndex: -1,
        bg: "tealBlue.light",
        opacity: 0.3,
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
}
