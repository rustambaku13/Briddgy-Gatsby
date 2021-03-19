import { makeAutoObservable } from "mobx"
class LayoutStore {
  emailConfirmModalVisible: boolean = false
  phoneConfirmModalVisible: boolean = false
  constructor() {
    makeAutoObservable(this)
  }

  toggleEmailConfirmModal() {
    this.emailConfirmModalVisible = !this.emailConfirmModalVisible
  }
  togglePhoneConfirmModal() {
    this.phoneConfirmModalVisible = !this.phoneConfirmModalVisible
  }
}

export default new LayoutStore()
