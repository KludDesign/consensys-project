import express from "express"
import * as dotenv from "dotenv"
import { knex, Knex } from "knex"
import cookieParser from "cookie-parser"
import knexFile from "../knexfile.js"

export default class AppContext {
	public readonly isLocal: boolean
	public readonly app: express.Express
	public readonly router: express.Router
	public readonly port: number
	public readonly hostname: string
	public readonly db: Knex

	constructor() {
        dotenv.config() // Init dotenv
		this.isLocal = process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "development"

        this.port = 8080
        this.hostname = this.isLocal ? "localhost" : "0.0.0.0"

        this.app = express()
        this.router = express.Router()
		this._setupExpress()

		// Knex configs
		const knexOpts = knexFile[this.isLocal ? "development" : "production"]
		this.db = knex(knexOpts)
	}

	/**
	 * Setup config for express serveur
	 */
	private _setupExpress(): void {
        this.app.use(express.json())
        this.app.use(cookieParser())
        this.app.use("/", express.static("./dist/front"))
        this.app.use("/api", this.router) // Mount all back routes on /api path
	}
}