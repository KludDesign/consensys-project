
export default class Booking {
	static readonly tableName = "booking"

	id: number = 0
	name: string = ""
	time_start: Date = new Date()
	time_end: Date = new Date()
	user_id: number = 0
    room_id: string = ""
}
