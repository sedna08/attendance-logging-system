import { Options } from "http-proxy-middleware";

export type Route = {
    url: string; // The URL path to match
    auth: boolean; // Indicates if authentication is required
    proxy: {
        target: string; // The target URL for the proxy
        changeOrigin: boolean; // Whether to change the origin of the host header
        prependPath?: Options['prependPath'];
        logger?: Options['logger'];
        pathRewrite?: Options["pathRewrite"]; // Optional path rewrite rules
    };
};
