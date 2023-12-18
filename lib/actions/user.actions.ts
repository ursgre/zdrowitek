"use server";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";

export async function updateUser(userId: string): Promise<void> {
    connectToDB();

    await User.findOneAndUpdate({ id: userId } )
}