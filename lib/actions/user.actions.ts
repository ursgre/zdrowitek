"use server";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

export async function updateUser(
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
    ): Promise<void> {
    connectToDB();

        try{
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
        
                if(path === '/profile/edit') {
                    revalidatePath(path);
                }
        }
        catch(error) {
            throw new Error('Error with creating of updating user: ${error.message}')
        }
   
}