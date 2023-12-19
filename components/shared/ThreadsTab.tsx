import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
  }

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
    return (
        <section>
            ThreadsTab
        </section>
    )
}

export default ThreadsTab;
