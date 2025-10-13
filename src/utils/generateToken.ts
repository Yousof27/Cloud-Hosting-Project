import { serialize } from "cookie";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

// Generate Token With JWT
export function generateJWT(payload: JwtPayload): string {
  const privateKey = process.env.JWT_SECRET as string;

  const token = jwt.sign(payload, privateKey, { expiresIn: "30d" });

  return token;
}

// Set Token In Cookie
export function setCookie(jwtPayload: JwtPayload) {
  const token = generateJWT(jwtPayload);

  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Development http, Production https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return cookie;
}

// Clear Cookie
export function clearCookie() {
  return serialize("jwtToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
}
