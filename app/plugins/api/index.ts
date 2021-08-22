import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import User from './User'
import Room from './Room'
import Booking from './Booking'

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      user: User
      room: Room
      booking: Booking
    }
  }
}

const apiPlugin: Plugin = (context) => {
  Vue.prototype.$api = {
    user: new User(context.$axios),
    room: new Room(context.$axios),
    booking: new Booking(context.$axios)
  }
}

export default apiPlugin