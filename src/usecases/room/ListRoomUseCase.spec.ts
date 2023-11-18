
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { RoomRepositoryTypeOrm } from "@repositories/roomRepository";
import { Room } from "@entities/Room";
import { ListRoomUseCase } from './ListRoomUseCase';

describe('ListRoomUseCase', () => {
    let mockRoomRepositoryTypeOrm: MockProxy<RoomRepositoryTypeOrm>;
    let mockResponseRoom: MockProxy<Promise<Room[]>>;
    
    beforeEach( async () => { 

        mockRoomRepositoryTypeOrm = mock();
        mockResponseRoom = mock();

        mockReset(mockRoomRepositoryTypeOrm);

        mockRoomRepositoryTypeOrm.find.mockReturnValue(mockResponseRoom);
    } )

    test('Should return array class room when correct execution', async () => {
        
        const sut = new ListRoomUseCase(mockRoomRepositoryTypeOrm);

        const response = await sut.execute();

        expect(response).toEqual(mockResponseRoom);
    
    });

    test('Should throw an error when an error occurs in find', async () => {
        mockRoomRepositoryTypeOrm.find.mockImplementation( () => {
            throw new Error('any');
        })
        
        const sut = new ListRoomUseCase(mockRoomRepositoryTypeOrm);

        expect(async () => {
            await sut.execute();
          }).rejects.toThrow();

    });

})
