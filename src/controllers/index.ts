import { container } from "tsyringe";
import { AddStudentInRoomController } from "./room/AddStudentInRoomController";
import { AddSubjectInRoomController } from "./room/AddSubjectInRoomController";
import { CreateRoomController } from "./room/CreateRoomController";
import { ListRoomController } from "./room/ListRoomController";
import { CreateStudentController } from "./student/CreateStudentController";
import { CreateSubjectController } from "./subject/CreateSubjectController";
import { CreateVideoController } from "./video/CreateVideoController";
import '@shared/container';

// Controllers
const createSubjectController = container.resolve(CreateSubjectController);

const createRoomController = container.resolve(CreateRoomController);

const createVideoController = container.resolve(CreateVideoController);

const addSubjectInRoomController = container.resolve(AddSubjectInRoomController);

const listRoomController = container.resolve(ListRoomController);

const createStudentController = container.resolve(CreateStudentController);

const addStudentInRoomController = container.resolve(AddStudentInRoomController);

export { 
    createSubjectController , 
    createRoomController , 
    createVideoController , 
    addSubjectInRoomController , 
    listRoomController , 
    createStudentController , 
    addStudentInRoomController 
}