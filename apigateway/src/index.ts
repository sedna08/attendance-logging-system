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
setupLogging(app);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);
app.get('/api/auth-check', tokenValidated)


app.listen(PORT, HOST, () => {
    console.log(`API Gateway listening at http://localhost:${PORT}`)
});