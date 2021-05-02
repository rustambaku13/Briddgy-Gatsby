import { navigate } from "gatsby-plugin-intl"
import UserStore from "../store/UserStore"
const isSSR = typeof window === "undefined"
export const useAuthHook = (condition: any, to?: string) => {
  if (UserStore.complete && condition(UserStore.isLoggedIn) && !isSSR) {
    navigate(to || "/")
  }
}
