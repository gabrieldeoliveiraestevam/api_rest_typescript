export interface ISendStudentGrade {
    execute(id: number, name: string, grade: number): Promise<boolean>;
};