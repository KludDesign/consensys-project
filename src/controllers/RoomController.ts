import express from "express"
import AppContext from "../AppContext"
import RoomService from "../services/RoomService"

export default class RoomController {
	private readonly _appCtxt: AppContext
	private readonly _roomSvc: RoomService

	constructor(appCtxt: AppContext, roomSvc: RoomService) {
        this._appCtxt = appCtxt
        this._roomSvc = roomSvc

        this._appCtxt.router.get(`/rooms`, (req, res) => {
                this._allRooms(req, res)
            })
	}

    private async _allRooms(req: express.Request, res: express.Response): Promise<void> {
        try {
            const rooms = await this._roomSvc.allRooms()
    
            if (rooms) {
                res.status(200)
                res.json(rooms)
            } else {
                res.status(400)
                res.statusMessage = "No room found"
                res.json(null)
                return
            }
		} catch (err) {
            console.error(err);
			res.status(500).json({ error_message: err.message })
		}
	}
}