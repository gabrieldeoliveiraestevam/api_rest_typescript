import { Config } from '@config/index';
import nodemailer from 'nodemailer';
import { injectable } from 'tsyringe';
import { ISendEmail } from './domain/ISendEmail';

@injectable()
class SendEmail implements ISendEmail {
    private transport;

    constructor(

    ){
        this.transport = nodemailer.createTransport({
            host: Config.EMAIL_OUTLOOK.HOST,
            port: Number(Config.EMAIL_OUTLOOK.PORT),
            secure: false,
            auth: {
              user: Config.EMAIL_OUTLOOK.USER,
              pass: Config.EMAIL_OUTLOOK.PASS
            }
        });
    }

    async execute(to: string, name: string): Promise<void>{
        this.transport.sendMail({
            from: Config.EMAIL_OUTLOOK.USER,
            to: to,
            subject: 'Estudante cadastrado com sucesso',
            html: `<p>O estudande ${name} foi cadastrado no sistema da escola</p>`,
            text: `O estudande ${name} foi cadastrado no sistema da escola`
        })
        .then(() => console.log('Email enviado com sucesso!'))
        .catch((err) => console.log('Erro ao enviar email - Erro: ' + err));
    };

};

export { SendEmail }; 