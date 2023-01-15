import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { StudentRepositoryTypeOrm } from "@repositories/studentRepository";
import { SubjectRepositoryTypeOrm } from "@repositories/subjectRepository";
import { VideoRepositoryTypeOrm } from "@repositories/videoRepository";
import { SendEmail } from "@services/sendEmail";
import { AddStudentInRoomUseCase } from "@usecases/room/AddStudentInRoomUseCase";
import { AddSubjectInRoomUseCase } from "@usecases/room/AddSubjectInRoomUseCase";
import { CreateRoomUseCase } from "@usecases/room/CreateRoomUseCase";
import { ListRoomUseCase } from "@usecases/room/LIstRoomUseCase";
import { CreateStudentUseCase } from "@usecases/student/CreateStudentUseCase";
import { CreateSubjectUseCase } from "@usecases/subject/CreateSubjectUseCase";
import { CreateVideoUseCase } from "@usecases/video/CreateVideoUseCase";
import { container } from "tsyringe";
import { AddStudentInRoomController } from "./room/AddStudentInRoomController";
import { AddSubjectInRoomController } from "./room/AddSubjectInRoomController";
import { CreateRoomController } from "./room/CreateRoomController";
import { ListRoomController } from "./room/ListRoomController";
import { CreateStudentController } from "./student/CreateStudentController";
import { CreateSubjectController } from "./subject/CreateSubjectController";
import { CreateVideoController } from "./video/CreateVideoController";
import './../shared/container';

// Repositories
const subjectRepository = new SubjectRepositoryTypeOrm();
const roomRepository = new RoomRepositoryTypeOrm();
const videoRepository = new VideoRepositoryTypeOrm();
const studentRepository = new StudentRepositoryTypeOrm();

// Services
const sendEmail = new SendEmail();

// Controllers and Use Cases
const createSubjectUseCase = new CreateSubjectUseCase(subjectRepository);
const createSubjectController = new CreateSubjectController(createSubjectUseCase);

export { createSubjectUseCase , createSubjectController }

console.log("Passou por aqui!")
const createRoomController = container.resolve(CreateRoomController);

export { createRoomController }


console.log("Passou por aqui 2!")

const createVideoUseCase = new CreateVideoUseCase(roomRepository,videoRepository);
const createVideoController = new CreateVideoController(createVideoUseCase);

export { createVideoUseCase , createVideoController }


const addSubjectInRoomUseCase = new AddSubjectInRoomUseCase(subjectRepository,roomRepository);
const addSubjectInRoomController = new AddSubjectInRoomController(addSubjectInRoomUseCase);

export { addSubjectInRoomUseCase , addSubjectInRoomController }


const listRoomUseCase = new ListRoomUseCase(roomRepository);
const listRoomController = new ListRoomController(listRoomUseCase);

export { listRoomUseCase , listRoomController }

const createStudentUseCase = new CreateStudentUseCase(studentRepository,sendEmail);
const createStudentController = new CreateStudentController(createStudentUseCase);

export { createStudentUseCase , createStudentController }

const addStudentInRoomUseCase = new AddStudentInRoomUseCase(studentRepository,roomRepository);
const addStudentInRoomController = new AddStudentInRoomController(addStudentInRoomUseCase);

export { addStudentInRoomUseCase , addStudentInRoomController }