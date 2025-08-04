export const loginService =async(formdata)=>{
   try {
     const val = await fetch(`http://localhost:3000/api/auth/login`,{
      headers:{
        'Content-Type' : "application/json"
      },
      method:"POST",
      body : JSON.stringify(formdata),
      credentials: 'include'
    },);
    const res = await val.json();
    return res;
   } catch (error) {
    return {
        success: false,
        message : error.message || "Something went wrong",
    };
   }
}