import { StudentRepositoryTypeOrm } from "@repositories/studentRepository";
import { CreateStudentUseCase } from "./CreateStudentUseCase";
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import { Student } from "@entities/Student";
import { ICreateStudentRequest } from "./domain/ICreateStudentRequest"
import { SendEmail } from "@services/sendEmail/sendEmail";
import { SendStudentGrade } from "@services/sendStudentGrade/sendStudentGrade";

const mockRequest: ICreateStudentRequest = {
    name: 'teste',
    birth_date: '2022-04-04',
    email: "teste@email.com"
};

describe('CreateStudentUseCase', () => {
    let mockRepositoryTypeOrm: MockProxy<StudentRepositoryTypeOrm>;
    let mockResponseStudent: MockProxy<Student>;
    let mockSendEmail: MockProxy<SendEmail>;
    let mockSendStudentGrade: MockProxy<SendStudentGrade>;
    
    beforeEach( async () => { 

        mockRepositoryTypeOrm = mock();
        mockResponseStudent = mock();
        mockSendEmail = mock();
        mockSendStudentGrade = mock();

        mockReset(mockRepositoryTypeOrm);
        mockReset(mockSendEmail);

        mockRepositoryTypeOrm.create.mockReturnValue(mockResponseStudent);
        mockSendStudentGrade.execute.mockResolvedValue(true);
    } )

    test('Should return class student when correct execution', async () => {
        
        const sut = new CreateStudentUseCase(mockRepositoryTypeOrm,mockSendEmail,mockSendStudentGrade);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(mockResponseStudent);
    
    });

    test('Should return class student when correct execution', async () => {
        mockSendStudentGrade.execute.mockResolvedValue(false);
        const sut = new CreateStudentUseCase(mockRepositoryTypeOrm,mockSendEmail,mockSendStudentGrade);

        const response = await sut.execute(mockRequest);

        expect(response).toEqual(mockResponseStudent);
    
    });

    test('Should throw an error when an error occurs in create', async () => {
        mockRepositoryTypeOrm.create.mockImplementation( () => {
            throw new Error('any');
        })
        
        const sut = new CreateStudentUseCase(mockRepositoryTypeOrm,mockSendEmail,mockSendStudentGrade);

        expect(async () => {
            await sut.execute(mockRequest);
          }).rejects.toThrow();

    });
})
