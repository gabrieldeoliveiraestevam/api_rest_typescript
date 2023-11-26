export class SubjectExistInRoomError extends Error {
    constructor(){
        super("Subject exist in room");
    }
}