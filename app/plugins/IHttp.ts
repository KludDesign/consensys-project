import { AxiosResponse } from "axios"

export default interface IHttp<T> extends AxiosResponse {
	readonly data: T
}