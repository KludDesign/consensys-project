import IHttp from "./IHttp"
import { AxiosInstance } from "axios"

export default class Room {
	private _http: AxiosInstance

    constructor(http: AxiosInstance) {
        this._http = http
    }

	public getAllRooms(): Promise<IHttp<any>> {
		return this._http.get("/rooms")
	}
}