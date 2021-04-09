import { navigate } from "gatsby-plugin-intl"
import { Order } from "./../types/orders"
import { makeAutoObservable } from "mobx"
import { Trip } from "../types/trip"
import UserStore from "./UserStore"
import { useToast } from "@chakra-ui/toast"
interface toOrderProposalContext {
  order: Order
  trip?: Trip
}
interface toTripProposalContext {
  order?: Order
  trip: Trip
}

class LayoutStore {
  emailConfirmModalVisible: boolean = false
  phoneConfirmModalVisible: boolean = false
  toOrderProposalModalContext: toOrderProposalContext = null
  toTripProposalModalContext: toOrderProposalContext = null
  loginModalFormCallback: any = null
  constructor() {
    makeAutoObservable(this)
  }
  // ****----Login Modal-----****
  get loginModalFormVisible() {
    return !(this.loginModalFormCallback == null) //true
  }
  loginModalFormClose() {
    this.loginModalFormCallback = null
  }
  loginModalFormOpen(callback) {
    this.loginModalFormCallback = callback
  }
  // ****----ToOrderProposalModal-----****
  get toOrderProposalModalVisible() {
    return !(this.toOrderProposalModalContext == null) //true
  }
  toOrderProposalModalOpen(context) {
    if (UserStore.me) {
      // If I am logged in go on and define it
      this.toOrderProposalModalContext = context
    } else {
      navigate("/login")
    }
  }
  // ****----ToTripProposalModal Stuff-----****
  get toTripProposalModalVisible() {
    return !(this.toTripProposalModalContext == null) //true
  }
  toTripProposalModalOpen(context) {
    if (UserStore.me) {
      // If I am logged in go on and define it
      this.toTripProposalModalContext = context
    } else {
      navigate("/login")
    }
  }

  toggleEmailConfirmModal() {
    this.emailConfirmModalVisible = !this.emailConfirmModalVisible
  }

  togglePhoneConfirmModal() {
    this.phoneConfirmModalVisible = !this.phoneConfirmModalVisible
  }
}

export default new LayoutStore()
