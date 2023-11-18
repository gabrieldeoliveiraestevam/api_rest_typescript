
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ICreateVideoRequest } from './domain/ICreateVideoRequest';
import { RoomRepositoryTypeOrm } from '@repositories/roomRepository';
import { Video } from '@entities/Video';
import { VideoRepositoryTypeOrm } from '@repositories/videoRepository';
import { Room } from '@entities/Room';
import { CreateVideoUseCase } from './CreateVideoUseCase';

const mockRequest: ICreateVideoRequest = {
    title: "teste",
    url: "teste",
    room_id: 1
}

describe('CreateVideoUseCase', () => {
    let mockRoomRepositoryTypeOrm: MockProxy<RoomRepositoryTypeOrm>;
    let mockVideoRepositoryTypeOrm: MockProxy<VideoRepositoryTypeOrm>;

    let mockResponseVideo: MockProxy<Video>;
    let mockResponseRoom: MockProxy<Promise<Room>>;
    
    beforeEach( async () => { 

        mockRoomRepositoryTypeOrm = mock();
        mockVideoRepositoryTypeOrm = mock();
        mockResponseVideo = mock();
        mockResponseRoom = mock();

        mockReset(mockRoomRepositoryTypeOrm);
        mockReset(mockVideoRepositoryTypeOrm);

        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseRoom);
        mockVideoRepositoryTypeOrm.create.mockReturnValue(mockResponseVideo);
    } )

    test('Should return class video when correct execution', async () => {
        
        const sut = new CreateVideoUseCase(mockRoomRepositoryTypeOrm,mockVideoRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(mockResponseVideo);
    
    });

    test('Should throw an error when room not exist', async () => {
        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        
        const sut = new CreateVideoUseCase(mockRoomRepositoryTypeOrm,mockVideoRepositoryTypeOrm);

        expect(async () => {
            await sut.execute(mockRequest);
          }).rejects.toThrow();

    });

    test('Should throw an error when an error occurs in create', async () => {
        mockVideoRepositoryTypeOrm.create.mockImplementation( () => {
            throw new Error('any');
        });
        
        const sut = new CreateVideoUseCase(mockRoomRepositoryTypeOrm,mockVideoRepositoryTypeOrm);

        expect(async () => {
            await sut.execute(mockRequest);
          }).rejects.toThrow();

    });

})
