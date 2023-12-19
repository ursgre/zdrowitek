import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";


const Page = async () => {
    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");


    return(
        <section>
            <h1 className="head-text mb-10">Water</h1>
        </section>
    )
}

export default Page