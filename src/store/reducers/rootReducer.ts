import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { serviceReducer } from "./serviceReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    service: serviceReducer,
    user: userReducer
});

export default rootReducer;