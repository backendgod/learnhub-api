import { Request, Response, NextFunction } from "express";
import response from "../response";
import jwt from "jsonwebtoken";

const authSecret = process.env.AUTH_SECRET || "learnhub-api-secret";

export interface JwtTokenPayload {
  id: string;
  username: string;
}

export interface AuthRequest<Params, ResBody, ReqBody, ReqQuery>
  extends Request<Params, ResBody, ReqBody, ReqQuery> {
  token: string;
  payload: JwtTokenPayload;
}

export function generateJwt(payload: JwtTokenPayload): string {
  return jwt.sign(payload, authSecret, {
    algorithm: "HS512",
    /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
    expiresIn: "12h",
    issuer: "learnhub-api",
    subject: "user-login",
    audience: "user",
  });
}

export function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return response.Unauthorized(res, "missing JWT token in header");
  }
  try {
    const decoded = jwt.verify(token, authSecret);
    (req as AuthRequest<any, any, any, any>).token = token;
    (req as AuthRequest<any, any, any, any>).payload = {
      id: decoded["id"],
      username: decoded["username"],
    };

    return next();
  } catch (err) {
    console.error(`Auth failed for token ${token}: ${err}`);
    return response.Unauthorized(res, "authentication failed");
  }
}
