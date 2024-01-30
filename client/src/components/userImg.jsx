import { useUserContext } from "../context/user-context";
import { baseUrl } from "../config/api";

export default function UserImg() {
    const { user } = useUserContext();

    if (!user) {
        
        return null;
    }

    return (
        <>
         <img src={baseUrl + "/" + user.profileImg} alt="" name="profile/image" className="rounded-full h-8 w-8 object-cover"/>
        </>
    )
}