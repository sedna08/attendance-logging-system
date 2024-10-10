import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";


export const saveUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userRepository = AppDataSource.getRepository(User);
         //checking if email already exist
        const idCheck = await userRepository.findOne({
            where: {
                id: req.body.id,
            },
        });

        //if email exist in the database respond with a status of 409
        if (idCheck) {
            res.status(409).send("ID already exists");
            return 
        }

        //checking if email already exist
        const emailCheck = await userRepository.findOne({
            where: {
                email: req.body.email,
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailCheck) {
            res.status(409).send("Authentication failed, Email already exists");
            return 
        }
        
        next();

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}