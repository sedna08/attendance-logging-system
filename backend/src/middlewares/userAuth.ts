import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";


export const saveUser = async (res: Response, req: Request, next: NextFunction) => {
    try{
        const userRepository = AppDataSource.getRepository(User);
        const username = await userRepository.findOne({
            where: { 
                userName: req.body.userName, 
            },
        });
        if(username) {
            res.json(409).send("username already taken");
            return;
        }

        //checking if email already exist
        const emailCheck = await userRepository.findOne({
            where: {
                email: req.body.email,
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailCheck) {
            res.json(409).send("Authentication failed");
            return;
        }
        
        next();

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}