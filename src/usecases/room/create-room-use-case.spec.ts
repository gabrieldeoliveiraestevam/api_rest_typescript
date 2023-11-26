import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { RoomRepositoryTypeOrm } from "@repositories/room-repository";
import { Room } from "@entities/room";
import { ICreateRoomRequest } from "./domain/create-room-request";
import { CreateRoomUseCase } from './create-room-use-case';
import { succes } from '@usecases/errors/either';

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

        expect(response).toEqual(succes(mockResponseRoom));
    
    });

    test('Should throw an error when an error occurs in create', async () => {
        mockRoomRepositoryTypeOrm.create.mockImplementation( () => {
            throw new Error('any error');
        })
        
        const sut = new CreateRoomUseCase(mockRoomRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(Error);

    });

})
