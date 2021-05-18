import { EventSourceInput } from '@fullcalendar/react';

export type i_events_convocatoria =  EventSourceInput & i_event_resp & i_event_cal;

export type i_event_resp = {
    adjunto?: FileList;
    asunto: string;
    detalle: string; 
    fecha: Date;
    usuario: number;
    from?: {
        name: string;
        address: string;
    };
    to?: Array<string>;
}



export type i_event_cal = {
    title: string; 
    date: Date,
    allDay?: boolean,
    editable?: boolean;
    color?: string;
    id: string;
}