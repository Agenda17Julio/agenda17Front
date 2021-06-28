import types from '../types';
import { i_auth_state as i_state, i_auth_action as i_action } from '../interfaces/reducers/auth';


const init:i_state = {
    uid: '',
    username: '',
    email: '',
    checking: true,
    rol: ''
}

const AuthReducer = (state = init, action:i_action):i_state => {

    const { login, logout,checking } = types;
    const { type, payload } = action;

    switch( type ) {
        case login : 
            state = {
                ...state,
                ...payload
            };
            break;
        case checking: 
            state = {
                ...state,
                checking: false
            }
            break;
        case logout:
            state = {
                ...init,
                checking: false
            };
            break;
    }

    return state;
}


export default AuthReducer;