import Companies from "../enums/Companies"

export default interface IUser {
	id: number
	first_name: string
	last_name: string
	email: string
	password: string
    company: Companies
}
