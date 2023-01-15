import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { IRoomRepository } from "@usecases/port/repositories/IRoomRepository";
import { CreateRoomUseCase } from "@usecases/room/CreateRoomUseCase";
import { container } from "tsyringe";

container.registerSingleton<IRoomRepository>("RoomRepositoryTypeOrm", RoomRepositoryTypeOrm);
container.registerSingleton("CreateRoomUseCase", CreateRoomUseCase);