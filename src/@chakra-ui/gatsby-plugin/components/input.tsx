export default {
  baseStyle: {
    field: {
      borderWidth: "1px",
    },
  },

  variants: {
    filled: {
      field: {
        _focus: {
          bg: "white",
          borderColor: "transparent",
        },
      },
      addon: {},
    },

    outline: {
      field: {
        _focus: {
          borderColor: "tealBlue.base",
          boxShadow: "none",
        },
      },
    },
  },
}
