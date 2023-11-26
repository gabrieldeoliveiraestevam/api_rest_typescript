export class RoomNotExistError extends Error {
    constructor(){
        super("Room not exist");
    }
}