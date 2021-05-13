import types from '../types';
import { i_auth_action as i_action,i_auth_state as i_state } from '../interfaces/reducers/auth';
import { i_token } from '../interfaces/helper/token';
import { i_signin,i_resp_serv } from '../interfaces/components/auth';
import { fetchWithoutToken,fetchWithToken } from '../helpers/fetch';
import { decode } from 'jsonwebtoken';
import Swal from 'sweetalert2';
import { stopLoading } from './ui';

export const startLogin = (data:i_signin) => async ( callback:Function ) => {
    const resp = await fetchWithoutToken({url:'/auth/login',method:'POST', data});
    const { ok, msg,token } = await resp.json() as i_resp_serv;

    if( ok ){
        localStorage.setItem('x-token',token);
        const { payload } = decode(token) as i_token;
        callback(login(payload));
        callback( stopLoading() );
        
    } else {
        callback( startLogout() );
        callback( stopLoading() );
        return Swal.fire({
            title: 'Oh no!',
            text: msg,
            icon: 'error'
        });
    }

    
}

export const startLogout = () => ( callback:Function ) => {
    localStorage.clear();
    callback( logout() );
}


export const startChecking = () => async ( callback:Function ) => {

    const resp = await fetchWithToken({url:'/auth/refreshtoken'});
    const { ok, token } = await resp.json() as i_resp_serv;

    if( ok ){

        localStorage.setItem('x-token', token);
        const { payload } = decode(token) as i_token;
        callback( login(payload) );
    } else {
        callback( startLogout() );
    }

    callback( finishChecking() );
}


export const login = ( payload:i_state ):i_action => {
    const { login:type } = types;
    return {
        type,
        payload
    }
}


export const logout = ():i_action => {
    const { logout:type } = types;
    return {
        type
    }
}

export const finishChecking = ():i_action => {
    const { checking:type } = types;
    return {
        type
    }
}
