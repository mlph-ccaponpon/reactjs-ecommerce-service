import { User } from "../entities/User"
import { DELETE_USER_RESPONSE, GET_USER_LIST_RESPONSE, INIT_USER_REQ_STATE, UPDATE_USER_RESPONSE } from "../types/userTypes"

const initialState = {
    isUserLoading: false,
    isUserReqSuccess: false,
    userErrorMessage: "",
    userList: <User[]> [],
    selectedUser: <User> {}
}

export function userReducer(state = initialState, action: any) {
    switch(action.type){
        case INIT_USER_REQ_STATE: {
          return {...state, 
                isUserLoading: true,
                isUserReqSuccess: false,
                userErrorMessage: ""}
        }
        case UPDATE_USER_RESPONSE: {
          const updatedUser: User  = action.payload.result;
          const index = state.userList.findIndex(s => s.uid === updatedUser.uid );
          state.userList[index] = updatedUser;

          return {...state, 
                isUserLoading: false,
                isUserReqSuccess: action.payload.success,
                userErrorMessage: action.payload.errorMessage}
        }
        case DELETE_USER_RESPONSE: {
          const deletedUser: User = action.payload.result;
          const index = state.userList.findIndex(s => s.uid === deletedUser.uid );
          state.userList.splice(index, 1);

          return {...state, 
                isUserLoading: false,
                isUserReqSuccess: action.payload.success,
                userErrorMessage: action.payload.errorMessage}
        }
        case GET_USER_LIST_RESPONSE: {
          return {...state, 
                isUserLoading: false,
                isUserReqSuccess: action.payload.success,
                userErrorMessage: action.payload.errorMessage,
                userList: action.payload.result}
        }
        default:
          return state
    }
}
