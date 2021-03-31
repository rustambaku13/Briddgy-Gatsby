import { Order } from "./../types/orders"
import { makeAutoObservable } from "mobx"
import { Trip } from "../types/trip"
interface toOrderProposalContext {
  order: Order
  trip?: Trip
}

class LayoutStore {
  emailConfirmModalVisible: boolean = false
  phoneConfirmModalVisible: boolean = false
  makeProposaltoOrderModalVisible: boolean = false
  toOrderProposalContext: toOrderProposalContext | null = null
  constructor() {
    makeAutoObservable(this)
  }

  savetoOrderProposalContext(order: toOrderProposalContext) {
    this.toOrderProposalContext = order
  }
  toggleEmailConfirmModal() {
    this.emailConfirmModalVisible = !this.emailConfirmModalVisible
  }
  toggleProposaltoOrderModal() {
    this.makeProposaltoOrderModalVisible = !this.makeProposaltoOrderModalVisible
  }
  togglePhoneConfirmModal() {
    this.phoneConfirmModalVisible = !this.phoneConfirmModalVisible
  }
}

export default new LayoutStore()
