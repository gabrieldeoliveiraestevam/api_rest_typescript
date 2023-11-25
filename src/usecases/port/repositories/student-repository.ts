import { Student } from "@entities/student";

export interface IStudentRepository {
    save(Student: Student): Promise<Student>;
    create(name: string, data_nascimento: Date, email: string): Student;
    findOneById(id: number): Promise<Student|null>;
  }
  