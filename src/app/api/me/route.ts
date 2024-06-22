import { NextRequest, NextResponse } from "next/server";

import User from "../../../model/UserModel";
import {getUserData} from "../../../util/getUserData";
import {connect} from "../../../dbConfig/mongoDb";


export async function POST(req: NextRequest) {
    try {
        const id = await getUserData(req);


       await connect()
        const user = await User.findOne({_id:id}).select('-password');


        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 401 });
        }

        return NextResponse.json({ user: user, success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
