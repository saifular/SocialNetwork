import { ERROR_PROFILE, GET_PROFILE } from "../actions/types"

const initialState={
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const{ payload,type }=action;

    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile:payload,
                loading:false
            }

            case ERROR_PROFILE:
                return{
                    ...state,
                    error:payload,
                    loading: false
                }
                default:
                    return state

    }
}