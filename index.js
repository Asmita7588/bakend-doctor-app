// require("dotenv").config();

import dotenv from "dotenv"
dotenv.config();
import express, { json } from "express";
import database from "./src/config/databaseConn.js";
import allRoutes from "./src/routes/index.js"
import {logger} from "./src/config/logger.js"
import cors from "cors"
// import swaggerFile from "./swagger.json" assert { type: 'json' };
import swaggerUi from "swagger-ui-express"
import fs from 'fs';
import { connectRabbitMQ } from './src/config/rabbitMq.js';
import { startWorker } from './src/worker/emailWorker.js';

const swagger = JSON.parse(
  fs.readFileSync(new URL('./swagger.json', import.meta.url))
);


const app = express();
app.use(express.json());

app.use(cors(
    {
        origin : "http://localhost:4200",
        credentials: true
    }
))
database();

const startServer = async () => {
    await connectRabbitMQ(); 
};

app.use('/api/v1', allRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
const PORT =3000 || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    // console.log(`Swagger at http://localhost:${PORT}/api-docs`);
    logger.info(`Server is running on port ${PORT}`);
});
startServer();
startWorker();
