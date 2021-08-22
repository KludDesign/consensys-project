<template>
	<v-layout align-center="align-center" justify-center="justify-center">
		<v-flex class="login-form text-xs-center"> 
			<div class="display-1 mb-3">
				<p class="text-center"><v-icon class="mr-2" large="large">mdi-calendar</v-icon> COLA - Meeting rooms</p>
			</div>
			<v-card>
				<v-card-text>
					<v-form>
						<v-text-field v-model="user.email" light="light" prepend-icon="mdi-at" label="Email" type="email"></v-text-field>
						<v-text-field v-model="user.password" light="light" prepend-icon="mdi-lock" label="Password" type="password"></v-text-field>
						<v-btn @click.prevent="userLogin()" block="block" type="submit">Sign in</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
	name: "Login",
	layout: "login"
})
export default class Login extends Vue {
	$route: any

	private email: string = ""
	private passw: string = ""
	private isSpinning: boolean = false
	private options = {
      isLoggingIn: true,
      shouldStayLoggedIn: true,
    }
	private user = {
      email: "",
      password: ""
    }

	private async userLogin() {
		try {
			let response = await this.$auth.loginWith('cookie', { data: this.user })

			if(this.$auth.loggedIn) {
				this.$router.push("/")
			}
		} catch (err) {
			console.log(err)
		}
    }
}
</script>

<style lang="scss">
.login-form {
	max-width: 500px;
}
</style>
