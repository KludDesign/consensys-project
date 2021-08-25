import AppContext from "../AppContext"
import Room from "../models/Room"

export default class RoomService {
	protected readonly _appCtxt: AppContext

	constructor(appCtxt: AppContext) {
		this._appCtxt = appCtxt
	}

    public async allRooms(): Promise<Room[] | undefined> {
        const rooms = await this._appCtxt.db(Room.tableName)
        return rooms
    }

    public async getRoomByName(roomName: number): Promise<Room | undefined> {
        const room = await this._appCtxt.db(Room.tableName).where("name", roomName).first()
        return room
    }
}