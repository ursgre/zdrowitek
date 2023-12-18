import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
 
 export default async function Home() {

  // const result = await fetchPosts();
  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
    </div>
  )
}