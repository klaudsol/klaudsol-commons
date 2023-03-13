// We are not using NextJS's native middleware featuer
// because Amplify might not support it.
import multer from "multer";
import { verifyToken } from "../lib/JWT";
import InvalidTokenError from "../errors/InvalidTokenError";
import MissingHeaderError from "../errors/MissingHeaderError";

// Uncomment when KlaudSol CMS is in v2.0.0
/* export const parseFormData = async (req, res) => { */
/*   if (req.method !== "POST" && req.method !== "PUT") return; */
/**/
/*   const storage = multer.memoryStorage(); */
/*   const multerSetup = multer({ storage }); */
/*   const upload = multerSetup.any(); */
/**/
/*   await new Promise((resolve, reject) => { */
/*     upload(req, res, (result) => { */
/*       if (result instanceof Error) return reject(result); */
/*       return resolve(result); */
/*     }); */
/*   }); */
/**/
/*   req.body = JSON.parse(JSON.stringify(req.body)); */
/* }; */

const tokenExtractor = async (req, res) => {
  req.token = req.token.substring(7);
};

const tokenVerifier = async (req, res) => {
  const token = req.token;

  verifyToken(token);
};

const tokenValidator = async (req, res) => {
  const token = req.token;

  if (!token) throw new MissingHeaderError();
  if (!token.startsWith("Bearer")) throw new InvalidTokenError();
};

const checkToken = async (req, res) => {
  const header = req.headers.authorization;

  if (req.method === "GET" && !header) return;

  req.token = header;

  await tokenValidator(req, res);
  await tokenExtractor(req, res);
  await tokenVerifier(req, res);
};

const middleware = async (req, res) => {
  await checkToken(req, res);
  // Uncomment if KlaudSol CMS is in v2.0.0
  /* await parseFormData(req, res); */
};

export default middleware;