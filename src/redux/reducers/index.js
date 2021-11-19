import { combineReducers } from 'redux';
import { userReducer } from './user';

const rootReducer = combineReducers({
    profile: userReducer,
});

export default rootReducer;
