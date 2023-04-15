import jwt from "jsonwebtoken";
import TokenExpiredError from "../errors/TokenExpiredError";
import JsonWebTokenError from "../errors/JsonWebTokenError";

// Let's reuse SECRET_COOKIE_PASSWORD instead of creating another one
const SECRET = process.env.KS_SECRET_COOKIE_PASSWORD ?? 
               process.env.SECRET_COOKIE_PASSWORD ?? 
               process.env.KS_SECRET ??
               process.env.SECRET;

export const generateToken = (tokenValues) => {
    const token = jwt.sign(
        tokenValues,
        SECRET,
        { expiresIn: 14400 }
    );

    return token;
};

export const verifyToken = (token) => {
    const error = (err, decoded) => {
        if (!err) return decoded;

        if (err.name === "JsonWebTokenError") throw new JsonWebTokenError();
        if (err.name === "TokenExpiredError") throw new TokenExpiredError();

        throw err;
    };

    const decodedToken = jwt.verify(
        token,
        SECRET,
        error
    );

    return decodedToken;
};

// Verifies the token, but it wont scream when the token is invalid.
export const decodeToken = (token) => {
    const error = (err, decoded) => err ? null : decoded;

    const decodedToken = jwt.verify(token, SECRET, error);

    return decodedToken;
}
