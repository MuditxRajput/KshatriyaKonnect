import {loginService} from '../service/auth';

export const useAuth = ()=>{

    const login = async(formData:any)=>{
        const res = await loginService(formData);
         return res;
    }
   return {login};

}