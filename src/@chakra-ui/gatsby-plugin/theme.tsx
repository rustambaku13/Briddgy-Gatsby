import { extendTheme } from "@chakra-ui/react"
import Button from "./components/button"
import Heading from "./components/heading"
import Text from "./components/text"
import FormLabel from "./components/formlabel"
import Input from "./components/input"
import global from "./global"
import Colors from "./colors"
const overrides = {
  fonts: {
    body: "Poppins",
    heading: "Poppins",
  },
  colors: Colors,
  styles: {
    global,
  },
  components: {
    FormLabel,
    Button,
    Heading,
    Input,
    Text,
  },
}
export default extendTheme(overrides)