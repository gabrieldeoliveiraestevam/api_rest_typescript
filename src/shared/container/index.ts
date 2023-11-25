import { AddStudentInRoomController } from "@controllers/room/add-student-in-room-controller";
import { AddSubjectInRoomController } from "@controllers/room/add-subject-in-room-controller";
import { CreateRoomController } from "@controllers/room/create-room-controller";
import { CreateStudentController } from "@controllers/student/create-student-controller";
import { CreateSubjectController } from "@controllers/subject/create-subject-controller";
import { CreateVideoController } from "@controllers/video/create-video-controller";
import { RoomRepositoryTypeOrm } from "@repositories/room-repository";
import { StudentRepositoryTypeOrm } from "@repositories/student-repository";
import { SubjectRepositoryTypeOrm } from "@repositories/subject-repository";
import { VideoRepositoryTypeOrm } from "@repositories/video-repository";
import { AMQPService } from "@services/rabbit-mq/amqp-service";
import { ProducerRabbitMQ } from "@services/rabbit-mq/producer-rabbit-mq";
import { ISendStudentGrade } from "@services/send-student-grade/domain/send-student-grade";
import { SendStudentGrade } from "@services/send-student-grade/send-student-grade";
import { ISendEmail } from "@services/sendEmail/domain/send-email";
import { SendEmail } from "@services/sendEmail/send-email";
import { IRoomRepository } from "@usecases/port/repositories/room-repository";
import { IStudentRepository } from "@usecases/port/repositories/student-repository";
import { ISubjectRepository } from "@usecases/port/repositories/subject-repository";
import { IVideoRepository } from "@usecases/port/repositories/video-repository";
import { AddStudentInRoomUseCase } from "@usecases/room/add-student-in-room-use-case";
import { AddSubjectInRoomUseCase } from "@usecases/room/add-subject-in-room-use-case";
import { CreateRoomUseCase } from "@usecases/room/create-room-use-case";
import { ListRoomUseCase } from "@usecases/room/list-room-use-case";
import { CreateStudentUseCase } from "@usecases/student/create-student-use-case";
import { CreateSubjectUseCase } from "@usecases/subject/create-subject-use-case";
import { CreateVideoUseCase } from "@usecases/video/create-video-use-case";
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
container.register<ISendStudentGrade>("SendStudentGrade", SendStudentGrade, { lifecycle: Lifecycle.Singleton });

// AMQP Service
container.register("AMQPService", AMQPService, { lifecycle: Lifecycle.Singleton });
container.register("ProducerRabbitMQ", ProducerRabbitMQ, { lifecycle: Lifecycle.Singleton });