import AppContext from "./AppContext"
import SessionController from "./controllers/SessionController"
import UserService from "./services/UserService"

const ctx = new AppContext()

// Services
const userSvc = new UserService(ctx)

// Controllers
const sessionCtrl = new SessionController(ctx, userSvc)

ctx.router.get("/", (req, res) => {
	res.json({ success: true, message: "app is running !", data: null })
})

// Check if knex is running
ctx.db.raw('select 1+1 as result').then(() => {
	console.log("Knex is running...")
});

// Start express app to serve front
ctx.app.listen(ctx.port, ctx.hostname, () => {
	console.log(`APP is running on port ${ctx.hostname}:${ctx.port}...`)
})