import { Application, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Route } from '../utils/types';
import * as dotenv from 'dotenv';
import { tokenValidated } from '../middleware/tokenAuth';


dotenv.config();

export const setupAuth = (app: Application, routes: Route[]): void => {

    // Apply the JWT middleware to the routes that require authentication
    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, tokenValidated, (req: Request, res: Response, next: NextFunction) => {
                next();
            });
        }
    });
};
