export const interaction = async ({ userId, action }) => {
    try { 
        const val = await fetch(`http://localhost:3000/api/interaction/${action}/${userId}`,
            {
                method: 'POST',
                credentials: 'include',
            })
        const res = await val.json();
        if(!res.success) throw new Error('Failed in like api');
        return res;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}