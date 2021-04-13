export default {
  baseStyle: {
    tab: {
      fontWeight: 600,
      _focus: {
        boxShadow: "none",
      },
    },
  },
  variants: {
    enclosed: {
      tab: {
        borderTopRadius: "base",
        border: "1px solid",
        borderColor: "transparent",
        mb: "-1px",
        _selected: {
          color: "tealBlue.base",
          //   borderColor: "inherit",
          //   borderBottomColor: mode(`white`, `gray.800`)(props),
        },
      },
    },
  },
}
