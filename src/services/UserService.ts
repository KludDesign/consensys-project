import AppContext from "../AppContext"
import User from "../models/User"

export default class UserService {
	protected readonly _appCtxt: AppContext

	constructor(appCtxt: AppContext) {
		this._appCtxt = appCtxt
	}

    public async getUserByEmail(email: string): Promise<User | undefined> {
        const user = await this._appCtxt.db(User.tableName).where("email", email).first()
        return user
    }

    public async getUserById(userId: number): Promise<User | undefined> {
        const user = await this._appCtxt.db(User.tableName).where("id", userId).first()
        return user
    }
}