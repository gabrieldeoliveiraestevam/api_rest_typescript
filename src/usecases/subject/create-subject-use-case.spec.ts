
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { Subject } from '@entities/subject';
import { SubjectRepositoryTypeOrm } from '@repositories/subject-repository';
import { ICreateSubjectRequest } from './domain/create-subject-request';
import { CreateSubjectUseCase } from './create-subject-use-case';
import { succes } from '@usecases/errors/either';

const mockRequest: ICreateSubjectRequest = {
    name: "teste"
}

describe('CreateSubjectUseCase', () => {
    let mockSubjectRepositoryTypeOrm: MockProxy<SubjectRepositoryTypeOrm>;
    let mockResponseSubject: MockProxy<Subject>;
    
    beforeEach( async () => { 

        mockSubjectRepositoryTypeOrm = mock();
        mockResponseSubject = mock();

        mockReset(mockSubjectRepositoryTypeOrm);

        mockSubjectRepositoryTypeOrm.create.mockReturnValue(mockResponseSubject);
    } )

    test('Should return class subject when correct execution', async () => {
        
        const sut = new CreateSubjectUseCase(mockSubjectRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(succes(mockResponseSubject));
    
    });

    test('Should throw an error when an error occurs in create', async () => {
        mockSubjectRepositoryTypeOrm.create.mockImplementation( () => {
            throw new Error('any');
        })
        
        const sut = new CreateSubjectUseCase(mockSubjectRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);
        
        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(Error);

    });

})
