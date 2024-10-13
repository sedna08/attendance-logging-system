import { Application } from "express";
import * as morgan from "morgan";

export const setupLogging = (app: Application): void => {
    app.use(morgan('combined'));
};
