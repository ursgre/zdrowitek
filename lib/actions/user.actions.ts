"use server";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";

export async function updateUser(
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
    ): Promise<void> {
    connectToDB();

    await User.findOneAndUpdate(
        { id: userId },
        { 
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded: true,
        },
        { upsert: true }
        );

        if(path ===)
}