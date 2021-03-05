import { User } from "./../types/user"

import {
  action,
  autorun,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx"
import { loginUser } from "../api/user"

class UserStore {
  me: null | User = null
  constructor() {
    makeAutoObservable(this)
  }
  *login(username: String, password: String) {
    try {
      const { data } = yield loginUser(username, password)
      return data
    } catch (err) {
      throw err
    }
  }
}

export default new UserStore()
