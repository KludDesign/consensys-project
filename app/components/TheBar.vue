<template>
   <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-toolbar-title>Cola day booking</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-responsive max-width="260" class="text-right">
          <v-avatar>
            <img
                :src="companyLogo"
                alt="company logo"
            >
          </v-avatar>
          <b class="ml-2">{{ capitalizedName }}</b>
        </v-responsive>
      </v-container>
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Companies from "../enums/Companies"

@Component({
    name: "TheBar",
})
export default class TheBar extends Vue {

  get companyLogo(): string {
      return this.$store.getters.user.company === Companies.Coke ? "/imgs/coke.png" : this.$store.getters.user.company === Companies.Pepsi ?  "/imgs/pepsi.png" : ""
  }

  get capitalizedName(): string {
    if (this.$store.getters.user.first_name) 
      return this.$store.getters.user.first_name.charAt(0).toUpperCase() + this.$store.getters.user.first_name.slice(1)
    else
      return ""
  }
}
</script>
