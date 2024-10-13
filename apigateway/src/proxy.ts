import { Application } from "express";
import { createProxyMiddleware, responseInterceptor  } from "http-proxy-middleware";
import { Route } from "./utils/types";

const handleProxyError = (err: any, req: any, res: any) => {
    console.error(err); // Log the error
    res.status(502).json({ error: 'Bad Gateway' }); // Send a response to the client
};

const handleProxyReq = (proxyReq: any, req: any, res: any) => {
    // Ensure the request has been processed before logging
    console.log('Proxying request:', req.url);
    
    // Log the constructed proxy request object fields (path, URL, and headers)
    if (proxyReq) {
        console.log('ProxyRequest Path:', proxyReq.path);
        console.log('ProxyRequest Headers:', proxyReq.getHeaders ? proxyReq.getHeaders() : proxyReq.headers);
    } else {
        console.log('ProxyRequest is undefined');
    }

    // Original request headers and URL
    console.log(`Original Request Headers:`, req.headers);
};

export const setupProxies = (app: Application, routes: Route[]): void => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware({
            ...r.proxy,
            on: {
                //proxyReq: handleProxyReq,
                error: handleProxyError
            }
        }));
    });
};

// export const setupProxies = (app: Application, routes: Route[]): void => {
//     routes.forEach(r => {
//         app.use(r.url, createProxyMiddleware({
//             ...r.proxy,
//             onError: (err: Error, req: Request, res: Response) => {
//                 console.error(`Proxy error for ${req.method} ${req.url}:`, err.message);
//                 res.status(502).json({ error: 'Proxy error occurred', details: err.message });
//             },
//             onProxyReq: (proxyReq, req, res) => {
//                 console.log(`Proxying request: ${req.method} ${req.url}`);
//             },
//             onProxyRes: (proxyRes, req, res) => {
//                 console.log(`Proxy response: ${req.method} ${req.url} -> ${proxyRes.statusCode}`);
//             },
//         }));
//     });
// };
