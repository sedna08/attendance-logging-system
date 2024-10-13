import * as express from 'express';
import "reflect-metadata"
import * as dotenv from "dotenv";
import * as cors from 'cors';
import { AppDataSource } from "./data-source"
import { Express } from "express";
import * as cookieParser from 'cookie-parser'
import userRoutes from "./routes/userRoutes"

dotenv.config();


const PORT = parseInt(process.env.BACKEND_SERVER_PORT,10) || 5000;
const HOST = '0.0.0.0';

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });


// create and setup express app
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.API_GATEWAY_ORIGIN, "http://localhost:4000"], // Allow specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify headers that are allowed
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use('/userService',userRoutes);

// start express server
app.listen(PORT, HOST, () => {
    console.log(`Server is running and listening at ${PORT}`);
})