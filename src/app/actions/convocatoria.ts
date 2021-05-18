import types from '../types';
import { i_conv_action as i_action } from '../interfaces/reducers/convocatoria';
import { i_events_convocatoria } from '../interfaces/helper/events';
import { fetchWithToken } from '../helpers/fetch';
import { i_resp_active_annoucements,i_event_resp } from '../interfaces/resp_serv/convocatorias';
import Swal from 'sweetalert2';
import { closeModal } from './ui';


export const startLoadAnnoucements = ( pagina:number ) => async ( callback:Function ) => {
    const resp = await fetchWithToken({url:`/convocatoria/annoucements/${pagina}`});
    const json = await resp.json();
    
}


export const startLoadActiveAnnoucements = () => async( callback:Function ) => {
    const resp = await fetchWithToken({url:'/convocatoria/allannoucements/active'});
    const { ok, data } = await resp.json() as i_resp_active_annoucements;

    if( ok ){
        callback( loadActiveAnnouncement(data) );
    }
}


export const loadAnnouncement = ( events:Array<i_events_convocatoria> ):i_action => {
    const { loadConv:type } = types;
    return {
        type,
        payload: {
            events
        }
    }
}

export const loadActiveAnnouncement = ( actives:Array<any> ):i_action => {
    const { loadActiveConv:type } = types;
    return {
        type,
        payload: {
            actives
        }
    }
}

export const loadActiveAnnoucement = (active:i_events_convocatoria):i_action => {
    const { activeConv:type } = types;
    return {
        type,
        payload: {
            active
        }
    }
}


export const startAddAnnoucement = ( { adjunto,asunto,detalle,fecha,from,to }:i_event_resp ) => async ( callback:Function ) => {

    const formData = new FormData();
    
    for (let i = 0; i < adjunto.length; i++) {
        formData.append('adjuntos', adjunto[i]);
    }

    formData.append('data', JSON.stringify({
        asunto,
        detalle,
        fecha,
        from,
        to
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