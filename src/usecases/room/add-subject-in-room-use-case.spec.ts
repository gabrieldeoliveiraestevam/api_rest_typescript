import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { RoomRepositoryTypeOrm } from "@repositories/room-repository";
import { Room } from "@entities/room";
import { SubjectRepositoryTypeOrm } from "@repositories/subject-repository";
import { Subject } from "@entities/subject";
import { AddSubjectInRoomUseCase } from "./add-subject-in-room-use-case";
import { IAddSubjectInRoomRequest } from './domain/add-subject-in-room-request';
import { succes } from '@usecases/errors/either';
import { RoomNotExistError } from '@usecases/errors/room-not-exist-error';
import { SubjectNotExistError } from '@usecases/errors/subject-not-exist-error';
import { SubjectExistInRoomError } from '@usecases/errors/subject-exist-in-room-error';

const mockRequest: IAddSubjectInRoomRequest = {
    subject_id: 1,
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

const mockResponseSubject: Subject = {
    id: 1,
    name: "teste",
    rooms: []
}

describe('AddSubjectInRoomUseCase', () => {
    let mockSubjectRepositoryTypeOrm: MockProxy<SubjectRepositoryTypeOrm>;
    let mockRoomRepositoryTypeOrm: MockProxy<RoomRepositoryTypeOrm>;
    
    beforeEach( async () => { 

        mockSubjectRepositoryTypeOrm = mock();
        mockRoomRepositoryTypeOrm = mock();

        mockReset(mockSubjectRepositoryTypeOrm);
        mockReset(mockRoomRepositoryTypeOrm);

        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseRoom);
        mockSubjectRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseSubject); 
    } )

    test('Should return class room when correct execution', async () => {

        const roomUpdate: Room = {
            ...mockResponseRoom,
            subjects: [mockResponseSubject].concat([])
        };

        mockRoomRepositoryTypeOrm.save.mockResolvedValue(roomUpdate);

        const sut = new AddSubjectInRoomUseCase(mockSubjectRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(succes(roomUpdate));
    
    });

    test('Should throw an error when room not exist', async () => {
        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        
        const sut = new AddSubjectInRoomUseCase(mockSubjectRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(RoomNotExistError);

    });

    test('Should throw an error when subject not exist', async () => {
        mockSubjectRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        
        const sut = new AddSubjectInRoomUseCase(mockSubjectRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(SubjectNotExistError);

    });

    test('Should throw an error when subject exist in room', async () => {
        
        const mockResponseSubjectExist: Subject = {
            id: 1,
            name: "teste",
            rooms: []
        }
                
        const mockResponseRoomExist: Room = {
            id: 1,
            name: 'teste',
            description: 'teste',
            videos: [],
            students: [],
            subjects: [mockResponseSubjectExist]
        }

        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseRoomExist);
        mockSubjectRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseSubjectExist); 

        const sut = new AddSubjectInRoomUseCase(mockSubjectRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(SubjectExistInRoomError);

    });

    test('Should throw an error when occurs an exception error', async () => {
        mockSubjectRepositoryTypeOrm.findOneById.mockRejectedValue(() => {
            throw new Error('any error');
        });
        
        const sut = new AddSubjectInRoomUseCase(mockSubjectRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(Error);

    });
});