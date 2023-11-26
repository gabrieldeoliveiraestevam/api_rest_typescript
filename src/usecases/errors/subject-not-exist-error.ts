export class SubjectNotExistError extends Error {
    constructor(){
        super("Subject not exist");
    }
}