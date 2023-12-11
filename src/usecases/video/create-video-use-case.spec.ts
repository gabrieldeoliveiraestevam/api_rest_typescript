
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { ICreateVideoRequest } from './domain/create-video-request';
import { RoomRepositoryTypeOrm } from '@repositories/room-repository';
import { Video } from '@entities/video';
import { VideoRepositoryTypeOrm } from '@repositories/video-repository';
import { Room } from '@entities/room';
import { CreateVideoUseCase } from './create-video-use-case';
import { succes } from '@usecases/errors/either';
import { RoomNotExistError } from '@usecases/errors/room-not-exist-error';

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

        expect(response).toEqual(succes(mockResponseVideo));
    });

    test('Should throw an error when room not exist', async () => {
        mockRoomRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        
        const sut = new CreateVideoUseCase(mockRoomRepositoryTypeOrm,mockVideoRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(RoomNotExistError);
    });

    test('Should throw an error when an error occurs in create - 1', async () => {
        mockVideoRepositoryTypeOrm.create.mockImplementation( () => {
            throw new Error('any');
        });
        
        const sut = new CreateVideoUseCase(mockRoomRepositoryTypeOrm,mockVideoRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(Error);

    });

})
