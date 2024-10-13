export type Route = {
    url: string;
    auth: boolean;
    creditCheck: boolean;
    rateLimit?: {
        windowMs: number;
        max: number;
    };
    proxy: {
        target: string;
        changeOrigin: boolean;
        pathRewrite: { [key: string]: string };
    };
};