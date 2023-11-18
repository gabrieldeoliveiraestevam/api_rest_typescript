import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { Room } from "@entities/Room";
import { SubjectRepositoryTypeOrm } from "@repositories/subjectRepository";
import { Subject } from "@entities/Subject";
import { AddSubjectInRoomUseCase } from "./AddSubjectInRoomUseCase";
import { IAddSubjectInRoomRequest } from './domain/IAddSubjectInRoomRequest';

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

        expect(response).toEqual(roomUpdate);
    
    });

    test('Should throw an error when room not exist', async () => {
        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        
        const sut = new AddSubjectInRoomUseCase(mockSubjectRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        expect(async () => {
            await sut.execute(mockRequest);
          }).rejects.toThrow();

    });

    test('Should throw an error when subject not exist', async () => {
        mockSubjectRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        
        const sut = new AddSubjectInRoomUseCase(mockSubjectRepositoryTypeOrm,mockRoomRepositoryTypeOrm);

        expect(async () => {
            await sut.execute(mockRequest);
          }).rejects.toThrow();

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

        expect(async () => {
            await sut.execute(mockRequest);
          }).rejects.toThrow();

    });
});