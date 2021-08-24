import AppContext from "./AppContext"
import BookingController from "./controllers/BookingController"
import RoomController from "./controllers/RoomController"
import SessionController from "./controllers/SessionController"
import BookingService from "./services/BookingService"
import RoomService from "./services/RoomService"
import UserService from "./services/UserService"

const ctx = new AppContext()

// Services
const userSvc = new UserService(ctx)
const roomSvc = new RoomService(ctx)
const bookingSvc = new BookingService(ctx)

// Controllers
const sessionCtrl = new SessionController(ctx, userSvc)
const roomCtrl = new RoomController(ctx, roomSvc)
const bookingCtrl = new BookingController(ctx, bookingSvc)

ctx.router.get("/", (req, res) => {
	res.json({ success: true, message: "app is running !!!", data: null })
})

// Check if knex is running
ctx.db.raw('select 1+1 as result').then(() => {
	console.log("Knex is running...")
});

// Start express app to serve front
ctx.app.listen(ctx.port, ctx.hostname, () => {
	console.log(`APP is running on port ${ctx.hostname}:${ctx.port}...`)
})