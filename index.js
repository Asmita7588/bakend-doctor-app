// require("dotenv").config();

import dotenv from "dotenv"
dotenv.config();
import express, { json } from "express";
import database from "./src/config/databaseConn.js";
import allRoutes from "./src/routes/index.js"
import {logger} from "./src/config/logger.js"
import cors from "cors"


const app = express();
app.use(express.json());

app.use(cors(
    {
        origin : "http://localhost:3000",
        Credential : true
    }
))
database();

app.use('/api/v1', allRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    logger.info(`Server is running on port ${PORT}`);
});