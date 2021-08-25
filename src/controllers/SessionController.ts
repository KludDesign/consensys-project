import express from "express"
import AppContext from "../AppContext"
import UserService from "../services/UserService"

export default class SessionController {
	private readonly _appCtxt: AppContext
	private readonly _userSvc: UserService

	constructor(appCtxt: AppContext, userSvc: UserService) {
        this._appCtxt = appCtxt
        this._userSvc = userSvc

        this._appCtxt.router
            .route("/session")
            .post((req, res) => {
                this._login(req, res)
            })
            .get((req, res) => {
                this._getUserByToken(req, res)
            })
	}

    private async _login(req: express.Request, res: express.Response): Promise<void> {
        try {
			const email: string = req.body.email
			const password: string = req.body.password

            if (!email || !password) {
                res.status(400)
                res.statusMessage = "Missing email or password parameter"
                res.json(null)
                return
            }

            const user = await this._userSvc.getUserByEmail(email)
    
            if (user && user.password === password) {
                // TODO: user.id to be encrypted
                res.cookie("user_token", user.id, { 
                    expires: new Date(Date.now() + 2000 * 3600000)
                })
                res.status(200)
                res.json(null)
            } else {
                res.status(401)
                res.statusMessage = "Access denied"
                res.json(null)
                return
            }
		} catch (err) {
            console.error(err);
			res.status(500).json({ error_message: err.message })
		}
	}

    private async _getUserByToken(req: express.Request, res: express.Response): Promise<void> {
		try {
			const userToken: string = req.cookies.user_token

            if (!userToken) {
                res.status(204)
                res.statusMessage = "Cookie 'user_token' in not set"
                res.json(null)
                return
            }
            
            // TODO: user.id to be decrypted
            const user = await this._userSvc.getUserById(Number(userToken))

            res.status(200)
			res.json(user)
		} catch (err) {
            console.error(err);
			res.status(500).json({ error_message: err.message })
		}
	}
}