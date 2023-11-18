import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { Room } from "@entities/Room";
import { ICreateRoomRequest } from "./domain/ICreateRoomRequest";
import { CreateRoomUseCase } from './CreateRoomUseCase';

const mockRequest: ICreateRoomRequest = {
    name: "teste",
    description: "teste"
};

describe('CreateRoomUseCase', () => {
    let mockRoomRepositoryTypeOrm: MockProxy<RoomRepositoryTypeOrm>;
    let mockResponseRoom: MockProxy<Room>;
    
    beforeEach( async () => { 

        mockRoomRepositoryTypeOrm = mock();
        mockResponseRoom = mock();

        mockReset(mockRoomRepositoryTypeOrm);

        mockRoomRepositoryTypeOrm.create.mockReturnValue(mockResponseRoom);
    } )

    test('Should return class room when correct execution', async () => {
        
        const sut = new CreateRoomUseCase(mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(mockResponseRoom);
    
    });

    test('Should throw an error when an error occurs in create', async () => {
        mockRoomRepositoryTypeOrm.create.mockImplementation( () => {
            throw new Error('any');
        })
        
        const sut = new CreateRoomUseCase(mockRoomRepositoryTypeOrm);

        expect(async () => {
            await sut.execute(mockRequest);
          }).rejects.toThrow();

    });

})
