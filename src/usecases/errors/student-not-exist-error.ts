export class StudentNotExistError extends Error {
    constructor(){
        super("Student not exist");
    }
}