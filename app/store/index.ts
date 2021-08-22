import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Vue from "vue"

@Module
export default class Index extends VuexModule {
    private _user = {}

    @Mutation
    setUser(value: any) {
        this._user = value
    }

    @Action({ commit: 'setUser', rawError: true })	
    async actionUser(): Promise<object> {
        const currentUser = await Vue.prototype.$api.user.getUserByToken()
        if (currentUser?.data) {
            return currentUser.data
        } else {
            return {}
        }
    }

    get user () {
        return this._user
    }
}