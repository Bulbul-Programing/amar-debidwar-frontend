import MyProfile from "@/components/commonProtectLayout/MyProfile";
import { getUserInfo } from "@/service/Auth/getUserInfo";


const Page = async () => {
    const getUser = await getUserInfo()
    
    if(!getUser){
        return <p>No user found</p>
    }

    return <MyProfile userInfo={getUser} />;
};

export default Page;
