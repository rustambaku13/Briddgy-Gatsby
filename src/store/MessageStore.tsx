import { autorun, makeAutoObservable } from "mobx"
import UserStore from "./UserStore"
export const APP_NAME = "Briddgy"
export const API_KEY = "AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K"
export const HOST = "backend.briddgy.com/message"
export const DEFAULT_P2P_ACCESS_MODE = "JRWPS"
export const MESSAGES_PAGE = 24
export const RECEIVED_DELAY = 500
export const NOTIFICATION_EXEC_INTERVAL = 300
export const KEYPRESS_DELAY = 3 * 1000
export const READ_DELAY = 1000
// export const HOST = "localhost:6060/message"
const isSSR = typeof window === "undefined"
let Tinode = null
let POP_SOUND
if (typeof Audio != "undefined") {
  POP_SOUND = new Audio("/audio/msg.mp3")
}

class MessageStore {
  // Class Variables
  tinode = null
  isChatReady = false
  topicSelected = null
  topicSelectedOnline = false
  fetchingMoreMessages = false
  receivedTimer = null
  readTimer = null
  keyPressTimer = null
  readNotificationQueue = []
  chatList = []
  searchResults = []
  searchableContacts = []
  messages = []
  newTopicParams = null
  typing = false
  pageOpen = false
  //Constructor
  constructor() {
    makeAutoObservable(this, { tinode: false })
    if (!isSSR) {
      import("tinode-sdk").then(data => {
        Tinode = data.default
        this.tinode = new Tinode(APP_NAME, HOST, API_KEY, "wss", true, "web")

        // Bindings
        this.tnMeContactUpdate = this.tnMeContactUpdate.bind(this)
        this.tnMeSubsUpdated = this.tnMeSubsUpdated.bind(this)
        this.login = this.login.bind(this)
        this.resetContactList = this.resetContactList.bind(this)
        this.handleStartTopicRequest = this.handleStartTopicRequest.bind(this)
        this.leave = this.leave.bind(this)
        this.sendRecv = this.sendRecv.bind(this)
        this.sendRead = this.sendRead.bind(this)
        this.handleNewMessage = this.handleNewMessage.bind(this)
        this.handleAllMessagesReceived = this.handleAllMessagesReceived.bind(
          this
        )
        this.handleInfoReceipt = this.handleInfoReceipt.bind(this)
        this.loadMoreMessages = this.loadMoreMessages.bind(this)
      })
    }
  }
  get unread() {
    this.messages
    this.chatList
    let unread = 0
    this.tinode.getMeTopic().contacts(c => {
      unread += c.unread
    })

    return unread
  }
  // Main Functions
  async login() {
    await this.tinode.connect()
    await this.tinode.login("rest", UserStore.token)
    const me = this.tinode.getMeTopic()
    // Handle Events
    me.onMetaDesc = console.log
    me.onContactUpdate = this.tnMeContactUpdate
    me.onSubsUpdated = this.tnMeSubsUpdated

    // Request Data
    me.subscribe(
      me
        .startMetaQuery()
        .withLaterSub()
        .withDesc()
        .withTags()
        .withCred()
        .build()
    ).finally(() => {
      // this.isChatReady = true
    })
  }

  logout() {
    this.messages = []
    this.chatList = []
    this.searchResults = []
    this.searchableContacts = []
    this.newTopicParams = null
    this.readNotificationQueue = []

    this.setTopicSelected = null
    clearInterval(this.readTimer)
    this.readTimer = null
    clearInterval(this.keyPressTimer)
    this.keyPressTimer = null
    clearInterval(this.receivedTimer)
    this.receivedTimer = null

    this.isChatReady = false
    this.tinode.disconnect()
  }
  // Reset the chatList, topicSelectedOnline, and stuff
  resetContactList() {
    const newState = {
      chatList: [],
      topicSelectedOnline: false,
      searchableContacts: [],
    }

    if (!this.isChatReady) {
      this.isChatReady = true
    }

    this.tinode.getMeTopic().contacts(c => {
      newState.chatList.push(c)
      if (this.topicSelected == c.topic) {
        newState.topicSelectedOnline = c.online
        // newState.topicSelectedAcs = c.acs
      }
    })
    // Merge search results and chat list.
    newState.searchableContacts = MessageStore.prepareSearchableContacts(
      newState.chatList,
      this.searchResults
    )
    this.chatList = newState.chatList
    this.searchableContacts = newState.searchableContacts
    this.topicSelectedOnline = newState.topicSelectedOnline
  }

  loadMoreMessages() {
    if (!this.fetchingMoreMessages) {
      const topic = this.tinode.getTopic(this.topicSelected)
      if (topic && topic.isSubscribed() && topic.msgHasMoreMessages()) {
        this.fetchingMoreMessages = true
        topic.getMessagesPage(MESSAGES_PAGE).finally(err => {
          this.fetchingMoreMessages = false
        })
      }
    }
  }

  // Reactions to updates to the contact list.
  tnMeContactUpdate(what, cont) {
    if (what == "on" || what == "off") {
      this.resetContactList()
      if (this.topicSelected == cont.topic) {
        this.topicSelectedOnline = what == "on"
      }
    } else if (what == "read") {
      this.resetContactList()
    } else if (what == "msg") {
      // Check if the topic is archived. If so, don't play a sound.
      const topic = this.tinode.getTopic(cont.topic)
      const archived = topic && topic.isArchived()

      // New message received. Maybe the message is from the current user, then unread is 0.
      if (cont.unread > 0 && !archived) {
        // Skip update if the topic is currently open, otherwise the badge will annoyingly flash.
        if ((document && document.hidden) || this.topicSelected != cont.topic) {
          POP_SOUND.play()
        }
      }
      // Reorder contact list to use possibly updated 'touched'.
      this.resetContactList()
    } else if (what == "recv") {
      // Explicitly ignoring "recv" -- it causes no visible updates to contact list.
    } else if (what == "gone" || what == "unsub") {
      // Topic deleted or user unsubscribed. Remove topic from view.
      // If the currently selected topic is gone, clear the selection.
      if (this.topicSelected == cont.topic) {
        this.setTopicSelected = null
      }
      // Redraw without the deleted topic.
      this.resetContactList()
    } else if (what == "acs") {
      return
      // Permissions changed. If it's for the currently selected topic,
      // update the views.
      if (this.topicSelected == cont.topic) {
        // this.setState({ topicSelectedAcs: cont.acs })
      }
    } else if (what == "del") {
      // TODO: messages deleted (hard or soft) -- update pill counter.
    } else if (what == "upd") {
      // upd - handled by the SDK. Explicitly ignoring here.
    } else {
      // TODO(gene): handle other types of notifications:
      // * ua -- user agent changes (maybe display a pictogram for mobile/desktop).
      console.log(
        "Unsupported (yet) presence update:" + what + " in: " + cont.topic
      )
    }
  }
  // Dummmy
  tnMeSubsUpdated(unused) {
    this.resetContactList()
  }
  // Check if topic is cached and move to setter at the bottom
  handleStartTopicRequest(topicName) {
    // Check if topic is indeed new. If not, launch it.
    debugger
    if (topicName && this.tinode.isTopicCached(topicName)) {
      this.setTopicSelected = topicName
      return
    }

    const params = {}
    if (Tinode.isP2PTopicName(topicName)) {
      // Because we are initialing the subscription, set 'want' to all permissions.
      params.sub = { mode: DEFAULT_P2P_ACCESS_MODE }
      // Give the other user all permissions too.
      // params.desc = { defacs: { auth: DEFAULT_P2P_ACCESS_MODE } }
    } else {
      return
    }
    params._topicName = topicName
    this.newTopicParams = params
    this.setTopicSelected = topicName
  }
  // Leave the topic, disable handlers
  leave(oldTopicName) {
    if (!oldTopicName) {
      return
    }
    let oldTopic = this.tinode.getTopic(oldTopicName)
    oldTopic.onData = undefined
    oldTopic.onAllMessagesReceived = undefined
    oldTopic.onInfo = undefined
    oldTopic.onMetaDesc = undefined
    oldTopic.onSubsUpdated = undefined
    oldTopic.onPres = undefined
    if (oldTopic && oldTopic.isSubscribed()) {
      oldTopic
        .leave(false)
        .catch(() => {
          /* do nothing here */
        })
        .finally(() => {
          // We don't care if the request succeeded or failed.
          // The topic is dead regardless.
          // this.setState({fetchingMessages: false});
        })
    }
  }
  // Send Recv Request
  sendRecv(data) {
    const topic = this.tinode.getTopic(data.topic)
    if (
      topic.msgStatus(data) >= Tinode.MESSAGE_STATUS_SENT &&
      data.from != this.tinode.getCurrentUserID()
    ) {
      clearTimeout(this.receivedTimer)
      this.receivedTimer = setTimeout(() => {
        this.receivedTimer = undefined
        topic.noteRecv(data.seq)
      }, RECEIVED_DELAY)
    }
  }
  sendKeyPress() {
    const topic = this.tinode.getTopic(this.topicSelected)
    if (topic.isSubscribed()) {
      topic.noteKeyPress()
    }
  }
  // Send Read Request
  // NOT USED FOR NOW
  sendRead(seq) {
    // Add App not visible check
    if (!this.pageOpen || (document && document.hidden)) {
      return
    }
    if (!this.readTimer) {
      this.readTimer = setInterval(() => {
        if (this.readNotificationQueue.length == 0) {
          // Shut down the timer if the queue is empty.
          clearInterval(this.readTimer)
          this.readTimer = null
          return
        }

        let seq = -1
        while (this.readNotificationQueue.length > 0) {
          const n = this.readNotificationQueue[0]
          if (n.topicName != this.topicSelected) {
            // Topic has changed. Drop the notification.
            this.readNotificationQueue.shift()
            continue
          }

          const now = new Date()
          if (n.sendAt <= now) {
            // Remove expired notification from queue.
            this.readNotificationQueue.shift()
            seq = Math.max(seq, n.seq)
          } else {
            break
          }
        }

        // Send only one notification for the whole batch of messages.
        if (seq >= 0) {
          const topic = this.tinode.getTopic(this.topicSelected)
          if (topic) {
            topic.noteRead(seq)
          }
        }
      }, NOTIFICATION_EXEC_INTERVAL)
    }
    const now = new Date()
    this.readNotificationQueue.push({
      topicName: this.topicSelected,
      seq: seq,
      sendAt: now.setMilliseconds(now.getMilliseconds() + READ_DELAY),
    })
  }
  // New Incoming Message
  handleNewMessage(msg) {
    // Regenerate messages list
    const topic = this.tinode.getTopic(this.topicSelected)
    if (!topic) return
    const messages = []
    topic.messages(m => {
      if (!m.deleted) {
        messages.push(m)
      }
    })

    // msg could be null if one or more messages were deleted.
    if (msg && !msg.deleted) {
      // If the message is added to the end of the message list,
      // scroll to the bottom.
      // if (topic.isNewMessage(msg.seq)) {
      //   newState.scrollPosition = 0
      // }

      // Aknowledge messages except own messages. They are
      // automatically assumed to be read and recived.
      const status = topic.msgStatus(msg)
      if (
        status >= Tinode.MESSAGE_STATUS_SENT &&
        msg.from != this.tinode.getCurrentUserID()
      ) {
        this.sendRead(msg.seq)
      }
      // this.sendRecv(msg)
    }
    this.messages = messages
  }
  // All messages Received
  handleAllMessagesReceived(count) {
    // this.setState({fetchingMessages: false});
    if (count > 0) {
      // 0 means "latest".
      this.sendRead(0)
    }
  }
  // Keypress, Read, Recv notification
  handleInfoReceipt(info) {
    switch (info.what) {
      case "kp": {
        clearTimeout(this.keyPressTimer)
        var instance = this
        this.keyPressTimer = setTimeout(function () {
          instance.typing = false
        }, KEYPRESS_DELAY + 1000)
        if (!this.typing) {
          this.typing = true
        }
        break
      }
      case "read":
      case "recv":
        // Redraw due to changed recv/read status.
        this.messages = [...this.messages]
        break
      default:
        console.log("Other change in topic: ", info.what)
    }
  }

  // User is sending a message, either plain text or a drafty object, possibly
  // with attachments.
  //  - msg - Drafty message with content
  //  - promise - Promise to be resolved when the upload is completed
  //  - uploader - for tracking progress
  handleSendMessage(msg, promise, uploader) {
    const topic = this.tinode.getTopic(this.topicSelected)

    msg = topic.createMessage(msg, false)
    // The uploader is used to show progress.
    msg._uploader = uploader

    if (!topic.isSubscribed()) {
      if (!promise) {
        promise = Promise.resolve()
      }
      promise = promise.then(() => {
        return topic.subscribe()
      })
    }

    if (promise) {
      promise = promise.catch(err => {
        // this.handleError(err.message, "err");
      })
    }

    topic
      .publishDraft(msg, promise)
      .then(ctrl => {
        if (topic.isArchived()) {
          return topic.archive(false)
        }
      })
      .catch(err => {
        // this.handleError(err.message, "err");
      })
  }

  //Static Methods
  static prepareSearchableContacts(chatList, foundContacts) {
    const merged = {}

    // For chatList topics merge only p2p topics and convert them to the
    // same format as foundContacts.
    for (const c of chatList) {
      if (Tinode.isP2PTopicName(c.topic)) {
        merged[c.topic] = {
          user: c.topic,
          updated: c.updated,
          public: c.public,
          private: c.private,
          acs: c.acs,
        }
      }
    }

    // Add all foundCountacts if they have not been added already.
    for (const c of foundContacts) {
      if (!merged[c.user]) {
        merged[c.user] = c
      }
    }

    return Object.values(merged)
  }

  // Setters
  set setTopicSelected(topicName) {
    const topic = this.tinode.getTopic(topicName)
    if (topicName != this.topicSelected) {
      // Leave old one if it was defined
      if (
        this.topicSelected &&
        !Tinode.isNewGroupTopicName(this.topicSelected.name)
      ) {
        this.leave(this.topicSelected)
      }
    }
    //Define onData and stuff
    if (topic) {
      topic.onData = this.handleNewMessage
      topic.onAllMessagesReceived = this.handleAllMessagesReceived
      topic.onInfo = this.handleInfoReceipt
      // topic.onMetaDesc = this.handleDescChange
      // topic.onSubsUpdated = this.handleSubsUpdated
      // topic.onPres = this.handleSubsUpdated
    }
    // Suscripe to Topic
    if (
      topic &&
      !topic.isSubscribed() &&
      this.isChatReady &&
      this.topicSelected != topicName
    ) {
      const newTopic =
        this.newTopicParams && this.newTopicParams._topicName == topicName
      let getQuery = topic.startMetaQuery().withLaterDesc()
      if (newTopic || true) {
        getQuery = getQuery.withLaterSub().withLaterData(MESSAGES_PAGE)
      }
      const setQuery = newTopic ? this.newTopicParams : undefined
      topic.subscribe(getQuery.build(), setQuery).then(ctrl => {
        this.topicSelected = ctrl.topic

        topic.queuedMessages(pub => {
          if (!pub._sending && topic.isSubscribed()) {
            topic.publishMessage(pub)
          }
        })
      })
    }

    // Reset newTopicParams
    if (this.newTopicParams && this.newTopicParams._topicName == topicName) {
      this.newTopicParams = null
    }
    // Get TopicOnline
    if (topic) {
      this.topicSelectedOnline = this.tinode.isTopicOnline(topicName)
    } else {
      this.topicSelected = null
      this.topicSelectedOnline = false
    }
  }
}
const a = new MessageStore()

autorun(() => {
  if (isSSR) return
  if (UserStore.isLoggedIn) {
    a.login()
  } else {
    a.logout()
  }
})

if (!isSSR) {
  window.tinode = a
  window.onbeforeunload = function () {
    a.logout()
  }
}
export default a
