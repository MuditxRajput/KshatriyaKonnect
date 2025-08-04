import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 user :null,
};

export const userSlice  = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser : (state,action)=>{
      state.user = action.payload
    },
    clearUser :(state)=>{
      state.user = null;
    }
  },
});

export const { setUser ,clearUser} = userSlice.actions;
export default userSlice .reducer;