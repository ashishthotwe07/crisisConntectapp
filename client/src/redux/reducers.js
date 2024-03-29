import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authSlice';
import { notificationReducer } from './reducers/notificationSlice';
import { chatReducer } from './reducers/chatSlice';

// Combine all your reducers
const rootReducer = combineReducers({
    authReducer,
    notificationReducer,
    chatReducer
   
    
});

export default rootReducer;
