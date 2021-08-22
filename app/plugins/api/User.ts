import IHttp from "./IHttp"
import { AxiosRequestConfig, AxiosInstance } from "axios"

export default class User {
	private _baseUrl = "/user"
	private _http: AxiosInstance

    constructor(http: AxiosInstance) {
        this._http = http
    }

	public getUserList(): Promise<IHttp<any>> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					status: 200,
					statusText: "OK",
					headers: "",
					config: "" as AxiosRequestConfig,
					data: {
						yop: "hello",
						yip: "world"
					}
				});
			}, 1000);
		})
	}
}