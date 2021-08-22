<template>
  <div>
    <v-sheet class="calendar-cola">
      <v-calendar
        color="primary"
        type="day"
        v-model="colaDay"
        ref="calendar"
        :events="events"
        @mousedown:event="deleteEvent"
        @mousedown:time="startTime"
      >
        <template v-slot:event="{ event }">
          {{ event.name }}
        </template>
      </v-calendar>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
	name: "Calendar"
})
export default class Calendar extends Vue {
  private events: any = []
  private startEvent: string = ""
  private endEvent: string = ""
  private name: string = ""
  private color: string = ""
  private colaDay: Date = new Date("2021-09-10")

  @Prop({ type: String, default: "" })
	readonly roomId!: string

  startTime(tms: any) {
    this.startEvent = `${tms.date} ${tms.hour}:00`
    this.endEvent = `${tms.date} ${tms.hour + 1}:00`
    this.name = `Booked by: ${this.$store.getters.user.first_name.toUpperCase()} ${this.$store.getters.user.last_name.toUpperCase()}`
    this.color = '#00BCD4'

    const isSameEvent = this.events.find((ev: any) => ev.start === this.startEvent)

    if (!isSameEvent) {
      const createEvent = {
        name: this.name,
        color: this.color,
        start: this.startEvent,
        end: this.endEvent
      }

      this.events.push(createEvent)

      this.$api.booking.create(
        this.name,
        new Date(this.startEvent),
        new Date(this.endEvent),
        this.$store.getters.user.id,
        this.roomId
      )
    }
  }

  deleteEvent(value: any) {
    console.log("delete");
  }
}
</script>

<style lang="scss">
.calendar-cola {
  height: calc(100vh - 30px);
}
</style>