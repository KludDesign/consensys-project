import IHttp from "./IHttp"
import { AxiosInstance } from "axios"
import IRoom from "../../interfaces/IRoom"

export default class Room {
	private _http: AxiosInstance

    constructor(http: AxiosInstance) {
        this._http = http
    }

	public getAllRooms(): Promise<IHttp<IRoom[]>> {
		return this._http.get("/rooms")
	}
}