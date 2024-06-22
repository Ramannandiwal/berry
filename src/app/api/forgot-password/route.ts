import {NextRequest, NextResponse} from "next/server";
// import { Resend } from 'resend';
// import {sendVerificationEmail} from "@/util/sendEmail";


export async function POST(req:NextRequest, res:NextResponse) {
   const {email,name} = await req.json();
    try {
        // const data = await sendVerificationEmail(email,name,Math.random().toString(16));
        // return NextResponse.json({message:`${email} successfully sent`,data:data},{status:200});




    } catch (error) {
      return NextResponse.json({error:error},{status:400});
    }

}