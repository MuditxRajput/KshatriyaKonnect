export const profile = async()=>{
  try {
        const val = await fetch('http://localhost:3000/api/profile/info',{
          method:"GET",
          credentials : 'include'
        });
        const res = await val.json();
        return res;
  } catch (error) {
     return error;
  }
}