import { CreateRoomController } from "@controllers/room/CreateRoomController";
import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { IRoomRepository } from "@usecases/port/repositories/IRoomRepository";
import { CreateRoomUseCase } from "@usecases/room/CreateRoomUseCase";
import { container } from "tsyringe";

container.register<IRoomRepository>("RoomRepositoryTypeOrm", RoomRepositoryTypeOrm);
container.register("CreateRoomUseCase", CreateRoomUseCase);
container.register("CreateRoomController", CreateRoomController);