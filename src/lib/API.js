import middleware from "../lib/Middleware";
import { defaultErrorHandler } from "../lib/ErrorHandler";

export const setCORSHeaders = ({ response, url }) => {
  if (url) response.setHeader("Access-Control-Allow-Origin", url);
};

// Transfer to middleware when Klaudsol CMS is v2.0.0.
// For now we need this to be backwards compatible
export const parseFormData = async (req, res) => {
  if (req.method !== "POST" && req.method !== "PUT") return;

  const storage = multer.memoryStorage();
  const multerSetup = multer({ storage });
  const upload = multerSetup.any();

  await new Promise((resolve, reject) => {
    upload(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });

  req.body = JSON.parse(JSON.stringify(req.body));

  return { req, res };
};

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
    default:
      throw new Error(`Unsupported method: ${req.method}`);
  }
}

export function handleRequests(methods) {
  return async (req, res) => {
    try {
      await middleware(req, res);
      const { req: parsedReq, res: parsedRes } = parseFormData(req, res);
      await constructAPIHandler(methods, parsedReq, parsedRes);
    } catch (err) {
      await defaultErrorHandler(err, req, res);
    }
  };
}
