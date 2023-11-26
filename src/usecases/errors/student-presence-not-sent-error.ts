export class StudentPresenceNotSentError extends Error {
    constructor(){
        super("Student presence was not sent");
    }
}