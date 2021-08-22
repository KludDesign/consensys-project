import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import User from './User'

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      user: User
    }
  }
}

const apiPlugin: Plugin = (context) => {
  Vue.prototype.$api = {
    user: new User(context.$axios)
  }
}

export default apiPlugin