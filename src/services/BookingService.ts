import AppContext from "../AppContext"
import Booking from "../models/Booking"

export default class BookingService {
	protected readonly _appCtxt: AppContext

	constructor(appCtxt: AppContext) {
		this._appCtxt = appCtxt
	}

    public async listByRoom(roomId: string): Promise<Booking[] | undefined> {
        const booking = await this._appCtxt.db(Booking.tableName).where("room_id", roomId)
        return booking
    }

    public async create(booking: Booking): Promise<number> {
        const bookingId = await this._appCtxt.db(Booking.tableName).insert(booking, "id")
        return bookingId[0]
    }

    public async delete(id: number): Promise<void> {
        await this._appCtxt.db(Booking.tableName).where("id", id).delete()
    }
}