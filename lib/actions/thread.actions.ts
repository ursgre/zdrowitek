"use server";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}
export async function createThread({
    text, author, communityId, path
}: Params){
   
        try{
            connectToDB();
    
       
        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id },
          });

          revalidatePath(path);
        }  catch (error: any) {
            throw new Error(`Failed to create thread: ${error.message}`);
          }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
  .sort({ createdAt: "desc" })
  .skip(skipAmount)
  .limit(pageSize)
  .populate({
    path: "author",
    model: User,
  })
  .populate({
    path: "children", // Populate the children field
    populate: {
      path: "author", // Populate the author field within children
      model: User,
      select: "_id name parentId image", // Select only _id and username fields of the author
    },
  });
}