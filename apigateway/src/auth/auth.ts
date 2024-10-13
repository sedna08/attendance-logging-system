import { Application, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Route } from '../utils/types';
import * as dotenv from 'dotenv';


dotenv.config();

export const setupAuth = (app: Application, routes: Route[]): void => {

    // Middleware to validate JWT
    const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt; // Get JWT from cookie

        // Check if the token exists
        if (!token) {
            res.status(401).json({ error: 'No token provided. Unauthorized' });
            return;
        }

        try {
            // Verify token and decode the payload
            const decoded = jwt.verify(token, process.env.secretKey);
            
            // If token is valid, return authenticated
            res.status(200).json({ authenticated: true, user: decoded });
            next();
        } catch (error) {
            // If token verification fails, return appropriate error
            if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token expired. Unauthorized' });
            } else {
            res.status(401).json({ error: 'Invalid token. Unauthorized' });
            }
        }
    };

    // Apply the JWT middleware to the routes that require authentication
    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, jwtMiddleware, (req: Request, res: Response, next: NextFunction) => {
                next();
            });
        }
    });
};
