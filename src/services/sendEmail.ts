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

    async execute(to: string, name: string){
        this.transport.sendMail({
            from: 'gabrieldeoliveiraestevam1@outlook.com',
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