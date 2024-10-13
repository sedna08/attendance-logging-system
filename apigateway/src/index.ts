import * as express from 'express';
import * as dotenv from "dotenv";
import { setupLogging } from './logging';
import { setupProxies } from './proxy';
import { ROUTES } from './routes/routes';
import { setupAuth } from './auth/auth';
import * as cookieParser from 'cookie-parser'
import { tokenValidated } from './middleware/tokenAuth';
import * as cors from 'cors';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.API_GATEWAY_PORT,10) || 4000;
const HOST = '0.0.0.0';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupLogging(app);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);
app.use(cors({
    origin: [process.env.FRONTEND_ORIGIN, "http://localhost:3000"], // Allow specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify headers that are allowed
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.get('/api/auth-check', tokenValidated)


app.listen(PORT, HOST, () => {
    console.log(`API Gateway listening at http://localhost:${PORT}`)
});