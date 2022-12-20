import { StudentRepositoryTypeOrm } from "@repositories/studentRepository";
import { CreateStudentUseCase } from "./CreateStudentUseCase";
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { Student } from "@entities/Student";
import { ICreateStudentRequest } from "./domain/ICreateStudentRequest"

const mockRequest: ICreateStudentRequest = {
    name: 'teste',
    birth_date: '2022-04-04'
};


describe('CreateStudentUseCase', () => {

    test('Test', async () => {
        let mockRepositoryTypeOrm: MockProxy<StudentRepositoryTypeOrm>;
        let mockResponseStudent: MockProxy<Student>;

        mockRepositoryTypeOrm = mock();
        mockResponseStudent = mock();

        mockReset(mockRepositoryTypeOrm);

        mockRepositoryTypeOrm.create.mockReturnValue(mockResponseStudent);
        
        const sut = new CreateStudentUseCase(mockRepositoryTypeOrm);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(mockResponseStudent);
    
    });
})
