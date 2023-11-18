
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { Subject } from '@entities/Subject';
import { SubjectRepositoryTypeOrm } from '@repositories/subjectRepository';
import { ICreateSubjectRequest } from './domain/ICreateSubjectRequest';
import { CreateSubjectUseCase } from './CreateSubjectUseCase';

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

        expect(response).toEqual(mockResponseSubject);
    
    });

    test('Should throw an error when an error occurs in create', async () => {
        mockSubjectRepositoryTypeOrm.create.mockImplementation( () => {
            throw new Error('any');
        })
        
        const sut = new CreateSubjectUseCase(mockSubjectRepositoryTypeOrm);

        expect(async () => {
            await sut.execute(mockRequest);
          }).rejects.toThrow();

    });

})
