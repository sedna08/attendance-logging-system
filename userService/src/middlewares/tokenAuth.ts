import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';


export const tokenValidated = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt; // Get JWT from cookie
  
    // Check if the token exists
    if (!token) {
        res.status(401).json({ error: 'No token provided. Unauthorized' });
        return;
    }

    // if (blacklist.has(token)) {
    //     res.status(403).json({ message: 'Token is blacklisted' });
    //     return 
    // }

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
}