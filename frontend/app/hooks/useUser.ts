import { useState } from "react"
import { initalUser, moreUser } from "../service/user";

export const useUser = () => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firstTimeUser = async () => {
    try {
      setLoading(true);
      const res = await initalUser(); // Optionally: type `res` here
      
       return res.allUsers;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  const secondTimeUser = async({id}:any)=>{
    try {
      const res = await moreUser({id});
      return {user : res.allUsers , success : res.success};
    } catch (error) {
      return { allUsers: [], success: false, error: (error as Error).message || 'Fetch failed' };
    }
  }
  return { firstTimeUser, loading, error ,secondTimeUser};
}
