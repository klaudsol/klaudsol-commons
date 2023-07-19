import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import {
    BAD_REQUEST,
    COMMUNICATION_LINKS_FAILURE,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND
} from '../HttpStatuses';
import RecordNotFound from '../../errors/ts/RecordNotFound';

const FRONTEND_URL = process.env.KS_FRONTEND_URL ?? '';

class APIHandler {
    private methods: HandlerMethods;
    private middlewareRoutes: MiddlewareRouter = {
        all: [],
        specific: {}
    };

    private corsHeaders: CorsHeaders = {
        'Access-Control-Allow-Origin': FRONTEND_URL,
        'Access-Control-Allow-Headers': 'content-type,authorization',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Credentials': 'true'
    };

    constructor(methods: HandlerMethods) {
        this.methods = methods;
    }

    private async generateAPIHandler(
        req: NextApiRequest,
        res: NextApiResponse
    ): Promise<void> {
        const methods = this.methods;

        switch (req.method) {
            case 'GET':
                if (methods.GET) return await methods.GET(req, res);
                throw new Error(`Unsupported method: ${req.method}`);
            case 'POST':
                if (methods.POST) return await methods.POST(req, res);
                throw new Error(`Unsupported method: ${req.method}`);
            case 'DELETE':
                if (methods.DEL) return await methods.DEL(req, res);
                throw new Error(`Unsupported method: ${req.method}`);
            case 'PUT':
                if (methods.PUT) return await methods.PUT(req, res);
                throw new Error(`Unsupported method: ${req.method}`);
            case 'PATCH':
                if (methods.PATCH) return await methods.PATCH(req, res);
                throw new Error(`Unsupported method: ${req.method}`);
            case 'OPTIONS':
                return res.status(200).json({});
            default:
                throw new Error(`Unsupported method: ${req.method}`);
        }
    }

    private errorHandler(
        error: Error,
        req: NextApiRequest,
        res: NextApiResponse
    ): void {
        console.error(error.stack);

        // TODO: Add more errors here
        switch (true) {
            case error instanceof z.ZodError:
                const { issues }: z.ZodError = error as z.ZodError;

                res.status(BAD_REQUEST).json({
                    message: issues[0].message || 'Bad request.'
                });
            case error instanceof RecordNotFound:
                res.status(NOT_FOUND).json({
                    message: error.message || 'Record not found.'
                });
            case Boolean(
                error?.stack?.match(/Communications\s+link\s+failure/gi)
            ):
                res.status(COMMUNICATION_LINKS_FAILURE).json({
                    message: 'The database may be warming up. Please try again.'
                });
            default:
                res.status(INTERNAL_SERVER_ERROR).json({
                    message:
                        'Internal server error. Check the logs for details.'
                });
        }
    }

    private async runMiddleware(
        req: NextApiRequest,
        res: NextApiResponse
    ): Promise<void> {
        const all: HandleRoutes[] = this.middlewareRoutes.all;
        const specific: Middleware = this.middlewareRoutes.specific;

        if (all.length > 0) {
            for (let callback of all) {
                await callback(req, res);
            }
        }

        if (specific[req.url as string]) {
            for (let callback of specific[req.url as string]) {
                await callback(req, res);
            }
        }
    }

    private runCorsHeaders(req: NextApiRequest, res: NextApiResponse): void {
        if (!FRONTEND_URL) return;

        for (let i in this.corsHeaders) {
            res.setHeader(i, this.corsHeaders[i]);
        }
    }

    public set setCorsHeaders(headers: CorsHeaders) {
        this.corsHeaders = {
            ...this.corsHeaders,
            ...headers
        };
    }

    // TODO: Add dynamic callback params just line in Express
    public middleware(
        route: string | HandleRoutes,
        callback?: HandleRoutes
    ): void {
        if (typeof route !== 'string') {
            this.middlewareRoutes.all.push(route);

            return;
        }

        if (!this.middlewareRoutes.specific[route]) {
            this.middlewareRoutes.specific[route] = [];
        }

        this.middlewareRoutes.specific[route].push(callback as HandleRoutes);
    }

    public handle(): HandleRoutes {
        return async (req: NextApiRequest, res: NextApiResponse) => {
            this.runCorsHeaders(req, res);

            try {
                await this.runMiddleware(req, res);
                await this.generateAPIHandler(req, res);
            } catch (err: unknown) {
                this.errorHandler(err as Error, req, res);
            }
        };
    }
}

export default APIHandler;

export interface HandlerMethods {
    GET?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
    POST?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
    PUT?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
    DEL?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
    PATCH?(req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

export interface HandleRoutes {
    (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

interface Middleware {
    [key: string]: HandleRoutes[];
}

interface MiddlewareRouter {
    all: HandleRoutes[];
    specific: Middleware;
}

interface CorsHeaders {
    [key: string]: string;
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Headers': string;
    'Access-Control-Allow-Methods': string;
    'Access-Control-Allow-Credentials': string;
}
