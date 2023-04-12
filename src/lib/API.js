import middleware from "../lib/Middleware";
import multer from "multer";
import { defaultErrorHandler } from "../lib/ErrorHandler";

export const setCORSHeaders = ({ response, url }) => {
  if (url) {
    response.setHeader('Access-Control-Allow-Origin', url);
    response.setHeader('Access-Control-Allow-Headers', 'content-type,authorization');
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    response.setHeader('Access-Control-Allow-Credentials', true);
  }
};

//DEPRECATED. Please use S3 pre-signed URL's instead.
export const parseFormData = async (req, res) => {
  const storage = multer.memoryStorage();
  const multerSetup = multer({ storage });
  const upload = multerSetup.any();

  await new Promise((resolve, reject) => {
    upload(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });

  return { req, res };
}

export function createAPIHandler(methods = {}) {
  return async (req, res) => {
    try {
      switch (req.method) {
        case "GET":
          if (methods.get) return await methods.get(req, res);
          throw new Error(`Unsupported method: ${req.method}`);
        case "POST":
          if (methods.post) return await methods.post(req, res);
          throw new Error(`Unsupported method: ${req.method}`);
        case "DELETE":
          if (methods.del) return await methods.del(req, res);
          throw new Error(`Unsupported method: ${req.method}`);
        case "PUT":
          if (methods.put) return await methods.put(req, res);
          throw new Error(`Unsupported method: ${req.method}`);
        case "PATCH":
          if (methods.patch) return await methods.patch(req, res);
          throw new Error(`Unsupported method: ${req.method}`);
        case "OPTIONS":
          return res.status(200).json({});
        default:
          throw new Error(`Unsupported method: ${req.method}`);
      }
    } catch (error) {
      await defaultErrorHandler(error, req, res);
    }
  };
}

export async function constructAPIHandler(methods, req, res) {
  switch (req.method) {
    case "GET":
      if (methods.get) return await methods.get(req, res);
      throw new Error(`Unsupported method: ${req.method}`);
    case "POST":
      if (methods.post) return await methods.post(req, res);
      throw new Error(`Unsupported method: ${req.method}`);
    case "DELETE":
      if (methods.del) return await methods.del(req, res);
      throw new Error(`Unsupported method: ${req.method}`);
    case "PUT":
      if (methods.put) return await methods.put(req, res);
      throw new Error(`Unsupported method: ${req.method}`);
    case "PATCH":
      if (methods.patch) return await methods.patch(req, res);
      throw new Error(`Unsupported method: ${req.method}`);
    case "OPTIONS":
      return res.status(200).json({});
    default:
      throw new Error(`Unsupported method: ${req.method}`);
  }
}

export function handleRequests(methods) {
  return async (req, res) => {
    setCORSHeaders({ response: res, url: process.env.KS_FRONTEND_URL ?? process.env.FRONTEND_URL });

    try {
      await middleware(req, res);
      await constructAPIHandler(methods, req, res);
    } catch (err) {
      await defaultErrorHandler(err, req, res);
    }
  };
}
