<template>
  <div>
    <v-calendar
      color="primary"
      type="day"
      v-model="colaDay"
      ref="calendar"
      :event-ripple="false"
      :events="events"
      @click:event="showEvent"
      @mousedown:time="startTime"
    >
      <template v-slot:event="{ event }">
        {{ event.name }}
      </template>
    </v-calendar>
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      max-width="350px"
    >
      <v-card color="grey lighten-4">
        <v-toolbar
          :color="selectedEvent.color"
          dark
        >
          <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
        </v-toolbar>
        <v-card-actions>
          <v-btn
            text
            color="secondary"
            @click="selectedOpen = false"
          >
            Cancel
          </v-btn>
          <v-btn
            v-if="$store.getters.user.id === selectedEvent.user_id"
            text
            color="secondary"
            @click="deleteEvent(selectedEvent)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator"
import IBooking from "../interfaces/IBooking"

@Component({
	name: "Calendar"
})
export default class Calendar extends Vue {
  private events: any = []
  private startEvent: string = ""
  private endEvent: string = ""
  private name: string = ""
  private color: string = "#FBC02D"
  private colaDay: string = "2021-09-10"

  // event menu properties
  private selectedEvent = {}
  private selectedElement = null
  private selectedOpen = false

  @Prop({ type: String, default: "" })
	readonly roomId!: string

  @Watch("roomId")
	roomIdChange(): void {
		this.fetchBookingList()
	}

  private mounted() {
    this.fetchBookingList()
  }

  private async startTime(tms: any): Promise<void> {    
    this.startEvent = `${tms.date} ${tms.hour}:00`
    this.endEvent = `${tms.date} ${tms.hour + 1}:00`
    this.name = `Booked by ${this.$store.getters.user.first_name.toUpperCase()} ${this.$store.getters.user.last_name.toUpperCase()}`

    const isSameEvent = this.events.find((ev: any) => ev.start === this.startEvent)

    if (!isSameEvent) {
      // Create in the DB
      await this.$api.booking.create(
        this.name,
        new Date(this.startEvent),
        new Date(this.endEvent),
        this.$store.getters.user.id,
        this.roomId
      )

      await this.fetchBookingList()
    }
  }

  private async deleteEvent(event: any): Promise<void> {
      this.selectedElement = null
      this.selectedOpen = false

      await this.$api.booking.delete(event.event_id)
      await this.fetchBookingList()
  }

  private async fetchBookingList(): Promise<void> {
    const bookingList = await this.$api.booking.getBookingListByRoom(this.roomId)
    let events: any = []

    bookingList.data.forEach((booking: IBooking) => {
      events.push({
        event_id: booking.id,
        user_id: booking.user_id,
        name: booking.name,
        color: this.defineColor(booking.user_id),
        start: this.concatEventDate(new Date(booking.time_start)),
        end: this.concatEventDate(new Date(booking.time_end))
      })
    })

    this.events = events
  }

  //@ts-ignore
  private showEvent ({ nativeEvent, event }) {
    const open = () => {
      this.selectedEvent = event
      this.selectedElement = nativeEvent.target
      requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
    }

    if (this.selectedOpen) {
      this.selectedOpen = false
      requestAnimationFrame(() => requestAnimationFrame(() => open()))
    } else {
      open()
    }

    nativeEvent.stopPropagation()
  }

  private defineColor(userId: number): string {
    return this.$store.getters.user.id === userId ? this.color : "#BDBDBD"
  }

  private concatEventDate(date: Date): string {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getDate()} ${date.getHours()}:00`
  }
}
</script>