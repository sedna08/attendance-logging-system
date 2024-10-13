import { Route } from "../utils/types";
import * as dotenv from "dotenv";


dotenv.config();

export const ROUTES: Route[] = [
    {
        url: '/api/userService/users',
        auth: false,
        proxy: {
            target: `${process.env.BACKEND_SERVER_URL}/userService/users`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/userService/signup',
        auth: false,
        proxy: {
            target: `${process.env.BACKEND_SERVER_URL}/userService/signup`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/userService/login',
        auth: false,
        proxy: {
            target: `${process.env.BACKEND_SERVER_URL}/userService/login`,
            changeOrigin: true,
        }
    },
     {
        url: '/api/userService/users/:id',
        auth: false,
        proxy: {
            target: `${process.env.BACKEND_SERVER_URL}/userService/users/:id`,
            changeOrigin: true,
        }
    },
     {
        url: '/api/userService/logout',
        auth: false,
        proxy: {
            target: `${process.env.BACKEND_SERVER_URL}/userService/logout`,
            changeOrigin: true,
        }
    },
];
