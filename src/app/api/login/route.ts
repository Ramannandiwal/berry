import { NextRequest, NextResponse } from "next/server";

import UserModel from "../../../model/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {connect} from "../../../dbConfig/mongoDb";

export async function POST(request: NextRequest) {
    try {
       await connect();
        const { email, password } = await request.json() as { email: string, password: string };
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        if (bcrypt.compareSync(password, user.password)) {
            const id = user._id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET||'');

            const response = NextResponse.json({ user: user,message:"Login successfully" });
            response.cookies.set("token", token, { httpOnly: true  });

            return response;
        } else {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({
            error: "Invalid JSON",
            success: false,
        }, { status: 400 });
    }
}
