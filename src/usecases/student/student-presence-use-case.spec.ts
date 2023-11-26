import { StudentRepositoryTypeOrm } from "@repositories/student-repository";
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { Student } from "@entities/student";
import { IStudentPresenceRequest } from "./domain/student-presence-request";
import { StudentPresenceService } from "@services/student-presence/student-presence";
import { StudentPresenceUseCase } from "./student-presence-use-case";
import { succes } from "@usecases/errors/either";
import { StudentNotExistError } from "@usecases/errors/student-not-exist-error";
import { StudentPresenceNotSentError } from "@usecases/errors/student-presence-not-sent-error";

const mockRequest: IStudentPresenceRequest = {
    id: 1,
    date: "0001-01-01",
    presence: true
};

describe('StudentPresenceUseCase', () => {
    let mockRepositoryTypeOrm: MockProxy<StudentRepositoryTypeOrm>;
    let mockResponseStudent: MockProxy<Student>;
    let mockStudentPresenceService: MockProxy<StudentPresenceService>;
    
    beforeEach( async () => { 

        mockRepositoryTypeOrm = mock();
        mockResponseStudent = mock();
        mockStudentPresenceService = mock();

        mockReset(mockRepositoryTypeOrm);
        mockReset(mockStudentPresenceService);

        mockRepositoryTypeOrm.findOneById.mockResolvedValue(mockResponseStudent);
        mockStudentPresenceService.execute.mockResolvedValue(true);
    } )

    test('Should returns nothing when correct execution', async () => {
        
        const sut = new StudentPresenceUseCase(mockRepositoryTypeOrm,mockStudentPresenceService);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(succes());
    });

    test('Should throw an error when student not exist', async () => {
        mockRepositoryTypeOrm.findOneById.mockResolvedValue(null);
        const sut = new StudentPresenceUseCase(mockRepositoryTypeOrm,mockStudentPresenceService);

        const response = await sut.execute(mockRequest);

        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(StudentNotExistError);
    });

    test('Should throw an error when student presence was not sent', async () => {
        mockStudentPresenceService.execute.mockResolvedValue(false);
        const sut = new StudentPresenceUseCase(mockRepositoryTypeOrm,mockStudentPresenceService);

        const response = await sut.execute(mockRequest);

        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(StudentPresenceNotSentError);
    });

    test('Should throw an error when an error occurs in execute service', async () => {
        mockStudentPresenceService.execute.mockRejectedValue(() => {
            throw new Error('any');
        })
        
        const sut = new StudentPresenceUseCase(mockRepositoryTypeOrm,mockStudentPresenceService);

        const response = await sut.execute(mockRequest);

        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(Error);
    });
})
