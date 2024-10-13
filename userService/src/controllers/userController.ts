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
                const token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: '5m',
                });

                res.cookie("jwt", token, { httpOnly: true });
                res.status(201).send("Authentication successful, Token generated");
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

export const logout = async (req:Request, res: Response) => {
  try {
    res.clearCookie("jwt")
    res.status(200).json({ message: 'Successfully logged out' });
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};