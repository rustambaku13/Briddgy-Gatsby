export default {
  baseStyle: {
    container: {
      borderTopWidth: "0px",
      borderColor: "inherit",
      _last: {
        borderBottomWidth: "0px",
      },
    },
    button: {
      color: "text.light",
      fontSize: "1rem",
      _focus: {
        boxShadow: "outline",
      },
      _hover: {
        bg: "initial",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      py: 2,
      px: 0,
    },
    panel: {
      pt: 4,
      px: 0,
      pb: 0,
    },
  },
}
