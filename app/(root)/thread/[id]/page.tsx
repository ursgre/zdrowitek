import ThreadCard from "@/components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";


const Page = async ({ params } : { params: { id: string }}) => {
    if(!params.id) return null;
    const user = await currentUser();
    if (!user) return null;

    const UserInfo = await fetchUser(user.id);


    <section className="relative">
        <div>
        <ThreadCard
            key={post._id}
            id={post._id}
            currentUserId={user?.id || ""}
            parentId={post.parentId}
            content={post.text}
            author={post.author}
            community={post.community}
            createdAt={post.createdAt}
            comments={post.children}
              />
        </div>
    </section>
}
export default Page;