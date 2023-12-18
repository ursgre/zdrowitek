import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}
export async function createThread({
    text, author, communityId, path
}: Params){
   
        connectToDB();
    
       
    
        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });
}