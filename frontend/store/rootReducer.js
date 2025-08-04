import { combineReducers } from 'redux';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  profile: userReducer,  // ✅ Correct reducer
  _dummy: (state = {}) => state, // optional fallback dummy
});

export default rootReducer;
