import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
var morgan = require('morgan');

// Conecção do banco de dadoss
AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(morgan('dev'));

    app.use(routes);

    return app.listen(process.env.PORT, () => console.log('Servidor ligado!'));
});