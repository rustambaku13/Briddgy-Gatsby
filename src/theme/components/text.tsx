export default {
  // Styles for the base style
  // Styles for the visual style variations

  variants: {
    secondary: {
      color: "gray.500",
      fontWeight: 300,
    },
    halfUnderline: {
      d: "inline-block",
      _after: {
        float: "right",
        w: "65%",
        content: '" "',
        h: "4px",
        bg: "blue.400",
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
}
