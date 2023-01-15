import { Config } from "./config";
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import './shared/container';
var morgan = require('morgan');

// Conecção do banco de dadoss
AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(morgan('dev'));

    app.use(routes);

    return app.listen(Config.SERVER_PORT, () => console.log(`Servidor ligado na porta ${Config.SERVER_PORT}`));
});