import { navigate } from "gatsby-plugin-intl"
import UserStore from "../store/UserStore"

export const useAuthHook = (condition: any, to?: string) => {
  if (UserStore.complete && condition(UserStore.isLoggedIn)) {
    navigate(to || "/")
  }
}
