import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";


const Page = async () => {
    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
      })


    return(
        <section>
            <h1 className="head-text mb-10">Search</h1>
        </section>
    )
}

export default Page