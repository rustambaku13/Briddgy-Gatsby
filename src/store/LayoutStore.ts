import { navigate } from "gatsby-plugin-intl"
import { Order } from "./../types/orders"
import { makeAutoObservable } from "mobx"
import { Trip } from "../types/trip"
import UserStore from "./UserStore"
import { useToast } from "@chakra-ui/toast"
import { askForEmailCode } from "../api/user"
interface toOrderProposalContext {
  order: Order
  callback?: any
  trip?: Trip
}
interface toTripProposalContext {
  order?: Order
  trip: Trip
}
interface alertDialogContext {
  title: string
  description: string
  callback: any
  yes: string
  no: string
}

class LayoutStore {
  phoneConfirmModalVisible: boolean = false
  completeProfileModalVisible: boolean = false
  toOrderProposalModalContext: toOrderProposalContext = null
  toTripProposalModalContext: toOrderProposalContext = null
  alertDialogModalContext: alertDialogContext = null
  loginModalFormCallback: any = null
  emailModalFormCallback: any = null
  constructor() {
    makeAutoObservable(this)
  }
  // ****----Complete Profile Modal-----****
  completeProfileModalToggle() {
    this.completeProfileModalVisible = !this.completeProfileModalVisible
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
  get toOrderProposalModalActivate() {
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
  toTripProposalModalOpen(context: toOrderProposalContext) {
    if (UserStore.me) {
      // If I am logged in go on and define it
      this.toTripProposalModalContext = context
    } else {
      navigate("/login")
    }
  }

  // ****----AlertDialogModal Stuff-----****
  get alertDialogModalVisible() {
    return !(this.alertDialogModalContext == null)
  }
  alertDialogModalOpen(context: alertDialogContext) {
    this.alertDialogModalContext = context
  }

  // ****----Email Confirm Stuff-----****
  emailConfirmModalOpen(callback) {
    this.emailModalFormCallback = callback
    if (this.emailModalFormCallback) {
      askForEmailCode()
    }
  }
  emailConfirmModalClose() {
    this.emailModalFormCallback = null
  }
  get emailConfirmModalVisible() {
    return !(this.emailModalFormCallback == null) //true
  }

  togglePhoneConfirmModal() {
    this.phoneConfirmModalVisible = !this.phoneConfirmModalVisible
  }
}

export default new LayoutStore()
