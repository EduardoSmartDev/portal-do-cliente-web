import { getSessionUser } from "@/lib/session";
import HomePageContent from "./HomePage";

interface HomeFetchProps {
loading?: boolean;
}



export default async function HomePageFetch({ loading = false }: HomeFetchProps) {
    const user = await getSessionUser() ;
    
    if (!user) {
        throw new Error("User not authenticated"); // or redirect to login
    }
    
    return <HomePageContent user={user}/>;
}