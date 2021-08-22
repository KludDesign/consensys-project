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
  private colaDay: Date = new Date("2021-09-10")

  startTime(tms: any) {
    this.startEvent = `${tms.date} ${tms.hour}:00`
    this.endEvent = `${tms.date} ${tms.hour + 1}:00`

    const isSameEvent = this.events.find((ev: any) => ev.start === this.startEvent)

    if (!isSameEvent) {
      const createEvent = {
        name: `Booked by: ${this.$store.getters.user.first_name.toUpperCase()} ${this.$store.getters.user.last_name.toUpperCase()}`,
        color: '#00BCD4',
        start: `${tms.date} ${tms.hour}:00`,
        end: `${tms.date} ${tms.hour + 1}:00`
      }

      this.events.push(createEvent)
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