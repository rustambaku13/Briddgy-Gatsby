import Cookies from "js-cookie"
import { autorun, flowResult, makeAutoObservable, reaction } from "mobx"
import moment from "moment"
import {
  addOrder,
  emailSuggestedTravellers,
  getMyOrders,
  getMyReviews,
  remvoeOrder,
  uploadFilestoOrder,
} from "../api/order"
import { createNewAccount } from "../api/payment"
import { addTrip, emailSuggestedOrderers, getMyTrips, removeTrip } from "../api/trip"
import {
  askForEmailCode,
  createUser,
  getMyDetails,
  getNotifications,
  loginUser,
  readnotifications,
  redeemPromoCode,
  verifyEmail,
  verifyPhoneNumber,
} from "../api/user"
import { Notifications } from "../types/notification"
import { Reviews } from "../types/review"
import { Trips } from "../types/trip"
import { compressAndReturn } from "../utils/compression"
import { makeStaticUrl } from "../utils/makeStaticUrl"
import { axios_normal, bmify } from "./../api/index"
import { Order, Orders } from "./../types/orders"
import { Trip } from "./../types/trip"
import { User } from "./../types/user"
import LayoutStore from "./LayoutStore"

class UserStore {
  me: null | User = null
  complete: false | boolean = false
  token: null | string = null
  new_order: any = null
  new_trip: any = null
  orders: Orders = { loading: true, results: [], count: 0 }
  reviews: Reviews = { loading: true, results: [], count: 0 }
  trips: Trips = { loading: true, results: [], count: 0 }
  notifications: Notifications = { loading: true, results: [], count: 0 }

  get isLoggedIn() {
    return this.me != null
  }
  get upcomingTrips() {
    const now = moment(new Date())

    return this.trips.results.filter((item: Trip) => moment(item.date) > now)
  }
  get passedTrips() {
    const now = moment(new Date())

    return this.trips.results.filter((item: Trip) => moment(item.date) <= now)
  }
  constructor() {
    makeAutoObservable(this)

    const token = Cookies.get("token")
    if (token) {
      flowResult(this.login_cookie(token)).then(() => {
        this.complete = true
      })
      return
    }
    this.complete = true
  }
  changeAvatarPic(url){
    const bm_url = bmify(url)
    this.me.avatarpic = bm_url
    this.orders.results.forEach(item=>{item.owner.avatarpic=bm_url})
    this.trips.results.forEach(item=>{item.owner.avatarpic=bm_url})
    
  }
  *fetchMyOrders(page = 1) {
    try {
      this.orders.loading = true
      const { data } = yield getMyOrders(page)
      this.orders = data
    } catch (e) {
      console.error("Failed to Fetch my orders")
    }
  }
  *fetchNotification(page = 1) {
    try {
      this.notifications.loading = true
      const { data } = yield getNotifications()
      this.notifications = data
    } catch (e) {
      console.error("Failed to Fetch my orders")
    }
  }
  *fetchMyReviews(page = 1) {
    try {
      this.reviews.loading = true
      const { data } = yield getMyReviews(page)
      this.reviews = data
    } catch (e) {
      console.error("Failed to Fetch my orders")
    }
  }
  *fetchMyTrips(page = 1) {
    try {
      this.trips.loading = true
      const { data } = yield getMyTrips(page)
      this.trips = data
    } catch (e) {
      console.error("Failed to Fetch my trips")
    }
  }
  save_new_order(orderData) {
    this.new_order = orderData
  }
  *saveNewOrder() {
    
      if (this.new_order == null) throw Error("New Order is not defined")
      const { data } = yield addOrder(this.new_order)
      const formData: FormData = yield compressAndReturn(this.new_order.files)
      formData.append("order_id", data.id)
      const imageResult = yield uploadFilestoOrder(formData)

      // Reshape some stuff
      data.orderimage = imageResult.data.name

      // Append if loadedd orders
      if (this.orders.loading == false) {
        this.orders.results.unshift(data)
        this.orders.count++
      }
      
      emailSuggestedTravellers(
        this.new_order.src_id,
        this.new_order.dest_id
      ) // Can be finished async
      this.new_order = null
      return data
    
  }
  save_new_trip(tripData) {
    this.new_trip = tripData
  }
  *readNotification(){
    this.me.unread_notifications=0
    yield readnotifications()
  }
  *saveNewTrip() {
    // Trip 1
  
    if (this.new_trip == null) {
      throw Error("New Trip is not defined")
    }
    const { data } = yield addTrip({
      ...this.new_trip,
      date: this.new_trip.date1,
    })
    const trip1 = data
    
    // Email Suggested and refactor
    emailSuggestedOrderers(this.new_trip.src_id, this.new_trip.dest_id)
    // Second Trip
    let trip2 = null
    if (this.new_trip.date2) {
      const tmp_src = this.new_trip.src_id
      this.new_trip.src_id = this.new_trip.dest_id
      this.new_trip.dest_id = tmp_src
      const { data } = yield addTrip({
        ...this.new_trip,
        date: this.new_trip.date2,
      })
      trip2 = data
      emailSuggestedOrderers(this.new_trip.dest_id, this.new_trip.src_id)
    }

    this.new_trip = null
    // Add to state
    if (this.trips.loading) return trip1
    if (trip2) {
      // We have second Trip
      this.trips.results.unshift(trip1)
      this.trips.results.unshift(trip2)
      this.trips.count += 2
    } else {
      // We don't have second trip
      this.trips.results.unshift(trip1)

      this.trips.count++
    }

    return trip1
  }
  *deleteTrip(trip:Trip){
    if(trip.number_of_contracts > 0) throw Error
    yield removeTrip(trip.id)
    this.trips.results = this.trips.results.filter(item=>item.id!=trip.id)
    this.trips.count--

  }
  *deleteOrder(order:Order){
    if(order.deliverer) throw Error
    yield remvoeOrder(order.id)
    this.orders.results = this.orders.results.filter(item=>item.id!=order.id)
    this.orders.count--

  }
  *sign_up(props: {
    first_name: string
    last_name: string
    password: string
    email: string
  }) {
    try {
      const { data } = yield createUser(props)
      yield flowResult(this.login(props.email, props.password))
      LayoutStore.emailConfirmModalOpen(() => {})
      askForEmailCode()
      return data
    } catch (err) {
      throw err
    }
  }
  *createStripeAccount(country) {
    yield createNewAccount(country)
    this.me.is_stripe_verified = "I"
  }
  *logout() {
    // Set all default states, remove the token, remove AuthHeader from axios
    Cookies.remove("token")
    this.token = null
    this.me = null
    this.orders = { loading: true, results: [], count: 0 }
    this.trips = { loading: true, results: [], count: 0 }
    this.new_order = null
    this.new_trip = null
    delete axios_normal.defaults.headers["Authorization"]
  }
  *verifyPhoneNumber(code, phone) {
    try {
      const { data } = yield verifyPhoneNumber(code)
      this.me.is_number_verified = true
      this.me.phone = phone
    } catch (err) {
      throw err
    }
  }
  *addPromo(code){
    const data = yield redeemPromoCode(code)
    this.me.used_promo=true
    const discount = parseFloat(data.data.discount)
    this.me.promo_balance = (parseFloat(this.me.promo_balance) + discount).toFixed(2)
    return data
  }
  *verifyEmail(key) {
    try {
      const { data } = yield verifyEmail(key)
      this.me.is_email_verified = true
    } catch (err) {
      throw err
    }
  }

  *login_cookie(token) {
    try {
      this.token = token
      axios_normal.defaults.headers["Authorization"] = `Token ${token}`
      const { data } = yield getMyDetails()
      this.me = data
    } catch (err) {
      this.logout()
    }
  }

  *login(username: String, password: String) {
    try {
      let { data } = yield loginUser(username, password)
      Cookies.set("token", data)
      this.token = data
      axios_normal.defaults.headers["Authorization"] = `Token ${data}`
      data = (yield getMyDetails()).data
      this.me = data
      return data
    } catch (err) {
      this.logout()
      throw err
    }
  }
}
const a = new UserStore()
export default a
