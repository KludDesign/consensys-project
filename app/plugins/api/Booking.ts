import IHttp from "./IHttp"
import { AxiosInstance } from "axios"

export default class Booking {
	private _http: AxiosInstance

    constructor(http: AxiosInstance) {
        this._http = http
    }

	public getAllBookingByRoom(roomId: string): Promise<IHttp<any>> {
		return this._http.get(`/booking/all/${roomId}`)
	}

    public create(name: string, timeStart: Date, timeEnd: Date, userId: number, roomId: string): Promise<IHttp<any>> {
		return this._http.post(`/booking`, { name: name, time_start: timeStart, time_end: timeEnd, user_id: userId, room_id: roomId })
	}

    public delete(id: number): Promise<IHttp<any>> {
		return this._http.delete(`/booking/${id}`)
	}
}