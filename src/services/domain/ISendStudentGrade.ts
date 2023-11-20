export interface ISendStudentGrade {
    publish(exchange: string, routingKey: string, message: string): Promise<boolean>;
};