import { useState } from "react"
import { interaction } from "../service/interaction";

export const useInteraction=()=>{
    const[error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const interact=async({userId,action}:any)=>{
        setLoading(true);
        setError(null);
        try {
            const res = await interaction({userId,action});
            return res;
        } catch (error) {
            setError(error.message || 'Interaction failed');
        }
        finally{
            setLoading(false);
        }
    }
    return {interact,loading,error};
}

