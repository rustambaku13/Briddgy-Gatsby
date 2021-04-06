import { extendTheme } from "@chakra-ui/react"
import Button from "./components/button"
import Heading from "./components/heading"
import Text from "./components/text"
import fontSizes from "./fontSizes"
import FormLabel from "./components/formlabel"
import Input from "./components/input"
import global from "./global"
import Colors from "./colors"
import sizes from "./grid"
import Menu from "./Menu"
const overrides = {
  fonts: {
    html: "Nunito Sans",
    heading: "Nunito Sans",
    body: "Nunito Sans",
  },

  fontSizes,
  sizes,
  colors: Colors,
  styles: {
    global,
  },
  components: {
    FormLabel,
    Button,
    Menu,
    Heading,
    Input,
    Text,
  },
}
export default extendTheme(overrides)
