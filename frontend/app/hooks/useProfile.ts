import { setUser } from "@/store/userSlice";
import {profile} from '../service/profile'
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
export const useProfile = ()=>{
    const dispatch = useDispatch();
    const router = useRouter();
    const getprofile =async()=>{
        const res = await profile();
        if(res.success)
        {
            dispatch(setUser(res.profile));
            router.push('./home');
        }
        else{
            router.push('./profile-setup')
        }
    }
    return {getprofile};
}