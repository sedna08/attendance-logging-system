import { Route } from "../utils/types";
import * as dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_SERVER_URL;

if (!BACKEND_URL) {
    console.warn("Warning: BACKEND_SERVER_URL environment variable is not set.");
    throw new Error("BACKEND_SERVER_URL environment variable is not set.");
}

// Enum to manage route URLs
enum UserServiceRoutes {
    Users = '/api/userService/users',
    Signup = '/api/userService/signup',
    Login = '/api/userService/login',
    UserById = '/api/userService/users/:id',
    Logout = '/api/userService/logout'
}

/**
 * Creates a route object for the proxy middleware.
 * @param url - The URL for the route.
 * @param auth - Whether authentication is required for this route.
 * @returns A route object.
 */
const createRoute = (url: string, auth: boolean = false): Route => ({
    url,
    auth,
    proxy: {
        // Remove '/api' from the target URL
        target: `${BACKEND_URL}${url.replace('/api', '')}`,
        changeOrigin: true,
    },
});

// Exporting routes
export const ROUTES: Route[] = [
    createRoute(UserServiceRoutes.Users),
    createRoute(UserServiceRoutes.Signup),
    createRoute(UserServiceRoutes.Login),
    createRoute(UserServiceRoutes.UserById),
    createRoute(UserServiceRoutes.Logout),
];
