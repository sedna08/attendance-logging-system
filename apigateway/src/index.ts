import * as express from 'express';
import * as dotenv from "dotenv";
import { setupLogging } from './logging';
import { setupProxies } from './proxy';
import { ROUTES } from './routes/routes';
import { setupAuth } from './auth/auth';
import * as cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_SERVER_PORT || 4000;
const HOST = '0.0.0.0';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupLogging(app);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});