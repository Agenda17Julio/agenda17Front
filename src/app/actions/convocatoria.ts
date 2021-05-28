import types from '../types';
import { i_conv_action as i_action } from '../interfaces/reducers/convocatoria';
import { fetchWithToken } from '../helpers/fetch';
import { i_resp_active_annoucements,i_event_resp } from '../interfaces/resp_serv/convocatorias';
import Swal from 'sweetalert2';
import { closeModal } from './ui';
import { i_redux } from '../interfaces/redux';


export const startLoadAnnoucements = ( pagina:number ) => async ( callback:Function ) => {
    const resp = await fetchWithToken({url:`/convocatoria/annoucements/${pagina}`});
    const {ok, data, registros } = await resp.json();

    if( ok ){
        callback( loadAnnouncement(data, registros[0].registros) );
    }

}


export const startLoadActiveAnnoucements = () => async( callback:Function ) => {
    const resp = await fetchWithToken({url:'/convocatoria/allannoucements/active'});
    const { ok, data } = await resp.json() as i_resp_active_annoucements;

    if( ok ){
        callback( loadActiveAnnouncement(data) );
    }
}


export const startAddAnnoucement = ( { adjunto,asunto,detalle,fecha,from,to,usuario }:i_event_resp ) => async ( callback:Function ) => {

    const formData = new FormData();
    
    if( adjunto ){
        for (let i = 0; i < adjunto.length; i++) {
            formData.append('adjuntos', adjunto[i]);
        }
    }

    formData.append('data', JSON.stringify({
        asunto,
        detalle,
        fecha,
        from,
        to,
        usuario
    }));
    
    const resp = await fetchWithToken({url:'/convocatoria/mail',method:'POST',data:formData});
    const { ok, msg } = await resp.json();

    callback(closeModal());

    if( ok ){
        callback(clearListConv());
        return Swal.fire({
            title: 'Genial! Todo salio bien',
            text: msg,
            timer: 4000,
            icon: 'success'
        })
    }else {
        callback(clearListConv());
        return Swal.fire({
            title: 'Ho no!',
            text: msg,
            timer: 4000,
            icon: 'warning'
        })
    }
}


export const startDelAnnoucement = (convocatoria:i_event_resp) => async (callback:Function, selector: () => i_redux) => {

    Swal.fire({
        title: 'Estas seguro?',
        text: "Recuerda que no se puede revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar!'
      }).then( async (result) => {
        if (result.isConfirmed) {

            const { ui: { pagina, fab } } = selector();
            const resp = await fetchWithToken({url:`/convocatoria/annoucements/${convocatoria.id}`, method: 'DELETE'});
            const { ok, msg } = await resp.json() as i_resp_active_annoucements;

            if( fab?.del ) {
                callback( deleteActivesConv(convocatoria));
            }else {
                callback( startLoadAnnoucements(Number(pagina)) );
            }

            if( ok ) return Swal.fire({
                title: 'Proceso terminado!',
                text: msg,
                icon: 'success',
                timer: 1500
            });
        }
      })


    
}



export const loadAnnouncement = ( data:Array<any>, registros: number ):i_action => {
    const { loadConv:type } = types;
    return {
        type,
        payload: {
            convocatorias: {
                data,
                registros
            }
        }
    }
}

export const loadActiveAnnouncement = ( actives:Array<i_event_resp> ):i_action => {
    const { loadActiveConv:type } = types;
    return {
        type,
        payload: {
            actives
        }
    }
}

export const loadActiveAnnoucement = (active:any):i_action => {
    const { activeConv:type } = types;
    return {
        type,
        payload: {
            active
        }
    }
}




export const clearActiveAnnoucement = ():i_action => {
    const { clearActiveConv:type } = types;
    return { type }
}


export const addAnnoucement = ( event:i_event_resp ):i_action => {
    const { addConv:type } = types;
    return {
        type,
        payload: {
            aux: event
        }
    }
}


export const setListConv = ( listConv:Array<string> ):i_action => {
    const { listToConv:type } = types;
    return  {
        type,
        payload: {
            listConv
        }
    }
}


export const clearListConv = ():i_action => {
    const { clearListToConv:type } = types;
    return {
        type
    }
}


export const deleteActivesConv = (convocatoria:i_event_resp):i_action => {
    
    const { deleteActiveConv:type } = types;

    return {
        type,
        payload:{
            aux: convocatoria
        }
    }
}


export const startGetUsers = () => async( callback:Function ) => {
    const resp = await fetchWithToken({url:'/convocatoria/users'});
    const { ok, data } = await resp.json();

    if( ok ) {
        const users = data.map((val:any) => val.correo);
        callback( getUsers(users) );
    }
}

export const getUsers = (users:Array<string>):i_action => {
    const { getUsers:type } = types;

    return {
        type,
        payload: {
            users
        }
    }
}