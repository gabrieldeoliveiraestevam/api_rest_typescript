export interface ISendEmail {
    execute(to: string, name: string): Promise<void>;
};