import mongoose from "mongoose";
export async function connect(): Promise<void> {
    try {
        if(mongoose.connections[0].readyState) {
            console.log("Already connected ");
            return ;
        }
        await mongoose.connect(process.env.MONGODB_URI!);


    }catch (error){
        console.log(error);
    }
}