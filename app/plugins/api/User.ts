import IHttp from "./IHttp"
import { AxiosInstance } from "axios"

export default class User {
	private _http: AxiosInstance

    constructor(http: AxiosInstance) {
        this._http = http
    }

	public getUserByToken(): Promise<IHttp<any>> {
		return this._http.get("/session")
	}
}