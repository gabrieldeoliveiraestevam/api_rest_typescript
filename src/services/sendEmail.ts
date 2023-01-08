import nodemailer from 'nodemailer';

class SendEmail {
    private transport;

    constructor(

    ){
        this.transport = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
              user: "gabrieldeoliveiraestevam1@outlook.com",
              pass: "glok123654"
            }
        });
    }

    async execute(to: string){
        this.transport.sendMail({
            from: 'gabrieldeoliveiraestevam1@outlook.com',
            to: to,
            subject: 'Email enviado com sucesso',
            html: '<p>!Olá cabeção</p>',
            text: 'Olá cabeção!'
        })
        .then(() => console.log('Email enviado com sucesso!'))
        .catch((err) => console.log('Error ao enviar email - error: ' + err));
    };

};

export { SendEmail }; 