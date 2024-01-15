import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import WaterIntake from "@/components/forms/WaterIntake";
import React from 'react'; 


const Page = async () => {
    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");


    return(
      <>
      <h1 className='head-text'>Water</h1>
      
      <WaterIntake userId={userInfo._id} />
  
    </>
    )
}

export default Page