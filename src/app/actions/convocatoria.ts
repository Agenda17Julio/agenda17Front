import types from '../types';
import { i_conv_action as i_action } from '../interfaces/reducers/convocatoria';
import { i_events_convocatoria } from '../interfaces/helper/events';
import { fetchWithToken } from '../helpers/fetch';
import { i_resp_active_annoucements,i_event_resp } from '../interfaces/resp_serv/convocatorias';


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

export const loadActiveAnnouncement = ( actives:Array<i_event_resp> ):i_action => {
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

export const clearActiveAnnoucement = ():i_action => {
    const { clearActiveConv:type } = types;
    return { type }
}