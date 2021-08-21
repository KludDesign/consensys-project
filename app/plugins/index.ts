import Vue from 'vue'
import axios from 'axios'
import User from './routes/User'

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      user: User
    }
  }
}

Vue.prototype.$api = {
  user: new User(axios)
}