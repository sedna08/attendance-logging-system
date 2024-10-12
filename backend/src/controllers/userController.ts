import * as bcrypt from 'bcrypt';
import { User } from "../entity/User";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from "../data-source";
import * as dotenv from "dotenv";

dotenv.config();

export const signup = async (req: Request, res: Response) => {
    try{
        const userRepository = AppDataSource.getRepository(User);

        const { id,firstName, lastName, email, password } = req.body;
        const data = {
            id,
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(password, 10),
        };
        const newUser = userRepository.create(data);
        
        // saving the user
        const savedUser = await userRepository.save(newUser);

        // if user details is captured
        // generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (savedUser) {
            let token = jwt.sign({ id: savedUser.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000, // 1 day * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            // console.log("user", JSON.stringify(savedUser, null, 2));
            // console.log(token);
            // send users details
            res.status(201).send("Successfully Saved User");
        } else {
            res.status(409).send("Details are not correct");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//login authentication

export const login = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const { email, password } = req.body;

        //find a user by their email
        const user = await userRepository.findOne({
            where: {
                email: email
            } 
        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000, // 1 day * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
                });

                // if password matches with the one in the database
                // go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                // console.log("user", JSON.stringify(user, null, 2));
                // console.log(token);
                // send user data
                res.status(201).send(user);
            } else {
                res.status(401).send("Authentication failed incorrect password");
            }
        } else {
            res.status(401).send("Authentication failed email not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await AppDataSource.getRepository(User).find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userToRemove = await userRepository.findOneBy({ id: req.params.id });
        if (userToRemove) {
            await userRepository.remove(userToRemove);
            res.status(200).send("User Removed Successfully");
        } else {
            res.status(401).send("User Not Found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
