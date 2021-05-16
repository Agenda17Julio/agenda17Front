import { i_events_convocatoria } from '../helper/events';

export interface i_resp_active_annoucements {
    ok: true;
    data: Array<i_event_resp>;
    msg: string;
}


export type i_event_resp = {
    id?: string;
    adjunto: string;
    asunto: string;
    detalle: string; 
    fecha: Date;
    usuario: number;
}