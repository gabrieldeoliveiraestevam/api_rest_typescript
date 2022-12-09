import { AddSubjectInRoomUseCase } from "../usecases/room/AddSubjectInRoomUseCase";
import { CreateRoomUseCase } from "../usecases/room/CreateRoomUseCase";
import { ListRoomUseCase } from "../usecases/room/LIstRoomUseCase";
import { CreateSubjectUseCase } from "../usecases/subject/CreateSubjectUseCase";
import { CreateVideoUseCase } from "../usecases/video/CreateVideoUseCase";
import { AddSubjectInRoomController } from "./room/AddSubjectInRoomController";
import { CreateRoomController } from "./room/CreateRoomController";
import { CreateSubjectController } from "./subject/CreateSubjectController";
import { CreateVideoController } from "./video/CreateVideoController";
import { ListRoomController } from "./room/ListRoomController";
import { SubjectRepositoryTypeOrm } from "../repositories/subjectRepository";
import { RoomRepositoryTypeOrm } from "../repositories/roomRepository";
import { VideoRepositoryTypeOrm } from "../repositories/videoRepository";
import { CreateStudentUseCase } from "../usecases/student/CreateStudentUseCase";
import { StudentRepositoryTypeOrm } from "../repositories/studentRepository";
import { CreateStudentController } from "./student/CreateStudentController";
import { AddStudentInRoomUseCase } from "../usecases/room/AddStudentInRoomUseCase";
import { AddStudentInRoomController } from "./room/AddStudentInRoomController";

// Repositories
const subjectRepository = new SubjectRepositoryTypeOrm();
const roomRepository = new RoomRepositoryTypeOrm();
const videoRepository = new VideoRepositoryTypeOrm();
const studentRepository = new StudentRepositoryTypeOrm();

// Controllers and Use Cases
const createSubjectUseCase = new CreateSubjectUseCase(subjectRepository);
const createSubjectController = new CreateSubjectController(createSubjectUseCase);

export { createSubjectUseCase , createSubjectController }


const createRoomUseCase = new CreateRoomUseCase(roomRepository);
const createRoomController = new CreateRoomController(createRoomUseCase);

export { createRoomUseCase , createRoomController }


const createVideoUseCase = new CreateVideoUseCase(roomRepository,videoRepository);
const createVideoController = new CreateVideoController(createVideoUseCase);

export { createVideoUseCase , createVideoController }


const addSubjectInRoomUseCase = new AddSubjectInRoomUseCase(subjectRepository,roomRepository);
const addSubjectInRoomController = new AddSubjectInRoomController(addSubjectInRoomUseCase);

export { addSubjectInRoomUseCase , addSubjectInRoomController }


const listRoomUseCase = new ListRoomUseCase(roomRepository);
const listRoomController = new ListRoomController(listRoomUseCase);

export { listRoomUseCase , listRoomController }


const createStudentUseCase = new CreateStudentUseCase(studentRepository);
const createStudentController = new CreateStudentController(createStudentUseCase);

export { createStudentUseCase , createStudentController }

const addStudentInRoomUseCase = new AddStudentInRoomUseCase(studentRepository,roomRepository);
const addStudentInRoomController = new AddStudentInRoomController(addStudentInRoomUseCase);

export { addStudentInRoomUseCase , addStudentInRoomController }