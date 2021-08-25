import Companies from "../enums/Companies"

export default class User {
	static readonly tableName = "user"

	id: number = 0
	first_name: string = ""
	last_name: string = ""
	email: string = ""
	password: string = ""
    company: Companies = Companies.None
}
