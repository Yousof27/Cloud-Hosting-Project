import { NextRequest } from "next/server";
import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

// Verify Token For api
export function verifyToken(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value as string;

  const userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;

  return userFromToken;
}

// Verify Token For UI Pages
export function verifyTokenForPages(token: string) {
  const userFromToken = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
  return userFromToken;
}
