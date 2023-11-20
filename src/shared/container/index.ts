import { AddStudentInRoomController } from "@controllers/room/AddStudentInRoomController";
import { AddSubjectInRoomController } from "@controllers/room/AddSubjectInRoomController";
import { CreateRoomController } from "@controllers/room/CreateRoomController";
import { CreateStudentController } from "@controllers/student/CreateStudentController";
import { CreateSubjectController } from "@controllers/subject/CreateSubjectController";
import { CreateVideoController } from "@controllers/video/CreateVideoController";
import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { StudentRepositoryTypeOrm } from "@repositories/studentRepository";
import { SubjectRepositoryTypeOrm } from "@repositories/subjectRepository";
import { VideoRepositoryTypeOrm } from "@repositories/videoRepository";
import { ISendEmail } from "@services/domain/ISendEmail";
import { SendEmail } from "@services/sendEmail";
import { IRoomRepository } from "@usecases/port/repositories/IRoomRepository";
import { IStudentRepository } from "@usecases/port/repositories/IStudentRepository";
import { ISubjectRepository } from "@usecases/port/repositories/ISubjectRepository";
import { IVideoRepository } from "@usecases/port/repositories/IVideoRepository";
import { AddStudentInRoomUseCase } from "@usecases/room/AddStudentInRoomUseCase";
import { AddSubjectInRoomUseCase } from "@usecases/room/AddSubjectInRoomUseCase";
import { CreateRoomUseCase } from "@usecases/room/CreateRoomUseCase";
import { ListRoomUseCase } from "@usecases/room/ListRoomUseCase";
import { CreateStudentUseCase } from "@usecases/student/CreateStudentUseCase";
import { CreateSubjectUseCase } from "@usecases/subject/CreateSubjectUseCase";
import { CreateVideoUseCase } from "@usecases/video/CreateVideoUseCase";
import { container, Lifecycle } from "tsyringe";

// Repository
container.register<IRoomRepository>("RoomRepositoryTypeOrm", RoomRepositoryTypeOrm);
container.register<IStudentRepository>("StudentRepositoryTypeOrm", StudentRepositoryTypeOrm);
container.register<ISubjectRepository>("SubjectRepositoryTypeOrm", SubjectRepositoryTypeOrm);
container.register<IVideoRepository>("VideoRepositoryTypeOrm", VideoRepositoryTypeOrm);

// Use Case
container.register("CreateRoomUseCase", CreateRoomUseCase);
container.register("CreateStudentUseCase", CreateStudentUseCase);
container.register("CreateVideoUseCase", CreateVideoUseCase);
container.register("CreateSubjectUseCase", CreateSubjectUseCase);
container.register("AddStudentInRoomUseCase", AddStudentInRoomUseCase);
container.register("AddSubjectInRoomUseCase", AddSubjectInRoomUseCase);
container.register("ListRoomUseCase", ListRoomUseCase);

// Controller
container.register("CreateRoomController", CreateRoomController);
container.register("CreateStudentController", CreateStudentController);
container.register("CreateSubjectController", CreateSubjectController);
container.register("CreateVideoController", CreateVideoController);
container.register("AddStudentInRoomController", AddStudentInRoomController);
container.register("AddSubjectInRoomController", AddSubjectInRoomController);

// Service
container.register<ISendEmail>("SendEmail", SendEmail, { lifecycle: Lifecycle.Singleton });