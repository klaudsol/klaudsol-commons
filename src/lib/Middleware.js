// We are not using NextJS's native middleware feature
// because Amplify might not support it.
//
import { verifyToken } from "../lib/JWT";
import InvalidTokenError from "../errors/InvalidTokenError";
import MissingHeaderError from "../errors/MissingHeaderError";

const BEARER_LENGTH = 7;

const tokenValidator = async (req, res) => {
    const { token } = req;

    //Note: We must take into consideration that not all API calls are JWT-based.
    //Some (e.g. the admin) are session-based.
    if (!token) return;
    
    if (!token) throw new MissingHeaderError();
    if (!token.startsWith("Bearer")) throw new InvalidTokenError();
};

const tokenExtractor = async (req, res) => {
    const { token } = req;

    //Note: We must take into consideration that not all API calls are JWT-based.
    //Some (e.g. the admin) are session-based.
    if (!token) return;

    req.token = req.token.substring(BEARER_LENGTH);
};

const tokenVerifier = async (req, res) => {
    const { token } = req;

    //Note: We must take into consideration that not all API calls are JWT-based.
    //Some (e.g. the admin) are session-based.
    if (!token) return;

    const user = verifyToken(token);

    req.user = user;
};

const checkToken = async (req, res) => {
    const { authorization } = req.headers;
    
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
