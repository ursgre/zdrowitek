import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import SleepIntake from "@/components/forms/SleepIntake";


const Page = async () => {
    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");


    return(
      <>
      <h1 className='head-text'>Sleep</h1>
      
      <SleepIntake userId={userInfo._id} />
  
    </>
    )
}

export default Page