export interface IStudentPresenceService {
    execute(id: number, date: Date, presence: boolean): Promise<boolean>;
}