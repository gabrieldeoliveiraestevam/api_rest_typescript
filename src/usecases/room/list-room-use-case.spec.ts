
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { RoomRepositoryTypeOrm } from "@repositories/room-repository";
import { Room } from "@entities/room";
import { ListRoomUseCase } from './list-room-use-case';
import { succes } from '@usecases/errors/either';

describe('ListRoomUseCase', () => {
    let mockRoomRepositoryTypeOrm: MockProxy<RoomRepositoryTypeOrm>;
    let mockResponseRoomRepository: MockProxy<Promise<Room[]>>;
    
    beforeEach( async () => { 

        mockRoomRepositoryTypeOrm = mock();
        mockResponseRoomRepository = mock();

        mockReset(mockRoomRepositoryTypeOrm);

        mockRoomRepositoryTypeOrm.find.mockReturnValue(mockResponseRoomRepository);
    } )

    test('Should return array class room when correct execution', async () => {
        
        const sut = new ListRoomUseCase(mockRoomRepositoryTypeOrm);

        const response = await sut.execute();

        expect(response).toEqual(succes({list: mockResponseRoomRepository}));
    
    });

    test('Should throw an error when an error occurs in find', async () => {
        mockRoomRepositoryTypeOrm.find.mockImplementation( () => {
            throw new Error('any');
        })
        
        const sut = new ListRoomUseCase(mockRoomRepositoryTypeOrm);

        const response = await sut.execute();
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(Error);
    });

})
