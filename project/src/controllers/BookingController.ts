import express from "express"
import AppContext from "../AppContext"
import Booking from "../models/Booking"
import BookingService from "../services/BookingService"

export default class BookingController {
	private readonly _appCtxt: AppContext
	private readonly _bookingSvc: BookingService

	constructor(appCtxt: AppContext, bookingSvc: BookingService) {
        this._appCtxt = appCtxt
        this._bookingSvc = bookingSvc

        this._appCtxt.router
            .route("/booking/:id?")
            .post((req, res) => {
                this._createBooking(req, res)
            })
            .delete((req, res) => {
                this._deleteBooking(req, res)
            })
        
        this._appCtxt.router.get("/booking/all/:roomId", (req, res) => {
            this._getBookingListByRoom(req, res)
        })
	}

    private async _createBooking(req: express.Request, res: express.Response): Promise<void> {
        try {
            const booking = req.body as Booking
            
            const bookingId = await this._bookingSvc.create(booking)
    
            if (bookingId) {
                res.status(200)
                res.json(bookingId)
            } else {
                res.status(400)
                res.statusMessage = "Check your parameters"
                res.json(null)
                return
            }
		} catch (err) {
            console.error(err);
			res.status(500).json({ error_message: err.message })
		}
	}

    private async _getBookingListByRoom(req: express.Request, res: express.Response): Promise<void> {
        try {
            const roomId = req.params.roomId

            const booking = await this._bookingSvc.listByRoom(roomId)
    
            if (booking) {
                res.status(200)
                res.json(booking)
            } else {
                res.status(200)
                res.json([])
            }
		} catch (err) {
            console.error(err);
			res.status(500).json({ error_message: err.message })
		}
	}

    private async _deleteBooking(req: express.Request, res: express.Response): Promise<void> {
        try {
            const bookingId = Number(req.params.id)

            await this._bookingSvc.delete(bookingId)

            res.status(200)
            res.json(null)
		} catch (err) {
            console.error(err);
			res.status(500).json({ error_message: err.message })
		}
	}
}