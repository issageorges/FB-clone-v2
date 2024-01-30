import { useUserContext } from "../context/user-context";
import { baseUrl } from "../config/api";

export default function UserImg({user}) {
    const { user: userData } = useUserContext();
    
    if (!user) {
        user = userData;
        // return null;
    }
    console.log(user)
    return (
        <>
        {user ? 
         <img src={baseUrl + "/" + user.profileImg} alt="" name="profile-image" className="rounded-full h-8 w-8 object-cover"/>
         : <div>Loading...</div> }
        </>
    )
}