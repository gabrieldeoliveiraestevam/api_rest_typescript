import { StudentRepositoryTypeOrm } from "@repositories/student-repository";
import { CreateStudentUseCase } from "./create-student-use-case";
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { Student } from "@entities/student";
import { ICreateStudentRequest } from "./domain/create-student-request"
import { succes } from "@usecases/errors/either";

const mockRequest: ICreateStudentRequest = {
    name: 'teste',
    birth_date: '2022-04-04',
    email: "teste@email.com"
};

describe('CreateStudentUseCase', () => {
    let mockRepositoryTypeOrm: MockProxy<StudentRepositoryTypeOrm>;
    let mockResponseStudent: MockProxy<Student>;
    
    beforeEach( async () => { 

        mockRepositoryTypeOrm = mock();
        mockResponseStudent = mock();

        mockReset(mockRepositoryTypeOrm);

        mockRepositoryTypeOrm.create.mockReturnValue(mockResponseStudent);
    } )

    test('Should return class student when correct execution', async () => {
        
        const sut = new CreateStudentUseCase(mockRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(succes(mockResponseStudent));
    
    });

    test('Should throw an error when an error occurs in create', async () => {
        mockRepositoryTypeOrm.create.mockImplementation( () => {
            throw new Error('any');
        })
        
        const sut = new CreateStudentUseCase(mockRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);

        expect(response.isFailure()).toBeTruthy();
        expect(response.isSucces()).toBeFalsy();
        expect(response.value).toBeInstanceOf(Error);

    });
})
