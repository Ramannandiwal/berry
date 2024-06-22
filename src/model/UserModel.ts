import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    Avatar: string;

}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure the name field is unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email field is unique
    },
    password: {
        type: String,
        required: true,
    },
    Avatar:{
        type: String,
        required: true,
    }


});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
