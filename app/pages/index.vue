<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="4">
      <v-card>
        <v-card-title class="headline">
          <p class="text-center">Welcome {{ $store.getters.user.first_name }}</p>
        </v-card-title>
        <v-select
          v-model="selectedRoom"
          :items="items"
          item-text="name"
          item-value="name"
          label="Select meeting room"
          class="ml-15 mr-15"
          solo
        ></v-select>
      </v-card>
    </v-col>
    <v-col v-if="selectedRoom" cols="12" sm="12" md="8">
      <calendar :room-id="selectedRoom" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Calendar from "../components/Calendar.vue"

@Component({
	name: "Index",
  components: {
    Calendar
  }
})
export default class Index extends Vue {
  private items = []
  private selectedRoom = ""

  async mounted() {
    await this.getAllRooms()
  }

  async getAllRooms() {
    const rooms = await this.$api.room.getAllRooms()
    this.items = rooms.data
  }
}
</script>
