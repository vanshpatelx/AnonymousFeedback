import mongoose, { Document, Schema, Model } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    message: Message[];
}


const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [
            /^[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
            "Invalid email format",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: true,
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
        required: true,
    },
    message: [MessageSchema],
});

const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
