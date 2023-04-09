// We are not using NextJS's native middleware feature
// because Amplify might not support it.
//
import { verifyToken } from "../lib/JWT";
import InvalidTokenError from "../errors/InvalidTokenError";
import MissingHeaderError from "../errors/MissingHeaderError";

const BEARER_LENGTH = 7;

const tokenValidator = async (req, res) => {
  const { token } = req;

  if (!token) throw new MissingHeaderError();
  if (!token.startsWith("Bearer")) throw new InvalidTokenError();
};

const tokenExtractor = async (req, res) => {
  req.token = req.token.substring(BEARER_LENGTH);
};

const tokenVerifier = async (req, res) => {
  const { token } = req;

  const user = verifyToken(token);

  req.user = user;
};

const checkToken = async (req, res) => {
  const { authorization } = req.headers;

  if (req.method === "GET" && !authorization) return;

  req.token = authorization;

  await tokenValidator(req, res);
  await tokenExtractor(req, res);
  await tokenVerifier(req, res);
};

const middleware = async (req, res) => {
  if (req.method === 'OPTIONS') return;

  await checkToken(req, res);
};

export default middleware;
