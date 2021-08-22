import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import User from './User'
import Room from './Room'

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      user: User
      room: Room
    }
  }
}

const apiPlugin: Plugin = (context) => {
  Vue.prototype.$api = {
    user: new User(context.$axios),
    room: new Room(context.$axios)
  }
}

export default apiPlugin