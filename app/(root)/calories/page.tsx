import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import CalorieIntake from "@/components/forms/CalorieIntake";


const Page = async () => {
    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");


    return(
      <>
      <h1 className='head-text'>Calories</h1>
      
      <CalorieIntake userId={userInfo._id} />
  
    </>
    )
}

export default Page