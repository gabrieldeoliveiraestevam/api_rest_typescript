import { Subject } from "../../../entities/Subject";

export interface ISubjectRepository {
  save(subject: Subject): Promise<Subject>;
  create(name: string): Subject;
  findOneById(id: number): Promise<Subject|null>;
}
