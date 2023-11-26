import { StudentRepositoryTypeOrm } from "@repositories/student-repository";
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { Student } from "@entities/student";
import { RoomRepositoryTypeOrm } from "@repositories/room-repository";
import { IAddStudentInRoomRequest } from "./domain/add-student-in-room-request";
import { AddStudentInRoomUseCase } from "./add-student-in-room-use-case";
import { Room } from "@entities/room";
import { succes } from "@usecases/errors/either";
import { RoomNotExistError } from "@usecases/errors/room-not-exist-error";
import { StudentNotExistError } from "@usecases/errors/student-not-exist-error";
import { StudentExistInRoomError } from "@usecases/errors/student-exist-in-room-error";

const mockRequest: IAddStudentInRoomRequest = {
    student_id: 1,
    room_id: 1
};

const mockResponseRoom: Room = {
    id: 1,
    name: 'teste',
    description: 'teste',
    videos: [],
    students: [],
    subjects: []
}

const mockResponseStudent: Student = {
    id: 1,
    name: "teste",
    email: "teste",
    birth_date: new Date("0001-01-01"),
    rooms: []
}

describe('AddStudentInRoomUseCase', () => {
    let mockStudentRepositoryTypeOrm: MockProxy<StudentRepositoryTypeOrm>;
    let mockRoomRepositoryTypeOrm: MockProxy<RoomRepositoryTypeOrm>;
    
    beforeEach( async () => { 

        mockStudentRepositoryTypeOrm = mock();
        mockRoomRepositoryTypeOrm = mock();

        mockReset(mockStudentRepositoryTypeOrm);
        mockReset(mockRoomRepositoryTypeOrm);

        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseRoom);
        mockStudentRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseStudent); 
    } )

    test('Should return class room when correct execution', async () => {

        const roomUpdate: Room = {
            ...mockResponseRoom,
            students: [mockResponseStudent].concat([])
        };

        mockRoomRepositoryTypeOrm.save.mockResolvedValue(roomUpdate);

        const sut = new AddStudentInRoomUseCase(mockStudentRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(succes(roomUpdate));
    
    });

    test('Should throw an error when room not exist', async () => {
        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        
        const sut = new AddStudentInRoomUseCase(mockStudentRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(RoomNotExistError);
    });

    test('Should throw an error when student not exist', async () => {
        mockStudentRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        
        const sut = new AddStudentInRoomUseCase(mockStudentRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(StudentNotExistError);
    });

    test('Should throw an error when student exist in room', async () => {
        
        const mockResponseStudentExist: Student = {
            id: 1,
            name: "teste",
            email: "teste",
            birth_date: new Date("0001-01-01"),
            rooms: []
        }
                
        const mockResponseRoomExist: Room = {
            id: 1,
            name: 'teste',
            description: 'teste',
            videos: [],
            students: [mockResponseStudentExist],
            subjects: []
        }

        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseRoomExist);
        mockStudentRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseStudentExist); 

        const sut = new AddStudentInRoomUseCase(mockStudentRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(StudentExistInRoomError);

    });

    test('Should throw an error when occurs expection error', async () => {
        mockRoomRepositoryTypeOrm.findOneById.mockRejectedValue(() => {
            throw new Error('any error');
        })
        
        const sut = new AddStudentInRoomUseCase(mockStudentRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(Error);
    });
});