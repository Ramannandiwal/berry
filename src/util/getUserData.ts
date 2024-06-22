import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
}

export const getUserData = async (req: NextRequest): Promise<string> => {
    try {
        const token = req.cookies.get("token")?.value || '';

        if (!token) {
            throw new Error("No token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as DecodedToken;

        return decoded.id;
    } catch (err) {
        console.error("JWT verification error:", err);
        throw new Error("Invalid token");
    }
};
