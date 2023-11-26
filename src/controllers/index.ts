import { container } from "tsyringe";
import { AddStudentInRoomController } from "./room/add-student-in-room-controller";
import { AddSubjectInRoomController } from "./room/add-subject-in-room-controller";
import { CreateRoomController } from "./room/create-room-controller";
import { ListRoomController } from "./room/list-room-controller";
import { CreateStudentController } from "./student/create-student-controller";
import { CreateSubjectController } from "./subject/create-subject-controller";
import { CreateVideoController } from "./video/create-video-controller";
import '@shared/container';
import { StudentPresenceController } from "./student/student-presence-controller";

// Controllers
const createSubjectController = container.resolve(CreateSubjectController);

const createRoomController = container.resolve(CreateRoomController);

const createVideoController = container.resolve(CreateVideoController);

const addSubjectInRoomController = container.resolve(AddSubjectInRoomController);

const listRoomController = container.resolve(ListRoomController);

const createStudentController = container.resolve(CreateStudentController);

const addStudentInRoomController = container.resolve(AddStudentInRoomController);

const studentPresenceController = container.resolve(StudentPresenceController);

export { 
    createSubjectController , 
    createRoomController , 
    createVideoController , 
    addSubjectInRoomController , 
    listRoomController , 
    createStudentController , 
    addStudentInRoomController ,
    studentPresenceController
}