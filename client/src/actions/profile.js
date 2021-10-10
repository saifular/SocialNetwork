import axios from 'axios';
import setAlert from './alert';
import {GET_PROFILE,ERROR_PROFILE} from './types';

export const getCurrentProfile=()=> async dispatch =>{
    try {
        const res=await axios.get('/api/profile/me');

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        
    } catch (err) {

        dispatch({
            type:ERROR_PROFILE,
            payload:{msg: err.response.statusText,status:err.response.status}
        })
        
    }

}