import { Application } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { Route } from "./utils/types";


export const setupProxies = (app: Application, routes: Route[]): void => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    });
};
