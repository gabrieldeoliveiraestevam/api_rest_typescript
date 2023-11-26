export class StudentExistInRoomError extends Error{
    constructor(){
        super("Student exist in room");
    }
}