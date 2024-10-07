import bcrypt from 'bcrypt';
import { User } from "../entity/User";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AppDataSource } from "../data-source";
import * as dotenv from "dotenv";

dotenv.config();

export const signup = async (res: Response, req: Request) => {
    try{
        const userRepository = AppDataSource.getRepository(User);
        const { userName, email, password } = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password, 10),
        };

        const newUser = new User();

        // saving the user
        const savedUser = await userRepository.save(newUser);

        // if user details is captured
        // generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (savedUser) {
            let token = jwt.sign({ id: savedUser.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(savedUser, null, 2));
            console.log(token);
            //send users details
            res.status(201).send(savedUser);
        } else {
            res.status(409).send("Details are not correct");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//login authentication

export const login = async (res: Response, req: Request) => {
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
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            // if password matches with the one in the database
            // go ahead and generate a cookie for the user
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            // send user data
            res.status(201).send(user);
            } else {
            res.status(401).send("Authentication failed");
            }
        } else {
            res.status(401).send("Authentication failed");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

