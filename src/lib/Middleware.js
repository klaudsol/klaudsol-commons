// We are not using NextJS's native middleware feature
// because Amplify might not support it.
//
import { getCookie } from 'cookies-next';
import { verifyToken } from "../lib/JWT";
import MissingHeaderError from "../errors/MissingHeaderError";

const tokenValidator = async (req, res) => {
  const { token } = req;

  if (!token) throw new MissingHeaderError();
};

const tokenVerifier = async (req, res) => {
  const { token } = req;

  verifyToken(token);
};

const checkToken = async (req, res) => {
  const token = getCookie('token', { req, res });

  if (req.method === "GET" && !token) return;

  req.token = token;

  await tokenValidator(req, res);
  await tokenVerifier(req, res);
};

const middleware = async (req, res) => {
  if (req.method === 'OPTIONS') return;

  await checkToken(req, res);
};

export default middleware;
