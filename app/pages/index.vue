<template>
  <v-row>
    <v-col cols="12" lg="2" xs="12">
      <v-select
        v-model="selectedRoom"
        :items="items"
        item-text="name"
        item-value="name"
        label="Rooms"
        solo
      ></v-select>
    </v-col>
    <v-col>
      <v-sheet v-if="selectedRoom">
        <calendar :room-id="selectedRoom" />
      </v-sheet>
      <v-sheet v-else rounded="lg" class="pa-3">
        <p>
          Welcome on the Cola day booking system. Start by selecting the room you wanna book, then you'll be able to select any available time slot.
        </p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import TheBar from "../components/TheBar.vue"
import Calendar from "../components/Calendar.vue"
import IRoom from "../interfaces/IRoom"

@Component({
	name: "Index",
  components: {
    Calendar,
    TheBar
  }
})
export default class Index extends Vue {
  private items: IRoom[] = []
  private selectedRoom = ""

  private async mounted(): Promise<void> {
    await this.getAllRooms()
  }

  private async getAllRooms(): Promise<void> {
    const rooms = await this.$api.room.getAllRooms()
    this.items = rooms.data
  }
}
</script>