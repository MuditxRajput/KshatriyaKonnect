export const initalUser =async()=>{
   try {
        const val = await fetch(`http://localhost:3000/api/user/all`, {
          method: "GET",
          credentials: "include",
        })
        const res = await val.json()
        if (!res.success) toast.error("Something went wrongs")
        return res;
        // setUsers(res.allUsers)
      } catch (error) {
        return error;
      }
}

export const moreUser =async({id})=>{
  try {
    const val = await fetch(`http://localhost:3000/api/user/all/?userid=${id}`, {
          method: "GET",
          credentials: "include",
        })
        const res = await val.json();
        return res;
  } catch (error) {
    
  }
}