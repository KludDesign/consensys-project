<template>
  <v-app id="inspire">
    <the-bar />
    <v-main class="grey lighten-3">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import TheBar from "../components/TheBar.vue"

@Component({
	name: "Index",
  components: {
    TheBar
  }
})
export default class Index extends Vue {}
</script>