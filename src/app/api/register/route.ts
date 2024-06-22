import {NextResponse,NextRequest} from "next/server";
import bcrypt from "bcryptjs"
import mongoose from "mongoose";

import UserModel from "../../../model/UserModel";
import {connect} from "../../../dbConfig/mongoDb";
import {Buffer} from "node:buffer";
import {join} from "path";
import {writeFile} from "node:fs/promises";

export async function POST(req:NextRequest){
    try {
      await  connect();
        const formData = await req.formData();
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
        const file = formData.get('avatar') as File;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const hashedPasswowrd = await bcrypt.hash(password,12);
        const filePath = join( `public`, `${Math.random().toString(16)}.${file.name.split('.'[1])}`);
        await writeFile(filePath, buffer);


        const saveavatar = `${filePath.toString().split('public')[1]}`

        const user = new UserModel({name,email,password:hashedPasswowrd,Avatar:saveavatar});
        const result = await user.save();
        return NextResponse.json({message:'User Registered Succesfully ',success:true},{status: 200});

    }catch(err){
        console.log(err);
        return NextResponse.json({error:err},{status:400});
    }

}

