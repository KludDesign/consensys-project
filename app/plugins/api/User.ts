import IHttp from "./IHttp"
import { AxiosInstance } from "axios"
import IUser from "../../interfaces/IUser"

export default class User {
	private _http: AxiosInstance

    constructor(http: AxiosInstance) {
        this._http = http
    }

	public getUserByToken(): Promise<IHttp<IUser>> {
		return this._http.get("/session")
	}
}